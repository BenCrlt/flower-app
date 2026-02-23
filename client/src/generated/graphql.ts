/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum AddBudgetLineLineTypeInput {
  Expense = 'expense',
  Income = 'income'
}

export type BudgetCategoriesItem = {
  __typename?: 'BudgetCategoriesItem';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export enum BudgetLinesBudgetLineTypeInput {
  Expense = 'expense',
  Income = 'income'
}

export type BudgetLinesItem = {
  __typename?: 'BudgetLinesItem';
  budgetCategoryId: Scalars['Int']['output'];
  category?: Maybe<BudgetCategoriesItem>;
  description?: Maybe<Scalars['String']['output']>;
  editionId: Scalars['Int']['output'];
  estimatedQuantity: Scalars['Float']['output'];
  estimatedUnitPrice: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  lineType: LineType;
  name: Scalars['String']['output'];
};

export type BudgetLinesPaginatedInputInput = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
};

export type EditionsItem = {
  __typename?: 'EditionsItem';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['String']['output'];
  totalExpense: Scalars['Float']['output'];
  totalIncome: Scalars['Float']['output'];
  totalPrevisionnalExpense: Scalars['Float']['output'];
  totalPrevisionnalIncome: Scalars['Float']['output'];
};

export type GetBudgetStatsByCategoriesForIncome = {
  __typename?: 'GetBudgetStatsByCategoriesForIncome';
  categoryName: Scalars['String']['output'];
  total: Scalars['Float']['output'];
  totalEstimated: Scalars['Float']['output'];
};

export enum LineType {
  Expense = 'EXPENSE',
  Income = 'INCOME'
}

export type Mutation = {
  __typename?: 'Mutation';
  addBudgetCategory?: Maybe<BudgetCategoriesItem>;
  addBudgetLine?: Maybe<BudgetLinesItem>;
  addEdition?: Maybe<EditionsItem>;
  deleteBudgetCategory?: Maybe<BudgetCategoriesItem>;
  deleteBudgetLine?: Maybe<BudgetLinesItem>;
  deleteEdition?: Maybe<EditionsItem>;
  updateBudgetCategory?: Maybe<BudgetCategoriesItem>;
  updateBudgetLine?: Maybe<BudgetLinesItem>;
  updateEdition?: Maybe<EditionsItem>;
};


export type MutationAddBudgetCategoryArgs = {
  name: Scalars['String']['input'];
};


export type MutationAddBudgetLineArgs = {
  budgetCategoryId: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  editionId: Scalars['Float']['input'];
  estimatedQuantity?: InputMaybe<Scalars['Int']['input']>;
  estimatedUnitPrice?: InputMaybe<Scalars['Int']['input']>;
  lineType: AddBudgetLineLineTypeInput;
  name: Scalars['String']['input'];
};


export type MutationAddEditionArgs = {
  name: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};


export type MutationDeleteBudgetCategoryArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteBudgetLineArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteEditionArgs = {
  id: Scalars['Float']['input'];
};


export type MutationUpdateBudgetCategoryArgs = {
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateBudgetLineArgs = {
  budgetCategoryId?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  editionId?: InputMaybe<Scalars['Float']['input']>;
  estimatedQuantity?: InputMaybe<Scalars['Int']['input']>;
  estimatedUnitPrice?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Float']['input'];
  lineType?: InputMaybe<UpdateBudgetLineLineTypeInput>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateEditionArgs = {
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  budgetCategories: Array<BudgetCategoriesItem>;
  budgetLines: Array<BudgetLinesItem>;
  editions: Array<EditionsItem>;
  getBudgetStatsByCategoriesForExpense: Array<GetBudgetStatsByCategoriesForIncome>;
  getBudgetStatsByCategoriesForIncome: Array<GetBudgetStatsByCategoriesForIncome>;
};


export type QueryBudgetLinesArgs = {
  budgetLineType?: InputMaybe<BudgetLinesBudgetLineTypeInput>;
  categoryIds?: InputMaybe<Array<Scalars['Float']['input']>>;
  editionId: Scalars['Float']['input'];
  paginatedInput: BudgetLinesPaginatedInputInput;
};


export type QueryGetBudgetStatsByCategoriesForExpenseArgs = {
  editionId: Scalars['Float']['input'];
};


export type QueryGetBudgetStatsByCategoriesForIncomeArgs = {
  editionId: Scalars['Float']['input'];
};

export enum UpdateBudgetLineLineTypeInput {
  Expense = 'expense',
  Income = 'income'
}

export type GetBudgetLinesQueryVariables = Exact<{
  editionId: Scalars['Float']['input'];
  budgetLineType: BudgetLinesBudgetLineTypeInput;
  categoryIds?: InputMaybe<Array<Scalars['Float']['input']> | Scalars['Float']['input']>;
  paginatedInput: BudgetLinesPaginatedInputInput;
}>;


export type GetBudgetLinesQuery = { __typename?: 'Query', budgetLines: Array<{ __typename?: 'BudgetLinesItem', id: number, name: string, estimatedQuantity: number, estimatedUnitPrice: number, category?: { __typename?: 'BudgetCategoriesItem', name: string } | null }> };

export type GetEditionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEditionsQuery = { __typename?: 'Query', editions: Array<{ __typename?: 'EditionsItem', id: number, name: string, startDate: string, totalExpense: number, totalIncome: number, totalPrevisionnalExpense: number, totalPrevisionnalIncome: number }> };


export const GetBudgetLinesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBudgetLines"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"budgetLineType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BudgetLinesBudgetLineTypeInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginatedInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BudgetLinesPaginatedInputInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"budgetLines"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"budgetLineType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"budgetLineType"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginatedInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginatedInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedUnitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetBudgetLinesQuery, GetBudgetLinesQueryVariables>;
export const GetEditionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEditions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"totalExpense"}},{"kind":"Field","name":{"kind":"Name","value":"totalIncome"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrevisionnalExpense"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrevisionnalIncome"}}]}}]}}]} as unknown as DocumentNode<GetEditionsQuery, GetEditionsQueryVariables>;