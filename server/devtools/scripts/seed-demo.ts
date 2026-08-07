import "dotenv/config";
import { eq, inArray } from "drizzle-orm";
import { db } from "../../src/db/index.js";
import {
  BudgetCategory,
  BudgetLine,
  budgetCategoriesTable,
  budgetLinesTable,
  Edition,
  editionsTable,
  invoicesTable,
  orderOriginBudgetLinesTable,
  OrderOrigin,
  orderOriginsTable,
  ordersTable,
  paymentsTable,
  salesTable,
  User,
  user,
  Vendor,
  vendorsTable,
} from "../../src/db/schema/index.js";
import { auth } from "../../src/utils/auth.js";

/**
 * Peuple la base avec des fixtures de démonstration réalistes : plusieurs
 * éditions du festival (passées et en cours) avec budget, ventes en caisse,
 * commandes en ligne, factures fournisseurs et paiements.
 *
 * Le script est idempotent : chaque édition nommée ci-dessous est
 * réinitialisée (et uniquement elle) avant d'être repeuplée, les
 * référentiels partagés (catégories, origines, fournisseurs) sont créés une
 * seule fois puis réutilisés.
 *
 * Usage : pnpm seed:demo
 */

type InvoiceStatus = "PENDING" | "PAID" | "CANCELLED";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(items: readonly T[]): T {
  return items[randInt(0, items.length - 1)]!;
}

function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = randInt(0, i);
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function money(amount: number): string {
  return amount.toFixed(2);
}

const DIACRITICS_PATTERN = new RegExp("[\\u0300-\\u036f]", "g");

function slugify(value: string): string {
  return value.normalize("NFD").replace(DIACRITICS_PATTERN, "").toLowerCase();
}

let helloAssoOrderIdSeq = 900000;
function nextHelloAssoOrderId(): number {
  helloAssoOrderIdSeq += 1;
  return helloAssoOrderIdSeq;
}

// ---------------------------------------------------------------------------
// Référentiels de démonstration
// ---------------------------------------------------------------------------

const CATEGORIES = [
  { name: "Billetterie", color: "#22C55E" },
  { name: "Bar", color: "#F59E0B" },
  { name: "Restauration", color: "#EF4444" },
  { name: "Boutique", color: "#8B5CF6" },
  { name: "Artistes", color: "#EC4899" },
  { name: "Technique & Son", color: "#3B82F6" },
  { name: "Sécurité", color: "#64748B" },
  { name: "Communication", color: "#06B6D4" },
  { name: "Logistique", color: "#A855F7" },
  { name: "Administratif", color: "#94A3B8" },
];

const ORIGINS = [
  { name: "Billetterie", isPhysical: true },
  { name: "Bar", isPhysical: true },
  { name: "Restauration", isPhysical: true },
  { name: "Boutique", isPhysical: true },
  { name: "Hello Asso", isPhysical: false },
];

const VENDORS = [
  {
    name: "Agence Booking Sud",
    email: "contact@booking-sud.fr",
    phoneNumber: "0450112233",
    address: "12 rue des Artistes, 74000 Annecy",
  },
  {
    name: "SonoPro Events",
    email: "contact@sonopro-events.fr",
    phoneNumber: "0450223344",
    address: "5 avenue du Son, 74000 Annecy",
  },
  {
    name: "SecuriTeam",
    email: "contact@securiteam.fr",
    phoneNumber: "0450334455",
    address: "8 rue de la Sécurité, 74000 Annecy",
  },
  {
    name: "Imprimerie du Coin",
    email: "contact@imprimerie-du-coin.fr",
    phoneNumber: "0450445566",
    address: "3 rue Gutenberg, 74000 Annecy",
  },
  {
    name: "Événements Plus Location",
    email: "contact@evenements-plus.fr",
    phoneNumber: "0450556677",
    address: "20 rue de la Logistique, 74000 Annecy",
  },
  {
    name: "AssurEvent",
    email: "contact@assurevent.fr",
    phoneNumber: "0450667788",
    address: "1 place des Assurances, 74000 Annecy",
  },
  {
    name: "Brasserie du Sud",
    email: "contact@brasserie-du-sud.fr",
    phoneNumber: "0450778899",
    address: "15 route de la Bière, 74000 Annecy",
  },
  {
    name: "Traiteur Local",
    email: "contact@traiteur-local.fr",
    phoneNumber: "0450889900",
    address: "7 chemin des Saveurs, 74000 Annecy",
  },
];

