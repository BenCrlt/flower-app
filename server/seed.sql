-- ============================================================
-- Seed data — Flower Music Festival
-- ============================================================
-- Usage: pnpm seed
-- Resets all tables and inserts coherent test data across
-- three éditions du festival avec billetterie, factures et
-- paiements fournisseurs.
-- ============================================================

-- Reset all tables (order respects FK / cascade constraints)
TRUNCATE TABLE
  payments,
  sales,
  products,
  invoices,
  budget_lines,
  budget_categories,
  vendors,
  editions,
  users
RESTART IDENTITY CASCADE;

-- -------------------------------------------------------
-- Users
-- -------------------------------------------------------
INSERT INTO users (id, "firstName", "lastName", email)
OVERRIDING SYSTEM VALUE VALUES
  (1, 'Alice',   'Moreau',   'alice.moreau@flower-festival.fr'),
  (2, 'Lucas',   'Petit',    'lucas.petit@flower-festival.fr'),
  (3, 'Camille', 'Rousseau', 'camille.rousseau@flower-festival.fr');

-- -------------------------------------------------------
-- Vendors
-- -------------------------------------------------------
INSERT INTO vendors (id, name, email, "phoneNumber", address, description)
OVERRIDING SYSTEM VALUE VALUES
  (1, 'SoundPro Events',
      'contact@soundpro-events.fr',
      '01 42 18 55 00',
      '23 rue du Son, 75011 Paris',
      'Location et installation de matériel son et lumière'),
  (2, 'AgenceStar Booking',
      'booking@agencestar.fr',
      '01 53 29 47 10',
      '8 boulevard des Artistes, 75009 Paris',
      'Agence de booking et gestion des artistes'),
  (3, 'SecurEvent',
      'ops@securevent.fr',
      '01 60 44 99 01',
      '14 allée de la Sécurité, 91000 Évry',
      'Prestataire de sécurité pour événements'),
  (4, 'PrintFest',
      'devis@printfest.fr',
      '01 77 32 60 15',
      '5 rue de l''Impression, 93100 Montreuil',
      'Impression affiches, flyers et kakémonos'),
  (5, 'CateringPlus',
      'pro@cateringplus.fr',
      '04 72 11 88 50',
      '31 chemin des Saveurs, 69001 Lyon',
      'Restauration et buvettes pour festivals');

-- -------------------------------------------------------
-- Editions
-- -------------------------------------------------------
INSERT INTO editions (id, name, "startDate")
OVERRIDING SYSTEM VALUE VALUES
  (1, 'Flower Music Festival 2023', '2023-07-14'),
  (2, 'Flower Music Festival 2024', '2024-07-13'),
  (3, 'Flower Music Festival 2025', '2025-07-19');

-- -------------------------------------------------------
-- Budget categories
-- -------------------------------------------------------
INSERT INTO budget_categories (id, name, color)
OVERRIDING SYSTEM VALUE VALUES
  (1, 'Billetterie',   '#6C5CE7'),
  (2, 'Artistes',      '#E17055'),
  (3, 'Technique',     '#00B894'),
  (4, 'Communication', '#FDCB6E'),
  (5, 'Sécurité',      '#74B9FF');

