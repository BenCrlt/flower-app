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
    "mutation addBudgetLine($name: String!, $budgetCategoryId: Float!, $description: String, $editionId: Float!, $estimatedQuantity: Int!, $estimatedUnitPrice: Float!, $lineType: LineTypeEnum!) {\n  addBudgetLine(\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}": typeof types.AddBudgetLineDocument,
    "mutation deleteBudgetLine($id: Float!) {\n  deleteBudgetLine(id: $id) {\n    id\n    name\n  }\n}": typeof types.DeleteBudgetLineDocument,
    "query getBudgetCategories {\n  budgetCategories {\n    id\n    name\n    color\n  }\n}": typeof types.GetBudgetCategoriesDocument,
    "query getBudgetLines($editionId: Float!, $budgetLineType: LineTypeEnum!) {\n  budgetLines(editionId: $editionId, budgetLineType: $budgetLineType) {\n    id\n    name\n    description\n    estimatedQuantity\n    estimatedUnitPrice\n    realCost\n    category {\n      id\n      name\n      color\n    }\n  }\n}": typeof types.GetBudgetLinesDocument,
    "mutation updateBudgetLine($id: Float!, $name: String, $budgetCategoryId: Float, $description: String, $editionId: Float, $estimatedQuantity: Int, $estimatedUnitPrice: Float, $lineType: LineTypeEnum) {\n  updateBudgetLine(\n    id: $id\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}": typeof types.UpdateBudgetLineDocument,
    "query getBudgetStatsByCategories($editionId: Float!, $lineType: LineTypeEnum!) {\n  getBudgetStatsByCategories(editionId: $editionId, lineType: $lineType) {\n    categoryName\n    totalEstimated\n    total\n  }\n}": typeof types.GetBudgetStatsByCategoriesDocument,
    "query getEditions {\n  editions {\n    id\n    name\n    active\n    startDate\n    totalExpense\n    totalIncome\n    totalPrevisionnalExpense\n    totalPrevisionnalIncome\n  }\n}": typeof types.GetEditionsDocument,
    "mutation addInvoice($name: String!, $authorId: ID!, $editionId: Float!, $note: String, $payments: [AddInvoicePaymentsInput!]!, $status: InvoiceStatus!, $totalAmount: Float!, $vendorId: Float!) {\n  addInvoice(\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n  ) {\n    id\n  }\n}": typeof types.AddInvoiceDocument,
    "mutation addOrUpdateVendor($id: Float, $name: String!, $address: String, $email: String, $phone: String, $description: String) {\n  addOrUpdateVendor(\n    id: $id\n    name: $name\n    address: $address\n    email: $email\n    phone: $phone\n    description: $description\n  ) {\n    id\n    name\n    address\n    email\n    phoneNumber\n    description\n  }\n}": typeof types.AddOrUpdateVendorDocument,
    "mutation deleteInvoice($id: Float!) {\n  deleteInvoice(id: $id) {\n    id\n  }\n}": typeof types.DeleteInvoiceDocument,
    "query getInvoices($editionId: Float!, $status: InvoiceStatus) {\n  invoices(editionId: $editionId, status: $status) {\n    id\n    name\n    vendorId\n    vendor {\n      id\n      name\n    }\n    totalAmount\n    note\n    author {\n      id\n    }\n    executedAt\n    status\n    payments {\n      id\n      budgetLineId\n      quantity\n      unitPrice\n    }\n  }\n}": typeof types.GetInvoicesDocument,
    "query getVendors {\n  vendors {\n    id\n    name\n  }\n}": typeof types.GetVendorsDocument,
    "mutation updateInvoice($id: Float!, $name: String, $authorId: ID, $editionId: Float!, $note: String, $payments: [UpdateInvoicePaymentsInput!], $status: InvoiceStatus, $totalAmount: Float, $vendorId: Float) {\n  updateInvoice(\n    id: $id\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n  ) {\n    id\n  }\n}": typeof types.UpdateInvoiceDocument,
};
const documents: Documents = {
    "mutation AddBudgetCategory($name: String!, $color: String!) {\n  addBudgetCategory(name: $name, color: $color) {\n    id\n    name\n    color\n  }\n}": types.AddBudgetCategoryDocument,
    "mutation addBudgetLine($name: String!, $budgetCategoryId: Float!, $description: String, $editionId: Float!, $estimatedQuantity: Int!, $estimatedUnitPrice: Float!, $lineType: LineTypeEnum!) {\n  addBudgetLine(\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}": types.AddBudgetLineDocument,
    "mutation deleteBudgetLine($id: Float!) {\n  deleteBudgetLine(id: $id) {\n    id\n    name\n  }\n}": types.DeleteBudgetLineDocument,
    "query getBudgetCategories {\n  budgetCategories {\n    id\n    name\n    color\n  }\n}": types.GetBudgetCategoriesDocument,
    "query getBudgetLines($editionId: Float!, $budgetLineType: LineTypeEnum!) {\n  budgetLines(editionId: $editionId, budgetLineType: $budgetLineType) {\n    id\n    name\n    description\n    estimatedQuantity\n    estimatedUnitPrice\n    realCost\n    category {\n      id\n      name\n      color\n    }\n  }\n}": types.GetBudgetLinesDocument,
    "mutation updateBudgetLine($id: Float!, $name: String, $budgetCategoryId: Float, $description: String, $editionId: Float, $estimatedQuantity: Int, $estimatedUnitPrice: Float, $lineType: LineTypeEnum) {\n  updateBudgetLine(\n    id: $id\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}": types.UpdateBudgetLineDocument,
    "query getBudgetStatsByCategories($editionId: Float!, $lineType: LineTypeEnum!) {\n  getBudgetStatsByCategories(editionId: $editionId, lineType: $lineType) {\n    categoryName\n    totalEstimated\n    total\n  }\n}": types.GetBudgetStatsByCategoriesDocument,
    "query getEditions {\n  editions {\n    id\n    name\n    active\n    startDate\n    totalExpense\n    totalIncome\n    totalPrevisionnalExpense\n    totalPrevisionnalIncome\n  }\n}": types.GetEditionsDocument,
    "mutation addInvoice($name: String!, $authorId: ID!, $editionId: Float!, $note: String, $payments: [AddInvoicePaymentsInput!]!, $status: InvoiceStatus!, $totalAmount: Float!, $vendorId: Float!) {\n  addInvoice(\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n  ) {\n    id\n  }\n}": types.AddInvoiceDocument,
    "mutation addOrUpdateVendor($id: Float, $name: String!, $address: String, $email: String, $phone: String, $description: String) {\n  addOrUpdateVendor(\n    id: $id\n    name: $name\n    address: $address\n    email: $email\n    phone: $phone\n    description: $description\n  ) {\n    id\n    name\n    address\n    email\n    phoneNumber\n    description\n  }\n}": types.AddOrUpdateVendorDocument,
    "mutation deleteInvoice($id: Float!) {\n  deleteInvoice(id: $id) {\n    id\n  }\n}": types.DeleteInvoiceDocument,
    "query getInvoices($editionId: Float!, $status: InvoiceStatus) {\n  invoices(editionId: $editionId, status: $status) {\n    id\n    name\n    vendorId\n    vendor {\n      id\n      name\n    }\n    totalAmount\n    note\n    author {\n      id\n    }\n    executedAt\n    status\n    payments {\n      id\n      budgetLineId\n      quantity\n      unitPrice\n    }\n  }\n}": types.GetInvoicesDocument,
    "query getVendors {\n  vendors {\n    id\n    name\n  }\n}": types.GetVendorsDocument,
    "mutation updateInvoice($id: Float!, $name: String, $authorId: ID, $editionId: Float!, $note: String, $payments: [UpdateInvoicePaymentsInput!], $status: InvoiceStatus, $totalAmount: Float, $vendorId: Float) {\n  updateInvoice(\n    id: $id\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n  ) {\n    id\n  }\n}": types.UpdateInvoiceDocument,
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
export function graphql(source: "mutation addBudgetLine($name: String!, $budgetCategoryId: Float!, $description: String, $editionId: Float!, $estimatedQuantity: Int!, $estimatedUnitPrice: Float!, $lineType: LineTypeEnum!) {\n  addBudgetLine(\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation addBudgetLine($name: String!, $budgetCategoryId: Float!, $description: String, $editionId: Float!, $estimatedQuantity: Int!, $estimatedUnitPrice: Float!, $lineType: LineTypeEnum!) {\n  addBudgetLine(\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}"];
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
export function graphql(source: "query getBudgetLines($editionId: Float!, $budgetLineType: LineTypeEnum!) {\n  budgetLines(editionId: $editionId, budgetLineType: $budgetLineType) {\n    id\n    name\n    description\n    estimatedQuantity\n    estimatedUnitPrice\n    realCost\n    category {\n      id\n      name\n      color\n    }\n  }\n}"): (typeof documents)["query getBudgetLines($editionId: Float!, $budgetLineType: LineTypeEnum!) {\n  budgetLines(editionId: $editionId, budgetLineType: $budgetLineType) {\n    id\n    name\n    description\n    estimatedQuantity\n    estimatedUnitPrice\n    realCost\n    category {\n      id\n      name\n      color\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateBudgetLine($id: Float!, $name: String, $budgetCategoryId: Float, $description: String, $editionId: Float, $estimatedQuantity: Int, $estimatedUnitPrice: Float, $lineType: LineTypeEnum) {\n  updateBudgetLine(\n    id: $id\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation updateBudgetLine($id: Float!, $name: String, $budgetCategoryId: Float, $description: String, $editionId: Float, $estimatedQuantity: Int, $estimatedUnitPrice: Float, $lineType: LineTypeEnum) {\n  updateBudgetLine(\n    id: $id\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getBudgetStatsByCategories($editionId: Float!, $lineType: LineTypeEnum!) {\n  getBudgetStatsByCategories(editionId: $editionId, lineType: $lineType) {\n    categoryName\n    totalEstimated\n    total\n  }\n}"): (typeof documents)["query getBudgetStatsByCategories($editionId: Float!, $lineType: LineTypeEnum!) {\n  getBudgetStatsByCategories(editionId: $editionId, lineType: $lineType) {\n    categoryName\n    totalEstimated\n    total\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getEditions {\n  editions {\n    id\n    name\n    active\n    startDate\n    totalExpense\n    totalIncome\n    totalPrevisionnalExpense\n    totalPrevisionnalIncome\n  }\n}"): (typeof documents)["query getEditions {\n  editions {\n    id\n    name\n    active\n    startDate\n    totalExpense\n    totalIncome\n    totalPrevisionnalExpense\n    totalPrevisionnalIncome\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation addInvoice($name: String!, $authorId: ID!, $editionId: Float!, $note: String, $payments: [AddInvoicePaymentsInput!]!, $status: InvoiceStatus!, $totalAmount: Float!, $vendorId: Float!) {\n  addInvoice(\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation addInvoice($name: String!, $authorId: ID!, $editionId: Float!, $note: String, $payments: [AddInvoicePaymentsInput!]!, $status: InvoiceStatus!, $totalAmount: Float!, $vendorId: Float!) {\n  addInvoice(\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n  ) {\n    id\n  }\n}"];
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
export function graphql(source: "query getInvoices($editionId: Float!, $status: InvoiceStatus) {\n  invoices(editionId: $editionId, status: $status) {\n    id\n    name\n    vendorId\n    vendor {\n      id\n      name\n    }\n    totalAmount\n    note\n    author {\n      id\n    }\n    executedAt\n    status\n    payments {\n      id\n      budgetLineId\n      quantity\n      unitPrice\n    }\n  }\n}"): (typeof documents)["query getInvoices($editionId: Float!, $status: InvoiceStatus) {\n  invoices(editionId: $editionId, status: $status) {\n    id\n    name\n    vendorId\n    vendor {\n      id\n      name\n    }\n    totalAmount\n    note\n    author {\n      id\n    }\n    executedAt\n    status\n    payments {\n      id\n      budgetLineId\n      quantity\n      unitPrice\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getVendors {\n  vendors {\n    id\n    name\n  }\n}"): (typeof documents)["query getVendors {\n  vendors {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateInvoice($id: Float!, $name: String, $authorId: ID, $editionId: Float!, $note: String, $payments: [UpdateInvoicePaymentsInput!], $status: InvoiceStatus, $totalAmount: Float, $vendorId: Float) {\n  updateInvoice(\n    id: $id\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation updateInvoice($id: Float!, $name: String, $authorId: ID, $editionId: Float!, $note: String, $payments: [UpdateInvoicePaymentsInput!], $status: InvoiceStatus, $totalAmount: Float, $vendorId: Float) {\n  updateInvoice(\n    id: $id\n    name: $name\n    editionId: $editionId\n    note: $note\n    payments: $payments\n    status: $status\n    totalAmount: $totalAmount\n    vendorId: $vendorId\n    authorId: $authorId\n  ) {\n    id\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;