interface IncomeLineSpec {
  name: string;
  category: string;
  origin: string;
  estimatedQuantity: number;
  estimatedUnitPrice: number;
  isFreePrice?: boolean;
}

const INCOME_LINES: IncomeLineSpec[] = [
  {
    name: "Entrée journée",
    category: "Billetterie",
    origin: "Billetterie",
    estimatedQuantity: 300,
    estimatedUnitPrice: 12,
  },
  {
    name: "Pass 2 jours",
    category: "Billetterie",
    origin: "Hello Asso",
    estimatedQuantity: 150,
    estimatedUnitPrice: 20,
  },
  {
    name: "Bière pression",
    category: "Bar",
    origin: "Bar",
    estimatedQuantity: 900,
    estimatedUnitPrice: 4,
  },
  {
    name: "Cocktail maison",
    category: "Bar",
    origin: "Bar",
    estimatedQuantity: 400,
    estimatedUnitPrice: 6,
  },
  {
    name: "Boisson sans alcool",
    category: "Bar",
    origin: "Bar",
    estimatedQuantity: 500,
    estimatedUnitPrice: 3,
  },
  {
    name: "Sandwich merguez",
    category: "Restauration",
    origin: "Restauration",
    estimatedQuantity: 350,
    estimatedUnitPrice: 6,
  },
  {
    name: "Frites",
    category: "Restauration",
    origin: "Restauration",
    estimatedQuantity: 300,
    estimatedUnitPrice: 4,
  },
  {
    name: "T-shirt festival",
    category: "Boutique",
    origin: "Boutique",
    estimatedQuantity: 120,
    estimatedUnitPrice: 18,
  },
  {
    name: "Don libre",
    category: "Boutique",
    origin: "Boutique",
    estimatedQuantity: 1,
    estimatedUnitPrice: 0,
    isFreePrice: true,
  },
];

interface ExpenseLineSpec {
  name: string;
  category: string;
  vendor: string;
  estimatedQuantity: number;
  estimatedUnitPrice: number;
}

const EXPENSE_LINES: ExpenseLineSpec[] = [
  {
    name: "Cachet tête d'affiche",
    category: "Artistes",
    vendor: "Agence Booking Sud",
    estimatedQuantity: 1,
    estimatedUnitPrice: 3500,
  },
  {
    name: "Cachets groupes locaux",
    category: "Artistes",
    vendor: "Agence Booking Sud",
    estimatedQuantity: 4,
    estimatedUnitPrice: 450,
  },
  {
    name: "Location sonorisation",
    category: "Technique & Son",
    vendor: "SonoPro Events",
    estimatedQuantity: 1,
    estimatedUnitPrice: 1600,
  },
  {
    name: "Régie son et lumière",
    category: "Technique & Son",
    vendor: "SonoPro Events",
    estimatedQuantity: 2,
    estimatedUnitPrice: 320,
  },
  {
    name: "Agents de sécurité",
    category: "Sécurité",
    vendor: "SecuriTeam",
    estimatedQuantity: 8,
    estimatedUnitPrice: 160,
  },
  {
    name: "Affiches et flyers",
    category: "Communication",
    vendor: "Imprimerie du Coin",
    estimatedQuantity: 1,
    estimatedUnitPrice: 350,
  },
  {
    name: "Location barrières et clôtures",
    category: "Logistique",
    vendor: "Événements Plus Location",
    estimatedQuantity: 1,
    estimatedUnitPrice: 420,
  },
  {
    name: "Assurance événementielle",
    category: "Administratif",
    vendor: "AssurEvent",
    estimatedQuantity: 1,
    estimatedUnitPrice: 380,
  },
  {
    name: "Fournitures bar",
    category: "Bar",
    vendor: "Brasserie du Sud",
    estimatedQuantity: 1,
    estimatedUnitPrice: 900,
  },
  {
    name: "Ravitaillement restauration",
    category: "Restauration",
    vendor: "Traiteur Local",
    estimatedQuantity: 1,
    estimatedUnitPrice: 700,
  },
];