-- -------------------------------------------------------
-- Budget lines
-- -------------------------------------------------------
INSERT INTO budget_lines (
  id, name, description, "lineType",
  "editionId", "budgetCategoryId",
  "estimatedQuantity", "estimatedUnitPrice"
)
OVERRIDING SYSTEM VALUE VALUES
  -- Édition 1 (2023) — revenus
  (1,  'Ventes billets',
       'Recettes billetterie toutes catégories',
       'income', 1, 1, 2000, '45.00'),
  (2,  'Partenariats & sponsors',
       'Apports financiers partenaires et mécènes',
       'income', 1, 1, 1, '30000.00'),
  -- Édition 1 (2023) — dépenses
  (3,  'Cachets artistes',
       'Rémunération des artistes et groupes programmés',
       'expense', 1, 2, 1, '80000.00'),
  (4,  'Location matériel technique',
       'Son, lumière, scènes et générateurs',
       'expense', 1, 3, 1, '45000.00'),
  (5,  'Campagne communication',
       'Affiches, flyers, réseaux sociaux et presse',
       'expense', 1, 4, 1, '3500.00'),
  (6,  'Prestation sécurité',
       'Agents de sécurité et coordinateurs',
       'expense', 1, 5, 1, '15000.00'),
  -- Édition 2 (2024) — revenus
  (7,  'Ventes billets',
       'Recettes billetterie toutes catégories',
       'income', 2, 1, 2500, '50.00'),
  (8,  'Partenariats & sponsors',
       'Apports financiers partenaires et mécènes',
       'income', 2, 1, 1, '40000.00'),
  -- Édition 2 (2024) — dépenses
  (9,  'Cachets artistes',
       'Rémunération des artistes et groupes programmés',
       'expense', 2, 2, 1, '95000.00'),
  (10, 'Location matériel technique',
       'Son, lumière, scènes et générateurs',
       'expense', 2, 3, 1, '55000.00'),
  (11, 'Campagne communication',
       'Affiches, flyers, réseaux sociaux et presse',
       'expense', 2, 4, 1, '4200.00'),
  (12, 'Prestation sécurité',
       'Agents de sécurité et coordinateurs',
       'expense', 2, 5, 1, '18000.00'),
  -- Édition 3 (2025) — revenus
  (13, 'Ventes billets',
       'Recettes billetterie toutes catégories',
       'income', 3, 1, 3000, '55.00'),
  (14, 'Partenariats & sponsors',
       'Apports financiers partenaires et mécènes',
       'income', 3, 1, 1, '50000.00'),
  -- Édition 3 (2025) — dépenses
  (15, 'Cachets artistes',
       'Rémunération des artistes et groupes programmés',
       'expense', 3, 2, 1, '110000.00'),
  (16, 'Location matériel technique',
       'Son, lumière, scènes et générateurs',
       'expense', 3, 3, 1, '62000.00'),
  (17, 'Campagne communication',
       'Affiches, flyers, réseaux sociaux et presse',
       'expense', 3, 4, 1, '5000.00'),
  (18, 'Prestation sécurité',
       'Agents de sécurité et coordinateurs',
       'expense', 3, 5, 1, '22000.00');

-- -------------------------------------------------------
-- Products (types de billets par édition)
-- -------------------------------------------------------
INSERT INTO products (id, name, "unitPrice", "budgetLineId", "editionId")
OVERRIDING SYSTEM VALUE VALUES
  -- Édition 1 (2023)
  (1,  'Pass 1 Jour',    '30.00',  1, 1),
  (2,  'Pass 2 Jours',   '50.00',  1, 1),
  (3,  'Pass VIP',       '120.00', 1, 1),
  (4,  'Pass Backstage', '250.00', 1, 1),
  -- Édition 2 (2024)
  (5,  'Pass 1 Jour',    '35.00',  7, 2),
  (6,  'Pass 2 Jours',   '60.00',  7, 2),
  (7,  'Pass VIP',       '150.00', 7, 2),
  (8,  'Pass Backstage', '300.00', 7, 2),
  -- Édition 3 (2025)
  (9,  'Pass 1 Jour',    '40.00',  13, 3),
  (10, 'Pass 2 Jours',   '65.00',  13, 3),
  (11, 'Pass VIP',       '180.00', 13, 3),
  (12, 'Pass Backstage', '350.00', 13, 3);

-- -------------------------------------------------------
-- Invoices
-- -------------------------------------------------------
INSERT INTO invoices (
  id, "editionId", "vendorId", "totalAmount",
  note, "authorId", "executedAt", status
)
OVERRIDING SYSTEM VALUE VALUES
  -- Édition 1 (2023)
  (1,  1, 1, '45000.00', 'Scène principale + son FOH 2 jours',        2, '2023-07-01 10:00:00', 'paid'),
  (2,  1, 2, '80000.00', 'Cachets 6 artistes — FMF 2023',             1, '2023-07-10 14:00:00', 'paid'),
  (3,  1, 3, '15000.00', 'Sécurité périmètre + accès scène 2 jours',  1, '2023-07-12 09:00:00', 'paid'),
  (4,  1, 4, '3500.00',  '5000 flyers + 200 affiches A1',             1, '2023-06-20 11:00:00', 'paid'),
  -- Édition 2 (2024)
  (5,  2, 1, '55000.00', 'Scène principale + 2e scène acoustique',    2, '2024-07-01 10:00:00', 'paid'),
  (6,  2, 2, '95000.00', 'Cachets 9 artistes — FMF 2024',             1, '2024-07-08 14:00:00', 'paid'),
  (7,  2, 3, '18000.00', 'Sécurité périmètre + camping 2 jours',      1, '2024-07-10 09:00:00', 'paid'),
  (8,  2, 4, '4200.00',  '8000 flyers + 300 affiches + kakémonos',    1, '2024-06-15 11:00:00', 'paid'),
  -- Édition 3 (2025)
  (9,  3, 1, '62000.00', 'Scène principale + 2 scènes secondaires',   2, NULL,                  'pending'),
  (10, 3, 2, '110000.00','Cachets 12 artistes — FMF 2025',            1, NULL,                  'pending'),
  (11, 3, 3, '22000.00', 'Sécurité périmètre + parking + camping',    1, '2025-07-05 09:00:00', 'paid'),
  (12, 3, 4, '5000.00',  '10000 flyers + 400 affiches + banderoles',  1, '2025-06-10 11:00:00', 'paid');

