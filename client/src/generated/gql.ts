/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation AddBudgetCategory($name: String!, $color: String!) {\n  addBudgetCategory(name: $name, color: $color) {\n    id\n    name\n    color\n  }\n}": typeof types.AddBudgetCategoryDocument,
    "mutation addBudgetLine($name: String!, $budgetCategoryId: Float!, $description: String, $editionId: Float!, $estimatedQuantity: Int!, $estimatedUnitPrice: Float!, $isFreePrice: Boolean, $lineType: LineTypeEnum!) {\n  addBudgetLine(\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    isFreePrice: $isFreePrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}": typeof types.AddBudgetLineDocument,
    "mutation deleteBudgetLine($id: Float!) {\n  deleteBudgetLine(id: $id) {\n    id\n    name\n  }\n}": typeof types.DeleteBudgetLineDocument,
    "query getBudgetCategories {\n  budgetCategories {\n    id\n    name\n    color\n  }\n}": typeof types.GetBudgetCategoriesDocument,
    "query getBudgetLines($editionId: Float!, $budgetLineType: LineTypeEnum!, $excludeHelloAsso: Boolean) {\n  budgetLines(\n    editionId: $editionId\n    budgetLineType: $budgetLineType\n    excludeHelloAsso: $excludeHelloAsso\n  ) {\n    id\n    name\n    description\n    estimatedQuantity\n    estimatedUnitPrice\n    isFreePrice\n    realCost\n    salesCount\n    lineType\n    category {\n      id\n      name\n      color\n    }\n    helloAssoProductId\n  }\n}": typeof types.GetBudgetLinesDocument,
    "mutation updateBudgetLine($id: Float!, $name: String, $budgetCategoryId: Float, $description: String, $editionId: Float, $estimatedQuantity: Int, $estimatedUnitPrice: Float, $isFreePrice: Boolean) {\n  updateBudgetLine(\n    id: $id\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    isFreePrice: $isFreePrice\n  ) {\n    id\n    name\n  }\n}": typeof types.UpdateBudgetLineDocument,
    "query getOrderOrigin($id: Float!) {\n  orderOrigin(id: $id) {\n    id\n    name\n    isPhysical\n    budgetLines {\n      id\n      name\n      estimatedUnitPrice\n      isFreePrice\n      category {\n        id\n        name\n        color\n      }\n    }\n  }\n}": typeof types.GetOrderOriginDocument,
    "query getSumUpConfig {\n  sumUpConfig {\n    affiliateKey\n    appId\n  }\n}": typeof types.GetSumUpConfigDocument,
    "mutation validateOrder($editionId: Float!, $originId: Float!, $paymentMethod: ValidateOrderPaymentMethodInput!, $sales: [ValidateOrderSalesInput!]!) {\n  validateOrder(\n    editionId: $editionId\n    originId: $originId\n    paymentMethod: $paymentMethod\n    sales: $sales\n  ) {\n    id\n  }\n}": typeof types.ValidateOrderDocument,
    "query getBudgetStatsByCategories($editionId: Float!, $lineType: LineTypeEnum!) {\n  getBudgetStatsByCategories(editionId: $editionId, lineType: $lineType) {\n    categoryName\n    totalEstimated\n    total\n  }\n}": typeof types.GetBudgetStatsByCategoriesDocument,
    "query getEditionStats($editionId: Float!) {\n  edition(id: $editionId) {\n    id\n    totalExpense\n    totalIncome\n    totalPrevisionnalExpense\n    totalPrevisionnalIncome\n  }\n}": typeof types.GetEditionStatsDocument,
    "query getEditions {\n  editions {\n    id\n    name\n    active\n    startDate\n    endDate\n    openingBalance\n  }\n}": typeof types.GetEditionsDocument,
    "mutation addInvoice($name: String!, $authorId: String!, $editionId: Float!, $note: String, $payments: [AddInvoicePaymentsInput!]!, $status: InvoiceStatus!, $totalAmount: Float!, $vendorId: Float!, $withoutTVA: Boolean) {\n  addInvoice(\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n    withoutTVA: $withoutTVA\n  ) {\n    id\n  }\n}": typeof types.AddInvoiceDocument,
    "mutation addOrUpdateVendor($id: Float, $name: String!, $address: String, $email: String, $phone: String, $description: String) {\n  addOrUpdateVendor(\n    id: $id\n    name: $name\n    address: $address\n    email: $email\n    phone: $phone\n    description: $description\n  ) {\n    id\n    name\n    address\n    email\n    phoneNumber\n    description\n  }\n}": typeof types.AddOrUpdateVendorDocument,
    "mutation deleteInvoice($id: Float!) {\n  deleteInvoice(id: $id) {\n    id\n  }\n}": typeof types.DeleteInvoiceDocument,
    "mutation deleteInvoiceFile($id: Float!, $deleteFromDrive: Boolean!) {\n  deleteInvoiceFile(id: $id, deleteFromDrive: $deleteFromDrive)\n}": typeof types.DeleteInvoiceFileDocument,
    "query getInvoices($editionId: Float!, $status: InvoiceStatus) {\n  invoices(editionId: $editionId, status: $status) {\n    id\n    name\n    vendorId\n    vendor {\n      id\n      name\n    }\n    totalAmount\n    note\n    author {\n      id\n    }\n    executedAt\n    status\n    payments {\n      id\n      budgetLineId\n      quantity\n      unitPrice\n    }\n    invoiceFiles {\n      id\n      fileName\n      mimeType\n      sizeBytes\n      createdAt\n    }\n  }\n}": typeof types.GetInvoicesDocument,
    "query getVendors {\n  vendors {\n    id\n    name\n  }\n}": typeof types.GetVendorsDocument,
    "mutation updateInvoice($id: Float!, $name: String, $authorId: String, $editionId: Float!, $note: String, $payments: [UpdateInvoicePaymentsInput!], $status: InvoiceStatus, $totalAmount: Float, $vendorId: Float) {\n  updateInvoice(\n    id: $id\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n  ) {\n    id\n  }\n}": typeof types.UpdateInvoiceDocument,
    "query getOrderOrigins($onlyPhysical: Boolean) {\n  orderOrigins(onlyPhysical: $onlyPhysical) {\n    id\n    name\n    isPhysical\n  }\n}": typeof types.GetOrderOriginsDocument,
    "query getOrders($editionId: Float!, $from: String, $to: String, $originIds: [Float!]) {\n  orders(editionId: $editionId, from: $from, to: $to, originIds: $originIds) {\n    id\n    totalAmount\n    executedAt\n    payerFirstName\n    payerLastName\n    payerEmail\n    helloAssoOrderId\n    authorId\n    originId\n    origin {\n      id\n      name\n    }\n    author {\n      id\n      username\n    }\n    sales {\n      id\n      budgetLineId\n      quantity\n      unitPrice\n      executedAt\n      budgetLine {\n        id\n        name\n        estimatedUnitPrice\n        category {\n          id\n          name\n          color\n        }\n      }\n    }\n  }\n}": typeof types.GetOrdersDocument,
    "mutation AddHelloAssoConfig($formSlug: String!, $editionId: Float!, $enableSynchro: Boolean!, $budgetCategoryId: Float) {\n  addHelloAssoConfig(\n    formSlug: $formSlug\n    editionId: $editionId\n    enableSynchro: $enableSynchro\n    budgetCategoryId: $budgetCategoryId\n  ) {\n    id\n    formSlug\n  }\n}": typeof types.AddHelloAssoConfigDocument,
    "mutation addOrUpdateOrderOrigin($id: Float, $name: String!, $budgetLineIds: [Float!]) {\n  addOrUpdateOrderOrigin(id: $id, name: $name, budgetLineIds: $budgetLineIds) {\n    id\n    name\n  }\n}": typeof types.AddOrUpdateOrderOriginDocument,
    "mutation deleteOrderOrigin($id: Float!) {\n  deleteOrderOrigin(id: $id) {\n    id\n    name\n  }\n}": typeof types.DeleteOrderOriginDocument,
    "mutation disconnectGoogleDrive($editionId: Float!) {\n  disconnectGoogleDrive(editionId: $editionId) {\n    editionId\n    isConnected\n    invoiceFolderId\n    googleAccountEmail\n    connectedAt\n  }\n}": typeof types.DisconnectGoogleDriveDocument,
    "query getGoogleDriveConfig($editionId: Float!) {\n  googleDriveConfig(editionId: $editionId) {\n    editionId\n    isConnected\n    invoiceFolderId\n    googleAccountEmail\n    connectedAt\n  }\n}": typeof types.GetGoogleDriveConfigDocument,
    "query getHelloAssoConfig($editionId: Float!) {\n  helloAssoConfig(editionId: $editionId) {\n    id\n    formSlug\n  }\n}": typeof types.GetHelloAssoConfigDocument,
    "mutation synchroSales($helloAssoConfigId: Float!, $from: String!, $to: String!) {\n  synchroSales(helloAssoConfigId: $helloAssoConfigId, from: $from, to: $to) {\n    id\n  }\n}": typeof types.SynchroSalesDocument,
    "mutation updateEdition($id: Float!, $name: String, $startDate: String, $endDate: String, $openingBalance: Float) {\n  updateEdition(\n    id: $id\n    name: $name\n    startDate: $startDate\n    endDate: $endDate\n    openingBalance: $openingBalance\n  ) {\n    id\n    name\n    startDate\n    endDate\n    openingBalance\n  }\n}": typeof types.UpdateEditionDocument,
    "mutation updateGoogleDriveConfig($editionId: Float!, $invoiceFolderId: String!) {\n  updateGoogleDriveConfig(\n    editionId: $editionId\n    invoiceFolderId: $invoiceFolderId\n  ) {\n    editionId\n    isConnected\n    invoiceFolderId\n    googleAccountEmail\n    connectedAt\n  }\n}": typeof types.UpdateGoogleDriveConfigDocument,
};
const documents: Documents = {
    "mutation AddBudgetCategory($name: String!, $color: String!) {\n  addBudgetCategory(name: $name, color: $color) {\n    id\n    name\n    color\n  }\n}": types.AddBudgetCategoryDocument,
    "mutation addBudgetLine($name: String!, $budgetCategoryId: Float!, $description: String, $editionId: Float!, $estimatedQuantity: Int!, $estimatedUnitPrice: Float!, $isFreePrice: Boolean, $lineType: LineTypeEnum!) {\n  addBudgetLine(\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    isFreePrice: $isFreePrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}": types.AddBudgetLineDocument,
    "mutation deleteBudgetLine($id: Float!) {\n  deleteBudgetLine(id: $id) {\n    id\n    name\n  }\n}": types.DeleteBudgetLineDocument,
    "query getBudgetCategories {\n  budgetCategories {\n    id\n    name\n    color\n  }\n}": types.GetBudgetCategoriesDocument,
    "query getBudgetLines($editionId: Float!, $budgetLineType: LineTypeEnum!, $excludeHelloAsso: Boolean) {\n  budgetLines(\n    editionId: $editionId\n    budgetLineType: $budgetLineType\n    excludeHelloAsso: $excludeHelloAsso\n  ) {\n    id\n    name\n    description\n    estimatedQuantity\n    estimatedUnitPrice\n    isFreePrice\n    realCost\n    salesCount\n    lineType\n    category {\n      id\n      name\n      color\n    }\n    helloAssoProductId\n  }\n}": types.GetBudgetLinesDocument,
    "mutation updateBudgetLine($id: Float!, $name: String, $budgetCategoryId: Float, $description: String, $editionId: Float, $estimatedQuantity: Int, $estimatedUnitPrice: Float, $isFreePrice: Boolean) {\n  updateBudgetLine(\n    id: $id\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    isFreePrice: $isFreePrice\n  ) {\n    id\n    name\n  }\n}": types.UpdateBudgetLineDocument,
    "query getOrderOrigin($id: Float!) {\n  orderOrigin(id: $id) {\n    id\n    name\n    isPhysical\n    budgetLines {\n      id\n      name\n      estimatedUnitPrice\n      isFreePrice\n      category {\n        id\n        name\n        color\n      }\n    }\n  }\n}": types.GetOrderOriginDocument,
    "query getSumUpConfig {\n  sumUpConfig {\n    affiliateKey\n    appId\n  }\n}": types.GetSumUpConfigDocument,
    "mutation validateOrder($editionId: Float!, $originId: Float!, $paymentMethod: ValidateOrderPaymentMethodInput!, $sales: [ValidateOrderSalesInput!]!) {\n  validateOrder(\n    editionId: $editionId\n    originId: $originId\n    paymentMethod: $paymentMethod\n    sales: $sales\n  ) {\n    id\n  }\n}": types.ValidateOrderDocument,
    "query getBudgetStatsByCategories($editionId: Float!, $lineType: LineTypeEnum!) {\n  getBudgetStatsByCategories(editionId: $editionId, lineType: $lineType) {\n    categoryName\n    totalEstimated\n    total\n  }\n}": types.GetBudgetStatsByCategoriesDocument,
    "query getEditionStats($editionId: Float!) {\n  edition(id: $editionId) {\n    id\n    totalExpense\n    totalIncome\n    totalPrevisionnalExpense\n    totalPrevisionnalIncome\n  }\n}": types.GetEditionStatsDocument,
    "query getEditions {\n  editions {\n    id\n    name\n    active\n    startDate\n    endDate\n    openingBalance\n  }\n}": types.GetEditionsDocument,
    "mutation addInvoice($name: String!, $authorId: String!, $editionId: Float!, $note: String, $payments: [AddInvoicePaymentsInput!]!, $status: InvoiceStatus!, $totalAmount: Float!, $vendorId: Float!, $withoutTVA: Boolean) {\n  addInvoice(\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n    withoutTVA: $withoutTVA\n  ) {\n    id\n  }\n}": types.AddInvoiceDocument,
    "mutation addOrUpdateVendor($id: Float, $name: String!, $address: String, $email: String, $phone: String, $description: String) {\n  addOrUpdateVendor(\n    id: $id\n    name: $name\n    address: $address\n    email: $email\n    phone: $phone\n    description: $description\n  ) {\n    id\n    name\n    address\n    email\n    phoneNumber\n    description\n  }\n}": types.AddOrUpdateVendorDocument,
    "mutation deleteInvoice($id: Float!) {\n  deleteInvoice(id: $id) {\n    id\n  }\n}": types.DeleteInvoiceDocument,
    "mutation deleteInvoiceFile($id: Float!, $deleteFromDrive: Boolean!) {\n  deleteInvoiceFile(id: $id, deleteFromDrive: $deleteFromDrive)\n}": types.DeleteInvoiceFileDocument,
    "query getInvoices($editionId: Float!, $status: InvoiceStatus) {\n  invoices(editionId: $editionId, status: $status) {\n    id\n    name\n    vendorId\n    vendor {\n      id\n      name\n    }\n    totalAmount\n    note\n    author {\n      id\n    }\n    executedAt\n    status\n    payments {\n      id\n      budgetLineId\n      quantity\n      unitPrice\n    }\n    invoiceFiles {\n      id\n      fileName\n      mimeType\n      sizeBytes\n      createdAt\n    }\n  }\n}": types.GetInvoicesDocument,
    "query getVendors {\n  vendors {\n    id\n    name\n  }\n}": types.GetVendorsDocument,
    "mutation updateInvoice($id: Float!, $name: String, $authorId: String, $editionId: Float!, $note: String, $payments: [UpdateInvoicePaymentsInput!], $status: InvoiceStatus, $totalAmount: Float, $vendorId: Float) {\n  updateInvoice(\n    id: $id\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n  ) {\n    id\n  }\n}": types.UpdateInvoiceDocument,
    "query getOrderOrigins($onlyPhysical: Boolean) {\n  orderOrigins(onlyPhysical: $onlyPhysical) {\n    id\n    name\n    isPhysical\n  }\n}": types.GetOrderOriginsDocument,
    "query getOrders($editionId: Float!, $from: String, $to: String, $originIds: [Float!]) {\n  orders(editionId: $editionId, from: $from, to: $to, originIds: $originIds) {\n    id\n    totalAmount\n    executedAt\n    payerFirstName\n    payerLastName\n    payerEmail\n    helloAssoOrderId\n    authorId\n    originId\n    origin {\n      id\n      name\n    }\n    author {\n      id\n      username\n    }\n    sales {\n      id\n      budgetLineId\n      quantity\n      unitPrice\n      executedAt\n      budgetLine {\n        id\n        name\n        estimatedUnitPrice\n        category {\n          id\n          name\n          color\n        }\n      }\n    }\n  }\n}": types.GetOrdersDocument,
    "mutation AddHelloAssoConfig($formSlug: String!, $editionId: Float!, $enableSynchro: Boolean!, $budgetCategoryId: Float) {\n  addHelloAssoConfig(\n    formSlug: $formSlug\n    editionId: $editionId\n    enableSynchro: $enableSynchro\n    budgetCategoryId: $budgetCategoryId\n  ) {\n    id\n    formSlug\n  }\n}": types.AddHelloAssoConfigDocument,
    "mutation addOrUpdateOrderOrigin($id: Float, $name: String!, $budgetLineIds: [Float!]) {\n  addOrUpdateOrderOrigin(id: $id, name: $name, budgetLineIds: $budgetLineIds) {\n    id\n    name\n  }\n}": types.AddOrUpdateOrderOriginDocument,
    "mutation deleteOrderOrigin($id: Float!) {\n  deleteOrderOrigin(id: $id) {\n    id\n    name\n  }\n}": types.DeleteOrderOriginDocument,
    "mutation disconnectGoogleDrive($editionId: Float!) {\n  disconnectGoogleDrive(editionId: $editionId) {\n    editionId\n    isConnected\n    invoiceFolderId\n    googleAccountEmail\n    connectedAt\n  }\n}": types.DisconnectGoogleDriveDocument,
    "query getGoogleDriveConfig($editionId: Float!) {\n  googleDriveConfig(editionId: $editionId) {\n    editionId\n    isConnected\n    invoiceFolderId\n    googleAccountEmail\n    connectedAt\n  }\n}": types.GetGoogleDriveConfigDocument,
    "query getHelloAssoConfig($editionId: Float!) {\n  helloAssoConfig(editionId: $editionId) {\n    id\n    formSlug\n  }\n}": types.GetHelloAssoConfigDocument,
    "mutation synchroSales($helloAssoConfigId: Float!, $from: String!, $to: String!) {\n  synchroSales(helloAssoConfigId: $helloAssoConfigId, from: $from, to: $to) {\n    id\n  }\n}": types.SynchroSalesDocument,
    "mutation updateEdition($id: Float!, $name: String, $startDate: String, $endDate: String, $openingBalance: Float) {\n  updateEdition(\n    id: $id\n    name: $name\n    startDate: $startDate\n    endDate: $endDate\n    openingBalance: $openingBalance\n  ) {\n    id\n    name\n    startDate\n    endDate\n    openingBalance\n  }\n}": types.UpdateEditionDocument,
    "mutation updateGoogleDriveConfig($editionId: Float!, $invoiceFolderId: String!) {\n  updateGoogleDriveConfig(\n    editionId: $editionId\n    invoiceFolderId: $invoiceFolderId\n  ) {\n    editionId\n    isConnected\n    invoiceFolderId\n    googleAccountEmail\n    connectedAt\n  }\n}": types.UpdateGoogleDriveConfigDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddBudgetCategory($name: String!, $color: String!) {\n  addBudgetCategory(name: $name, color: $color) {\n    id\n    name\n    color\n  }\n}"): (typeof documents)["mutation AddBudgetCategory($name: String!, $color: String!) {\n  addBudgetCategory(name: $name, color: $color) {\n    id\n    name\n    color\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation addBudgetLine($name: String!, $budgetCategoryId: Float!, $description: String, $editionId: Float!, $estimatedQuantity: Int!, $estimatedUnitPrice: Float!, $isFreePrice: Boolean, $lineType: LineTypeEnum!) {\n  addBudgetLine(\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    isFreePrice: $isFreePrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation addBudgetLine($name: String!, $budgetCategoryId: Float!, $description: String, $editionId: Float!, $estimatedQuantity: Int!, $estimatedUnitPrice: Float!, $isFreePrice: Boolean, $lineType: LineTypeEnum!) {\n  addBudgetLine(\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    isFreePrice: $isFreePrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation deleteBudgetLine($id: Float!) {\n  deleteBudgetLine(id: $id) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation deleteBudgetLine($id: Float!) {\n  deleteBudgetLine(id: $id) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getBudgetCategories {\n  budgetCategories {\n    id\n    name\n    color\n  }\n}"): (typeof documents)["query getBudgetCategories {\n  budgetCategories {\n    id\n    name\n    color\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getBudgetLines($editionId: Float!, $budgetLineType: LineTypeEnum!, $excludeHelloAsso: Boolean) {\n  budgetLines(\n    editionId: $editionId\n    budgetLineType: $budgetLineType\n    excludeHelloAsso: $excludeHelloAsso\n  ) {\n    id\n    name\n    description\n    estimatedQuantity\n    estimatedUnitPrice\n    isFreePrice\n    realCost\n    salesCount\n    lineType\n    category {\n      id\n      name\n      color\n    }\n    helloAssoProductId\n  }\n}"): (typeof documents)["query getBudgetLines($editionId: Float!, $budgetLineType: LineTypeEnum!, $excludeHelloAsso: Boolean) {\n  budgetLines(\n    editionId: $editionId\n    budgetLineType: $budgetLineType\n    excludeHelloAsso: $excludeHelloAsso\n  ) {\n    id\n    name\n    description\n    estimatedQuantity\n    estimatedUnitPrice\n    isFreePrice\n    realCost\n    salesCount\n    lineType\n    category {\n      id\n      name\n      color\n    }\n    helloAssoProductId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateBudgetLine($id: Float!, $name: String, $budgetCategoryId: Float, $description: String, $editionId: Float, $estimatedQuantity: Int, $estimatedUnitPrice: Float, $isFreePrice: Boolean) {\n  updateBudgetLine(\n    id: $id\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    isFreePrice: $isFreePrice\n  ) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation updateBudgetLine($id: Float!, $name: String, $budgetCategoryId: Float, $description: String, $editionId: Float, $estimatedQuantity: Int, $estimatedUnitPrice: Float, $isFreePrice: Boolean) {\n  updateBudgetLine(\n    id: $id\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    isFreePrice: $isFreePrice\n  ) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getOrderOrigin($id: Float!) {\n  orderOrigin(id: $id) {\n    id\n    name\n    isPhysical\n    budgetLines {\n      id\n      name\n      estimatedUnitPrice\n      isFreePrice\n      category {\n        id\n        name\n        color\n      }\n    }\n  }\n}"): (typeof documents)["query getOrderOrigin($id: Float!) {\n  orderOrigin(id: $id) {\n    id\n    name\n    isPhysical\n    budgetLines {\n      id\n      name\n      estimatedUnitPrice\n      isFreePrice\n      category {\n        id\n        name\n        color\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getSumUpConfig {\n  sumUpConfig {\n    affiliateKey\n    appId\n  }\n}"): (typeof documents)["query getSumUpConfig {\n  sumUpConfig {\n    affiliateKey\n    appId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation validateOrder($editionId: Float!, $originId: Float!, $paymentMethod: ValidateOrderPaymentMethodInput!, $sales: [ValidateOrderSalesInput!]!) {\n  validateOrder(\n    editionId: $editionId\n    originId: $originId\n    paymentMethod: $paymentMethod\n    sales: $sales\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation validateOrder($editionId: Float!, $originId: Float!, $paymentMethod: ValidateOrderPaymentMethodInput!, $sales: [ValidateOrderSalesInput!]!) {\n  validateOrder(\n    editionId: $editionId\n    originId: $originId\n    paymentMethod: $paymentMethod\n    sales: $sales\n  ) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getBudgetStatsByCategories($editionId: Float!, $lineType: LineTypeEnum!) {\n  getBudgetStatsByCategories(editionId: $editionId, lineType: $lineType) {\n    categoryName\n    totalEstimated\n    total\n  }\n}"): (typeof documents)["query getBudgetStatsByCategories($editionId: Float!, $lineType: LineTypeEnum!) {\n  getBudgetStatsByCategories(editionId: $editionId, lineType: $lineType) {\n    categoryName\n    totalEstimated\n    total\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getEditionStats($editionId: Float!) {\n  edition(id: $editionId) {\n    id\n    totalExpense\n    totalIncome\n    totalPrevisionnalExpense\n    totalPrevisionnalIncome\n  }\n}"): (typeof documents)["query getEditionStats($editionId: Float!) {\n  edition(id: $editionId) {\n    id\n    totalExpense\n    totalIncome\n    totalPrevisionnalExpense\n    totalPrevisionnalIncome\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getEditions {\n  editions {\n    id\n    name\n    active\n    startDate\n    endDate\n    openingBalance\n  }\n}"): (typeof documents)["query getEditions {\n  editions {\n    id\n    name\n    active\n    startDate\n    endDate\n    openingBalance\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation addInvoice($name: String!, $authorId: String!, $editionId: Float!, $note: String, $payments: [AddInvoicePaymentsInput!]!, $status: InvoiceStatus!, $totalAmount: Float!, $vendorId: Float!, $withoutTVA: Boolean) {\n  addInvoice(\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n    withoutTVA: $withoutTVA\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation addInvoice($name: String!, $authorId: String!, $editionId: Float!, $note: String, $payments: [AddInvoicePaymentsInput!]!, $status: InvoiceStatus!, $totalAmount: Float!, $vendorId: Float!, $withoutTVA: Boolean) {\n  addInvoice(\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n    withoutTVA: $withoutTVA\n  ) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation addOrUpdateVendor($id: Float, $name: String!, $address: String, $email: String, $phone: String, $description: String) {\n  addOrUpdateVendor(\n    id: $id\n    name: $name\n    address: $address\n    email: $email\n    phone: $phone\n    description: $description\n  ) {\n    id\n    name\n    address\n    email\n    phoneNumber\n    description\n  }\n}"): (typeof documents)["mutation addOrUpdateVendor($id: Float, $name: String!, $address: String, $email: String, $phone: String, $description: String) {\n  addOrUpdateVendor(\n    id: $id\n    name: $name\n    address: $address\n    email: $email\n    phone: $phone\n    description: $description\n  ) {\n    id\n    name\n    address\n    email\n    phoneNumber\n    description\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation deleteInvoice($id: Float!) {\n  deleteInvoice(id: $id) {\n    id\n  }\n}"): (typeof documents)["mutation deleteInvoice($id: Float!) {\n  deleteInvoice(id: $id) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation deleteInvoiceFile($id: Float!, $deleteFromDrive: Boolean!) {\n  deleteInvoiceFile(id: $id, deleteFromDrive: $deleteFromDrive)\n}"): (typeof documents)["mutation deleteInvoiceFile($id: Float!, $deleteFromDrive: Boolean!) {\n  deleteInvoiceFile(id: $id, deleteFromDrive: $deleteFromDrive)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getInvoices($editionId: Float!, $status: InvoiceStatus) {\n  invoices(editionId: $editionId, status: $status) {\n    id\n    name\n    vendorId\n    vendor {\n      id\n      name\n    }\n    totalAmount\n    note\n    author {\n      id\n    }\n    executedAt\n    status\n    payments {\n      id\n      budgetLineId\n      quantity\n      unitPrice\n    }\n    invoiceFiles {\n      id\n      fileName\n      mimeType\n      sizeBytes\n      createdAt\n    }\n  }\n}"): (typeof documents)["query getInvoices($editionId: Float!, $status: InvoiceStatus) {\n  invoices(editionId: $editionId, status: $status) {\n    id\n    name\n    vendorId\n    vendor {\n      id\n      name\n    }\n    totalAmount\n    note\n    author {\n      id\n    }\n    executedAt\n    status\n    payments {\n      id\n      budgetLineId\n      quantity\n      unitPrice\n    }\n    invoiceFiles {\n      id\n      fileName\n      mimeType\n      sizeBytes\n      createdAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getVendors {\n  vendors {\n    id\n    name\n  }\n}"): (typeof documents)["query getVendors {\n  vendors {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateInvoice($id: Float!, $name: String, $authorId: String, $editionId: Float!, $note: String, $payments: [UpdateInvoicePaymentsInput!], $status: InvoiceStatus, $totalAmount: Float, $vendorId: Float) {\n  updateInvoice(\n    id: $id\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation updateInvoice($id: Float!, $name: String, $authorId: String, $editionId: Float!, $note: String, $payments: [UpdateInvoicePaymentsInput!], $status: InvoiceStatus, $totalAmount: Float, $vendorId: Float) {\n  updateInvoice(\n    id: $id\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n  ) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getOrderOrigins($onlyPhysical: Boolean) {\n  orderOrigins(onlyPhysical: $onlyPhysical) {\n    id\n    name\n    isPhysical\n  }\n}"): (typeof documents)["query getOrderOrigins($onlyPhysical: Boolean) {\n  orderOrigins(onlyPhysical: $onlyPhysical) {\n    id\n    name\n    isPhysical\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getOrders($editionId: Float!, $from: String, $to: String, $originIds: [Float!]) {\n  orders(editionId: $editionId, from: $from, to: $to, originIds: $originIds) {\n    id\n    totalAmount\n    executedAt\n    payerFirstName\n    payerLastName\n    payerEmail\n    helloAssoOrderId\n    authorId\n    originId\n    origin {\n      id\n      name\n    }\n    author {\n      id\n      username\n    }\n    sales {\n      id\n      budgetLineId\n      quantity\n      unitPrice\n      executedAt\n      budgetLine {\n        id\n        name\n        estimatedUnitPrice\n        category {\n          id\n          name\n          color\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query getOrders($editionId: Float!, $from: String, $to: String, $originIds: [Float!]) {\n  orders(editionId: $editionId, from: $from, to: $to, originIds: $originIds) {\n    id\n    totalAmount\n    executedAt\n    payerFirstName\n    payerLastName\n    payerEmail\n    helloAssoOrderId\n    authorId\n    originId\n    origin {\n      id\n      name\n    }\n    author {\n      id\n      username\n    }\n    sales {\n      id\n      budgetLineId\n      quantity\n      unitPrice\n      executedAt\n      budgetLine {\n        id\n        name\n        estimatedUnitPrice\n        category {\n          id\n          name\n          color\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddHelloAssoConfig($formSlug: String!, $editionId: Float!, $enableSynchro: Boolean!, $budgetCategoryId: Float) {\n  addHelloAssoConfig(\n    formSlug: $formSlug\n    editionId: $editionId\n    enableSynchro: $enableSynchro\n    budgetCategoryId: $budgetCategoryId\n  ) {\n    id\n    formSlug\n  }\n}"): (typeof documents)["mutation AddHelloAssoConfig($formSlug: String!, $editionId: Float!, $enableSynchro: Boolean!, $budgetCategoryId: Float) {\n  addHelloAssoConfig(\n    formSlug: $formSlug\n    editionId: $editionId\n    enableSynchro: $enableSynchro\n    budgetCategoryId: $budgetCategoryId\n  ) {\n    id\n    formSlug\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation addOrUpdateOrderOrigin($id: Float, $name: String!, $budgetLineIds: [Float!]) {\n  addOrUpdateOrderOrigin(id: $id, name: $name, budgetLineIds: $budgetLineIds) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation addOrUpdateOrderOrigin($id: Float, $name: String!, $budgetLineIds: [Float!]) {\n  addOrUpdateOrderOrigin(id: $id, name: $name, budgetLineIds: $budgetLineIds) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation deleteOrderOrigin($id: Float!) {\n  deleteOrderOrigin(id: $id) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation deleteOrderOrigin($id: Float!) {\n  deleteOrderOrigin(id: $id) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation disconnectGoogleDrive($editionId: Float!) {\n  disconnectGoogleDrive(editionId: $editionId) {\n    editionId\n    isConnected\n    invoiceFolderId\n    googleAccountEmail\n    connectedAt\n  }\n}"): (typeof documents)["mutation disconnectGoogleDrive($editionId: Float!) {\n  disconnectGoogleDrive(editionId: $editionId) {\n    editionId\n    isConnected\n    invoiceFolderId\n    googleAccountEmail\n    connectedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getGoogleDriveConfig($editionId: Float!) {\n  googleDriveConfig(editionId: $editionId) {\n    editionId\n    isConnected\n    invoiceFolderId\n    googleAccountEmail\n    connectedAt\n  }\n}"): (typeof documents)["query getGoogleDriveConfig($editionId: Float!) {\n  googleDriveConfig(editionId: $editionId) {\n    editionId\n    isConnected\n    invoiceFolderId\n    googleAccountEmail\n    connectedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getHelloAssoConfig($editionId: Float!) {\n  helloAssoConfig(editionId: $editionId) {\n    id\n    formSlug\n  }\n}"): (typeof documents)["query getHelloAssoConfig($editionId: Float!) {\n  helloAssoConfig(editionId: $editionId) {\n    id\n    formSlug\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation synchroSales($helloAssoConfigId: Float!, $from: String!, $to: String!) {\n  synchroSales(helloAssoConfigId: $helloAssoConfigId, from: $from, to: $to) {\n    id\n  }\n}"): (typeof documents)["mutation synchroSales($helloAssoConfigId: Float!, $from: String!, $to: String!) {\n  synchroSales(helloAssoConfigId: $helloAssoConfigId, from: $from, to: $to) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateEdition($id: Float!, $name: String, $startDate: String, $endDate: String, $openingBalance: Float) {\n  updateEdition(\n    id: $id\n    name: $name\n    startDate: $startDate\n    endDate: $endDate\n    openingBalance: $openingBalance\n  ) {\n    id\n    name\n    startDate\n    endDate\n    openingBalance\n  }\n}"): (typeof documents)["mutation updateEdition($id: Float!, $name: String, $startDate: String, $endDate: String, $openingBalance: Float) {\n  updateEdition(\n    id: $id\n    name: $name\n    startDate: $startDate\n    endDate: $endDate\n    openingBalance: $openingBalance\n  ) {\n    id\n    name\n    startDate\n    endDate\n    openingBalance\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateGoogleDriveConfig($editionId: Float!, $invoiceFolderId: String!) {\n  updateGoogleDriveConfig(\n    editionId: $editionId\n    invoiceFolderId: $invoiceFolderId\n  ) {\n    editionId\n    isConnected\n    invoiceFolderId\n    googleAccountEmail\n    connectedAt\n  }\n}"): (typeof documents)["mutation updateGoogleDriveConfig($editionId: Float!, $invoiceFolderId: String!) {\n  updateGoogleDriveConfig(\n    editionId: $editionId\n    invoiceFolderId: $invoiceFolderId\n  ) {\n    editionId\n    isConnected\n    invoiceFolderId\n    googleAccountEmail\n    connectedAt\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;