const FIRST_NAMES = [
  "Camille",
  "Lucas",
  "Manon",
  "Hugo",
  "Léa",
  "Nathan",
  "Chloé",
  "Louis",
  "Emma",
  "Maxime",
  "Sarah",
  "Thomas",
  "Julie",
  "Antoine",
  "Laura",
];

const LAST_NAMES = [
  "Martin",
  "Bernard",
  "Dubois",
  "Thomas",
  "Robert",
  "Petit",
  "Durand",
  "Leroy",
  "Moreau",
  "Simon",
  "Laurent",
  "Lefebvre",
  "Michel",
  "Garcia",
  "David",
];

interface EditionSpec {
  name: string;
  start: Date;
  end: Date;
  active: boolean;
  openingBalance: number;
}

const EDITION_SPECS: EditionSpec[] = [
  {
    name: "FMF 2024",
    start: new Date("2024-06-22 16:00:00 +02:00"),
    end: new Date("2024-06-23 02:00:00 +02:00"),
    active: false,
    openingBalance: 800,
  },
  {
    name: "FMF 2025",
    start: new Date("2025-06-28 16:00:00 +02:00"),
    end: new Date("2025-06-29 02:00:00 +02:00"),
    active: false,
    openingBalance: 1200,
  },
  {
    name: "FMF 2026",
    start: new Date("2026-06-27 16:00:00 +02:00"),
    end: new Date("2026-06-28 02:00:00 +02:00"),
    active: true,
    openingBalance: 1000,
  },
];

// Une ligne réalise entre 88 % et 108 % de sa quantité budgétée : assez
// proche du prévisionnel pour un budget maîtrisé, avec un peu de variation
// naturelle par origine de vente.
const MIN_REALIZATION_RATE = 0.88;
const MAX_REALIZATION_RATE = 1.08;

// ---------------------------------------------------------------------------
// Référentiels partagés (get-or-create)
// ---------------------------------------------------------------------------

async function getOrCreateAdmin(): Promise<User> {
  const existing = await db.query.user.findFirst({
    where: eq(user.username, "admin"),
  });
  if (existing) return existing;

  const created = await auth.api.createUser({
    body: {
      email: "admin@flower2.fr",
      password: "123456",
      name: "Benoit Cournault",
      role: "admin",
    },
  });

  const [updated] = await db
    .update(user)
    .set({ username: "admin" })
    .where(eq(user.id, created.user.id))
    .returning();

  return updated!;
}

async function getOrCreateBudgetCategory(
  name: string,
  color: string,
): Promise<BudgetCategory> {
  const existing = await db.query.budgetCategoriesTable.findFirst({
    where: eq(budgetCategoriesTable.name, name),
  });
  if (existing) return existing;

  const [created] = await db
    .insert(budgetCategoriesTable)
    .values({ name, color })
    .returning();
  return created!;
}

async function getOrCreateOrderOrigin(
  name: string,
  isPhysical: boolean,
): Promise<OrderOrigin> {
  const existing = await db.query.orderOriginsTable.findFirst({
    where: eq(orderOriginsTable.name, name),
  });
  if (existing) return existing;

  const [created] = await db
    .insert(orderOriginsTable)
    .values({ name, isPhysical })
    .returning();
  return created!;
}

async function getOrCreateVendor(input: {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}): Promise<Vendor> {
  const existing = await db.query.vendorsTable.findFirst({
    where: eq(vendorsTable.name, input.name),
  });
  if (existing) return existing;

  const [created] = await db.insert(vendorsTable).values(input).returning();
  return created!;
}

// ---------------------------------------------------------------------------
// Éditions de démonstration
// ---------------------------------------------------------------------------