-- -------------------------------------------------------
-- Payments
-- -------------------------------------------------------
INSERT INTO payments (
  id, quantity, "unitPrice",
  "editionId", "budgetLineId", "invoiceId"
)
OVERRIDING SYSTEM VALUE VALUES
  -- Édition 1 (2023)
  (1,  1, '45000.00', 1, 4,  1),
  (2,  1, '80000.00', 1, 3,  2),
  (3,  1, '15000.00', 1, 6,  3),
  (4,  1, '3500.00',  1, 5,  4),
  -- Édition 2 (2024)
  (5,  1, '55000.00', 2, 10, 5),
  (6,  1, '95000.00', 2, 9,  6),
  (7,  1, '18000.00', 2, 12, 7),
  (8,  1, '4200.00',  2, 11, 8),
  -- Édition 3 (2025) — seulement les factures payées
  (9,  1, '22000.00', 3, 18, 11),
  (10, 1, '5000.00',  3, 17, 12);

-- -------------------------------------------------------
-- Sales (ventes billets)
-- -------------------------------------------------------
INSERT INTO sales (
  id, quantity, "executedAt",
  "productId", "editionId", "authorId"
)
OVERRIDING SYSTEM VALUE VALUES
  -- Édition 1 (2023) — Jour 1
  (1,  120, '2023-07-14 09:00:00', 1, 1, 3),
  (2,  85,  '2023-07-14 09:30:00', 2, 1, 3),
  (3,  28,  '2023-07-14 10:00:00', 3, 1, 1),
  (4,  6,   '2023-07-14 10:30:00', 4, 1, 1),
  -- Édition 1 (2023) — Jour 2
  (5,  95,  '2023-07-15 09:00:00', 1, 1, 3),
  (6,  32,  '2023-07-15 10:00:00', 3, 1, 1),
  (7,  12,  '2023-07-15 11:30:00', 2, 1, 3),
  -- Édition 2 (2024) — Jour 1
  (8,  155, '2024-07-13 09:00:00', 5, 2, 3),
  (9,  110, '2024-07-13 09:30:00', 6, 2, 3),
  (10, 38,  '2024-07-13 10:00:00', 7, 2, 1),
  (11, 9,   '2024-07-13 10:30:00', 8, 2, 1),
  -- Édition 2 (2024) — Jour 2
  (12, 130, '2024-07-14 09:00:00', 5, 2, 3),
  (13, 42,  '2024-07-14 10:00:00', 7, 2, 1),
  (14, 20,  '2024-07-14 11:30:00', 6, 2, 3),
  -- Édition 3 (2025) — Jour 1
  (15, 210, '2025-07-19 09:00:00', 9,  3, 3),
  (16, 145, '2025-07-19 09:30:00', 10, 3, 3),
  (17, 52,  '2025-07-19 10:00:00', 11, 3, 1),
  (18, 14,  '2025-07-19 10:30:00', 12, 3, 1),
  -- Édition 3 (2025) — Jour 2
  (19, 190, '2025-07-20 09:00:00', 9,  3, 3),
  (20, 55,  '2025-07-20 10:00:00', 11, 3, 1),
  (21, 30,  '2025-07-20 11:30:00', 10, 3, 3);

-- -------------------------------------------------------
-- Reset identity sequences
-- -------------------------------------------------------
SELECT setval('users_id_seq',             (SELECT MAX(id) FROM users));
SELECT setval('vendors_id_seq',           (SELECT MAX(id) FROM vendors));
SELECT setval('editions_id_seq',          (SELECT MAX(id) FROM editions));
SELECT setval('budget_categories_id_seq', (SELECT MAX(id) FROM budget_categories));
SELECT setval('budget_lines_id_seq',      (SELECT MAX(id) FROM budget_lines));
SELECT setval('products_id_seq',          (SELECT MAX(id) FROM products));
SELECT setval('invoices_id_seq',          (SELECT MAX(id) FROM invoices));
SELECT setval('payments_id_seq',          (SELECT MAX(id) FROM payments));
SELECT setval('sales_id_seq',             (SELECT MAX(id) FROM sales));
