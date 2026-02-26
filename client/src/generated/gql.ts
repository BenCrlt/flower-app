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
    "mutation addBudgetLine($name: String!, $budgetCategoryId: Float!, $description: String, $editionId: Float!, $estimatedQuantity: Int!, $estimatedUnitPrice: Float!, $lineType: BudgetLinesBudgetLineTypeInput!) {\n  addBudgetLine(\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}": typeof types.AddBudgetLineDocument,
    "mutation deleteBudgetLine($id: Float!) {\n  deleteBudgetLine(id: $id) {\n    id\n    name\n  }\n}": typeof types.DeleteBudgetLineDocument,
    "query getBudgetLines($editionId: Float!, $budgetLineType: BudgetLinesBudgetLineTypeInput!) {\n  budgetLines(editionId: $editionId, budgetLineType: $budgetLineType) {\n    id\n    name\n    description\n    estimatedQuantity\n    estimatedUnitPrice\n    category {\n      id\n      name\n    }\n  }\n}": typeof types.GetBudgetLinesDocument,
    "query getBudgetCategories {\n  budgetCategories {\n    id\n    name\n  }\n}": typeof types.GetBudgetCategoriesDocument,
    "mutation updateBudgetLine($id: Float!, $name: String, $budgetCategoryId: Float, $description: String, $editionId: Float, $estimatedQuantity: Int, $estimatedUnitPrice: Float, $lineType: BudgetLinesBudgetLineTypeInput) {\n  updateBudgetLine(\n    id: $id\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}": typeof types.UpdateBudgetLineDocument,
    "query getEditions {\n  editions {\n    id\n    name\n    startDate\n    totalExpense\n    totalIncome\n    totalPrevisionnalExpense\n    totalPrevisionnalIncome\n  }\n}": typeof types.GetEditionsDocument,
};
const documents: Documents = {
    "mutation addBudgetLine($name: String!, $budgetCategoryId: Float!, $description: String, $editionId: Float!, $estimatedQuantity: Int!, $estimatedUnitPrice: Float!, $lineType: BudgetLinesBudgetLineTypeInput!) {\n  addBudgetLine(\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}": types.AddBudgetLineDocument,
    "mutation deleteBudgetLine($id: Float!) {\n  deleteBudgetLine(id: $id) {\n    id\n    name\n  }\n}": types.DeleteBudgetLineDocument,
    "query getBudgetLines($editionId: Float!, $budgetLineType: BudgetLinesBudgetLineTypeInput!) {\n  budgetLines(editionId: $editionId, budgetLineType: $budgetLineType) {\n    id\n    name\n    description\n    estimatedQuantity\n    estimatedUnitPrice\n    category {\n      id\n      name\n    }\n  }\n}": types.GetBudgetLinesDocument,
    "query getBudgetCategories {\n  budgetCategories {\n    id\n    name\n  }\n}": types.GetBudgetCategoriesDocument,
    "mutation updateBudgetLine($id: Float!, $name: String, $budgetCategoryId: Float, $description: String, $editionId: Float, $estimatedQuantity: Int, $estimatedUnitPrice: Float, $lineType: BudgetLinesBudgetLineTypeInput) {\n  updateBudgetLine(\n    id: $id\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}": types.UpdateBudgetLineDocument,
    "query getEditions {\n  editions {\n    id\n    name\n    startDate\n    totalExpense\n    totalIncome\n    totalPrevisionnalExpense\n    totalPrevisionnalIncome\n  }\n}": types.GetEditionsDocument,
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
export function graphql(source: "mutation addBudgetLine($name: String!, $budgetCategoryId: Float!, $description: String, $editionId: Float!, $estimatedQuantity: Int!, $estimatedUnitPrice: Float!, $lineType: BudgetLinesBudgetLineTypeInput!) {\n  addBudgetLine(\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation addBudgetLine($name: String!, $budgetCategoryId: Float!, $description: String, $editionId: Float!, $estimatedQuantity: Int!, $estimatedUnitPrice: Float!, $lineType: BudgetLinesBudgetLineTypeInput!) {\n  addBudgetLine(\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation deleteBudgetLine($id: Float!) {\n  deleteBudgetLine(id: $id) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation deleteBudgetLine($id: Float!) {\n  deleteBudgetLine(id: $id) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getBudgetLines($editionId: Float!, $budgetLineType: BudgetLinesBudgetLineTypeInput!) {\n  budgetLines(editionId: $editionId, budgetLineType: $budgetLineType) {\n    id\n    name\n    description\n    estimatedQuantity\n    estimatedUnitPrice\n    category {\n      id\n      name\n    }\n  }\n}"): (typeof documents)["query getBudgetLines($editionId: Float!, $budgetLineType: BudgetLinesBudgetLineTypeInput!) {\n  budgetLines(editionId: $editionId, budgetLineType: $budgetLineType) {\n    id\n    name\n    description\n    estimatedQuantity\n    estimatedUnitPrice\n    category {\n      id\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getBudgetCategories {\n  budgetCategories {\n    id\n    name\n  }\n}"): (typeof documents)["query getBudgetCategories {\n  budgetCategories {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateBudgetLine($id: Float!, $name: String, $budgetCategoryId: Float, $description: String, $editionId: Float, $estimatedQuantity: Int, $estimatedUnitPrice: Float, $lineType: BudgetLinesBudgetLineTypeInput) {\n  updateBudgetLine(\n    id: $id\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation updateBudgetLine($id: Float!, $name: String, $budgetCategoryId: Float, $description: String, $editionId: Float, $estimatedQuantity: Int, $estimatedUnitPrice: Float, $lineType: BudgetLinesBudgetLineTypeInput) {\n  updateBudgetLine(\n    id: $id\n    name: $name\n    budgetCategoryId: $budgetCategoryId\n    description: $description\n    editionId: $editionId\n    estimatedQuantity: $estimatedQuantity\n    estimatedUnitPrice: $estimatedUnitPrice\n    lineType: $lineType\n  ) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getEditions {\n  editions {\n    id\n    name\n    startDate\n    totalExpense\n    totalIncome\n    totalPrevisionnalExpense\n    totalPrevisionnalIncome\n  }\n}"): (typeof documents)["query getEditions {\n  editions {\n    id\n    name\n    startDate\n    totalExpense\n    totalIncome\n    totalPrevisionnalExpense\n    totalPrevisionnalIncome\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;