async function resetEdition(name: string): Promise<void> {
  const existing = await db.query.editionsTable.findFirst({
    where: eq(editionsTable.name, name),
  });
  if (!existing) return;

  const editionBudgetLines = await db.query.budgetLinesTable.findMany({
    where: eq(budgetLinesTable.editionId, existing.id),
    columns: { id: true },
  });
  const budgetLineIds = editionBudgetLines.map((line) => line.id);

  const editionOrders = await db.query.ordersTable.findMany({
    where: eq(ordersTable.editionId, existing.id),
    columns: { id: true },
  });
  const orderIds = editionOrders.map((order) => order.id);

  await db
    .delete(paymentsTable)
    .where(eq(paymentsTable.editionId, existing.id));
  await db
    .delete(invoicesTable)
    .where(eq(invoicesTable.editionId, existing.id));
  if (orderIds.length) {
    await db.delete(salesTable).where(inArray(salesTable.orderId, orderIds));
  }
  await db.delete(ordersTable).where(eq(ordersTable.editionId, existing.id));
  if (budgetLineIds.length) {
    await db
      .delete(orderOriginBudgetLinesTable)
      .where(inArray(orderOriginBudgetLinesTable.budgetLineId, budgetLineIds));
  }
  await db
    .delete(budgetLinesTable)
    .where(eq(budgetLinesTable.editionId, existing.id));
  await db.delete(editionsTable).where(eq(editionsTable.id, existing.id));
}

async function createEdition(spec: EditionSpec): Promise<Edition> {
  if (spec.active) {
    await db
      .update(editionsTable)
      .set({ active: false })
      .where(eq(editionsTable.active, true));
  }

  const [edition] = await db
    .insert(editionsTable)
    .values({
      name: spec.name,
      startDate: spec.start,
      endDate: spec.end,
      active: spec.active,
      openingBalance: spec.openingBalance,
    })
    .returning();
  return edition!;
}

async function createBudgetLines(
  edition: Edition,
  categoriesByName: Map<string, BudgetCategory>,
  originsByName: Map<string, OrderOrigin>,
): Promise<Map<string, BudgetLine>> {
  const budgetLinesByName = new Map<string, BudgetLine>();

  for (const line of INCOME_LINES) {
    const category = categoriesByName.get(line.category)!;
    const [created] = await db
      .insert(budgetLinesTable)
      .values({
        name: line.name,
        lineType: "income",
        editionId: edition.id,
        budgetCategoryId: category.id,
        estimatedQuantity: line.estimatedQuantity,
        estimatedUnitPrice: money(line.estimatedUnitPrice),
        isFreePrice: line.isFreePrice ?? false,
      })
      .returning();
    budgetLinesByName.set(line.name, created!);

    const origin = originsByName.get(line.origin)!;
    await db.insert(orderOriginBudgetLinesTable).values({
      orderOriginId: origin.id,
      budgetLineId: created!.id,
    });
  }

  for (const line of EXPENSE_LINES) {
    const category = categoriesByName.get(line.category)!;
    const [created] = await db
      .insert(budgetLinesTable)
      .values({
        name: line.name,
        lineType: "expense",
        editionId: edition.id,
        budgetCategoryId: category.id,
        estimatedQuantity: line.estimatedQuantity,
        estimatedUnitPrice: money(line.estimatedUnitPrice),
      })
      .returning();
    budgetLinesByName.set(line.name, created!);
  }

  return budgetLinesByName;
}

async function createOrdersAndSales(
  spec: EditionSpec,
  edition: Edition,
  admin: User,
  budgetLinesByName: Map<string, BudgetLine>,
  originsByName: Map<string, OrderOrigin>,
): Promise<void> {
  const linesByOrigin = new Map<string, IncomeLineSpec[]>();
  for (const line of INCOME_LINES) {
    const list = linesByOrigin.get(line.origin) ?? [];
    list.push(line);
    linesByOrigin.set(line.origin, list);
  }

  for (const [originName, lines] of linesByOrigin) {
    const origin = originsByName.get(originName)!;
    const isOnline = originName === "Hello Asso";

    // Une même origine réalise sa propre part du budget (les ventes au bar
    // sont corrélées entre elles), calculée indépendamment par ligne.
    const remainingQuantity = new Map<string, number>(
      lines.map((line) => [
        line.name,
        line.isFreePrice
          ? randInt(3, 10)
          : Math.max(
              1,
              Math.round(
                line.estimatedQuantity *
                  (MIN_REALIZATION_RATE +
                    Math.random() *
                      (MAX_REALIZATION_RATE - MIN_REALIZATION_RATE)),
              ),
            ),
      ]),
    );

    while ([...remainingQuantity.values()].some((quantity) => quantity > 0)) {
      const availableLines = lines.filter(
        (line) => (remainingQuantity.get(line.name) ?? 0) > 0,
      );
      if (availableLines.length === 0) break;

      const executedAt = randomDate(spec.start, spec.end);
      const payerFirstName = isOnline ? pick(FIRST_NAMES) : null;
      const payerLastName = isOnline ? pick(LAST_NAMES) : null;

      const [order] = await db
        .insert(ordersTable)
        .values({
          editionId: edition.id,
          executedAt,
          originId: origin.id,
          authorId: isOnline ? null : admin.id,
          payerFirstName,
          payerLastName,
          payerEmail:
            payerFirstName && payerLastName
              ? `${slugify(payerFirstName)}.${slugify(payerLastName)}@example.com`
              : null,
          helloAssoOrderId: isOnline ? nextHelloAssoOrderId() : null,
          paymentMethod: isOnline ? "card" : pick(["cash", "card"] as const),
        })
        .returning();
      if (!order) break;

      const itemCount = randInt(1, Math.min(3, availableLines.length));
      const chosenLines = shuffle(availableLines).slice(0, itemCount);

      for (const line of chosenLines) {
        const budgetLine = budgetLinesByName.get(line.name)!;
        const isFreePrice = line.isFreePrice ?? false;
        const left = remainingQuantity.get(line.name) ?? 0;
        const quantity = isFreePrice ? 1 : Math.min(left, randInt(1, 6));

        await db.insert(salesTable).values({
          budgetLineId: budgetLine.id,
          orderId: order.id,
          executedAt,
          quantity,
          unitPrice: isFreePrice
            ? money(randInt(5, 40))
            : money(line.estimatedUnitPrice),
        });
        remainingQuantity.set(line.name, left - quantity);
      }
    }
  }
}

// Répartit les statuts de facture selon des poids (en %), en respectant les
// proportions exactement (méthode des plus grands restes) plutôt qu'un tirage
// indépendant par facture — avec seulement 10 lignes de dépense, un tirage
// indépendant produirait trop de variance d'une exécution à l'autre.
function computeStatusCounts(
  total: number,
  weights: readonly (readonly [InvoiceStatus, number])[],
): { status: InvoiceStatus; count: number }[] {
  const totalWeight = weights.reduce((sum, [, weight]) => sum + weight, 0);
  const counts = weights.map(([status, weight]) => {
    const exact = (weight / totalWeight) * total;
    return {
      status,
      count: Math.floor(exact),
      remainder: exact - Math.floor(exact),
    };
  });

  let assigned = counts.reduce((sum, entry) => sum + entry.count, 0);
  const byRemainderDesc = [...counts].sort((a, b) => b.remainder - a.remainder);
  for (let i = 0; assigned < total; i += 1, assigned += 1) {
    byRemainderDesc[i % byRemainderDesc.length]!.count += 1;
  }

  return counts;
}

// Seules les factures "PAID" comptent dans le réel (cf. loadRealData.ts) :
// on ne laisse en PENDING/CANCELLED que les plus petites lignes — un festival
// paie toujours sa tête d'affiche, quitte à retarder une facture d'assurance.
// Ça limite l'écart réel/prévisionnel côté dépenses tout en restant réaliste.
function assignInvoiceStatuses(
  lines: readonly ExpenseLineSpec[],
  weights: readonly (readonly [InvoiceStatus, number])[],
): Map<string, InvoiceStatus> {
  const assignments = new Map<string, InvoiceStatus>(
    lines.map((line) => [line.name, "PAID"]),
  );

  const sortedByAmountAsc = [...lines].sort(
    (a, b) =>
      a.estimatedQuantity * a.estimatedUnitPrice -
      b.estimatedQuantity * b.estimatedUnitPrice,
  );
  const smallestHalf = shuffle(
    sortedByAmountAsc.slice(0, Math.ceil(sortedByAmountAsc.length / 2)),
  );

  let cursor = 0;
  for (const { status, count } of computeStatusCounts(lines.length, weights)) {
    if (status === "PAID") continue;
    for (let i = 0; i < count; i += 1) {
      assignments.set(smallestHalf[cursor]!.name, status);
      cursor += 1;
    }
  }

  return assignments;
}

async function createInvoicesAndPayments(
  spec: EditionSpec,
  edition: Edition,
  admin: User,
  budgetLinesByName: Map<string, BudgetLine>,
  vendorsByName: Map<string, Vendor>,
): Promise<void> {
  const statusWeights: readonly (readonly [InvoiceStatus, number])[] =
    spec.active
      ? [
          ["PAID", 80],
          ["PENDING", 12],
          ["CANCELLED", 8],
        ]
      : [
          ["PAID", 90],
          ["CANCELLED", 10],
        ];
  const statusByLineName = assignInvoiceStatuses(EXPENSE_LINES, statusWeights);

  const procurementStart = new Date(
    spec.start.getTime() - 45 * 24 * 60 * 60 * 1000,
  );

  for (const line of EXPENSE_LINES) {
    const budgetLine = budgetLinesByName.get(line.name)!;
    const vendor = vendorsByName.get(line.vendor)!;
    const status = statusByLineName.get(line.name)!;
    const totalAmount = line.estimatedQuantity * line.estimatedUnitPrice;

    const [invoice] = await db
      .insert(invoicesTable)
      .values({
        editionId: edition.id,
        name: `${line.name} — ${vendor.name}`,
        vendorId: vendor.id,
        totalAmount: money(totalAmount),
        authorId: admin.id,
        executedAt: randomDate(procurementStart, spec.end),
        status,
      })
      .returning();
    if (!invoice) continue;

    if (status === "PAID") {
      await db.insert(paymentsTable).values({
        editionId: edition.id,
        budgetLineId: budgetLine.id,
        invoiceId: invoice.id,
        quantity: line.estimatedQuantity,
        unitPrice: money(line.estimatedUnitPrice),
      });
    } else if (status === "PENDING") {
      const paidQuantity = randInt(0, Math.max(0, line.estimatedQuantity - 1));
      if (paidQuantity > 0) {
        await db.insert(paymentsTable).values({
          editionId: edition.id,
          budgetLineId: budgetLine.id,
          invoiceId: invoice.id,
          quantity: paidQuantity,
          unitPrice: money(line.estimatedUnitPrice),
        });
      }
    }
  }
}

async function populateEdition(
  spec: EditionSpec,
  admin: User,
  categoriesByName: Map<string, BudgetCategory>,
  originsByName: Map<string, OrderOrigin>,
  vendorsByName: Map<string, Vendor>,
): Promise<void> {
  await resetEdition(spec.name);
  const edition = await createEdition(spec);
  const budgetLinesByName = await createBudgetLines(
    edition,
    categoriesByName,
    originsByName,
  );

  await createOrdersAndSales(
    spec,
    edition,
    admin,
    budgetLinesByName,
    originsByName,
  );
  await createInvoicesAndPayments(
    spec,
    edition,
    admin,
    budgetLinesByName,
    vendorsByName,
  );
}

// ---------------------------------------------------------------------------
// Entrée du script
// ---------------------------------------------------------------------------

async function main() {
  console.log("Génération des fixtures de démonstration...");

  const admin = await getOrCreateAdmin();

  const categoriesByName = new Map<string, BudgetCategory>();
  for (const category of CATEGORIES) {
    categoriesByName.set(
      category.name,
      await getOrCreateBudgetCategory(category.name, category.color),
    );
  }

  const originsByName = new Map<string, OrderOrigin>();
  for (const origin of ORIGINS) {
    originsByName.set(
      origin.name,
      await getOrCreateOrderOrigin(origin.name, origin.isPhysical),
    );
  }

  const vendorsByName = new Map<string, Vendor>();
  for (const vendor of VENDORS) {
    vendorsByName.set(vendor.name, await getOrCreateVendor(vendor));
  }

  for (const spec of EDITION_SPECS) {
    console.log(`  → ${spec.name}`);
    await populateEdition(
      spec,
      admin,
      categoriesByName,
      originsByName,
      vendorsByName,
    );
  }

  console.log("Fixtures de démonstration créées :");
  console.log(
    `  - ${EDITION_SPECS.length} éditions (${EDITION_SPECS.map((spec) => spec.name).join(", ")})`,
  );
  console.log("  - Connexion : admin / 123456");

  process.exit(0);
}

main().catch((error) => {
  console.error("Erreur pendant la génération des fixtures :", error);
  process.exit(1);
});
