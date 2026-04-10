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

export type AddInvoicePaymentsInput = {
  budgetLineId: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type BudgetCategoriesItem = {
  __typename?: 'BudgetCategoriesItem';
  color: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type BudgetLinesItem = {
  __typename?: 'BudgetLinesItem';
  budgetCategoryId: Scalars['Int']['output'];
  category?: Maybe<BudgetCategoriesItem>;
  description?: Maybe<Scalars['String']['output']>;
  editionId: Scalars['Int']['output'];
  estimatedQuantity: Scalars['Float']['output'];
  estimatedUnitPrice: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lineType: LineType;
  name: Scalars['String']['output'];
  realCost?: Maybe<Scalars['Int']['output']>;
};

export type EditionsItem = {
  __typename?: 'EditionsItem';
  active: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['String']['output'];
  totalExpense: Scalars['Float']['output'];
  totalIncome: Scalars['Float']['output'];
  totalPrevisionnalExpense: Scalars['Float']['output'];
  totalPrevisionnalIncome: Scalars['Float']['output'];
};

export type GetBudgetStatsByCategories = {
  __typename?: 'GetBudgetStatsByCategories';
  categoryName: Scalars['String']['output'];
  total: Scalars['Float']['output'];
  totalEstimated: Scalars['Float']['output'];
};

export type HelloAssoConfigItem = {
  __typename?: 'HelloAssoConfigItem';
  editionId: Scalars['Int']['output'];
  formSlug: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  mappings: Array<HelloAssoMappingItem>;
};

export type HelloAssoMappingItem = {
  __typename?: 'HelloAssoMappingItem';
  configId: Scalars['Int']['output'];
  helloAssoProductId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  productId: Scalars['Int']['output'];
};

export enum InvoiceStatus {
  Cancelled = 'CANCELLED',
  Paid = 'PAID',
  Pending = 'PENDING'
}

export type InvoicesItem = {
  __typename?: 'InvoicesItem';
  author?: Maybe<UserItem>;
  authorId: Scalars['String']['output'];
  editionId: Scalars['Int']['output'];
  executedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  payments: Array<PaymentsItem>;
  status: InvoicesStatusEnum;
  totalAmount: Scalars['String']['output'];
  vendor?: Maybe<VendorsItem>;
  vendorId: Scalars['Int']['output'];
};

export enum InvoicesStatusEnum {
  Cancelled = 'CANCELLED',
  Paid = 'PAID',
  Pending = 'PENDING'
}

export enum LineType {
  Expense = 'EXPENSE',
  Income = 'INCOME'
}

export enum LineTypeEnum {
  Expense = 'expense',
  Income = 'income'
}

export type Mutation = {
  __typename?: 'Mutation';
  addBudgetCategory?: Maybe<BudgetCategoriesItem>;
  addBudgetLine?: Maybe<BudgetLinesItem>;
  addEdition?: Maybe<EditionsItem>;
  addHelloAssoConfig?: Maybe<HelloAssoConfigItem>;
  addInvoice?: Maybe<InvoicesItem>;
  addOrUpdateMapping?: Maybe<HelloAssoMappingItem>;
  addOrUpdateVendor?: Maybe<VendorsItem>;
  deleteBudgetCategory?: Maybe<BudgetCategoriesItem>;
  deleteBudgetLine?: Maybe<BudgetLinesItem>;
  deleteEdition?: Maybe<EditionsItem>;
  deleteInvoice?: Maybe<InvoicesItem>;
  deleteVendor?: Maybe<VendorsItem>;
  updateBudgetCategory?: Maybe<BudgetCategoriesItem>;
  updateBudgetLine?: Maybe<BudgetLinesItem>;
  updateEdition?: Maybe<EditionsItem>;
  updateHelloAssoConfig?: Maybe<HelloAssoConfigItem>;
  updateInvoice?: Maybe<InvoicesItem>;
};


export type MutationAddBudgetCategoryArgs = {
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationAddBudgetLineArgs = {
  budgetCategoryId: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  editionId: Scalars['Float']['input'];
  estimatedQuantity: Scalars['Int']['input'];
  estimatedUnitPrice: Scalars['Float']['input'];
  lineType: LineTypeEnum;
  name: Scalars['String']['input'];
};


export type MutationAddEditionArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};


export type MutationAddHelloAssoConfigArgs = {
  editionId: Scalars['Float']['input'];
  formSlug: Scalars['String']['input'];
};


export type MutationAddInvoiceArgs = {
  authorId: Scalars['ID']['input'];
  editionId: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  payments: Array<AddInvoicePaymentsInput>;
  status: InvoiceStatus;
  totalAmount: Scalars['Float']['input'];
  vendorId: Scalars['Float']['input'];
};


export type MutationAddOrUpdateMappingArgs = {
  configId: Scalars['Float']['input'];
  helloAssoProductId: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['Float']['input']>;
  productId: Scalars['Float']['input'];
};


export type MutationAddOrUpdateVendorArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
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


export type MutationDeleteInvoiceArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteVendorArgs = {
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
  estimatedUnitPrice?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Float']['input'];
  lineType?: InputMaybe<LineTypeEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateEditionArgs = {
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateHelloAssoConfigArgs = {
  formSlug: Scalars['String']['input'];
  id: Scalars['Float']['input'];
};


export type MutationUpdateInvoiceArgs = {
  authorId?: InputMaybe<Scalars['ID']['input']>;
  editionId: Scalars['Float']['input'];
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  payments?: InputMaybe<Array<UpdateInvoicePaymentsInput>>;
  status?: InputMaybe<InvoiceStatus>;
  totalAmount?: InputMaybe<Scalars['Float']['input']>;
  vendorId?: InputMaybe<Scalars['Float']['input']>;
};

export type PaymentsItem = {
  __typename?: 'PaymentsItem';
  budgetLineId: Scalars['Int']['output'];
  editionId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  invoiceId: Scalars['Int']['output'];
  quantity: Scalars['Float']['output'];
  unitPrice: Scalars['String']['output'];
};

export type ProductsItem = {
  __typename?: 'ProductsItem';
  budgetLineId: Scalars['Int']['output'];
  editionId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  salesCount: Scalars['Float']['output'];
  unitPrice: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  budgetCategories: Array<BudgetCategoriesItem>;
  budgetLines: Array<BudgetLinesItem>;
  edition?: Maybe<EditionsItem>;
  editions: Array<EditionsItem>;
  getBudgetStatsByCategories: Array<GetBudgetStatsByCategories>;
  helloAssoConfig?: Maybe<HelloAssoConfigItem>;
  invoices: Array<InvoicesItem>;
  products: Array<ProductsItem>;
  vendors: Array<VendorsItem>;
};


export type QueryBudgetLinesArgs = {
  budgetLineType?: InputMaybe<LineTypeEnum>;
  editionId: Scalars['Float']['input'];
};


export type QueryEditionArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetBudgetStatsByCategoriesArgs = {
  editionId: Scalars['Float']['input'];
  lineType: LineTypeEnum;
};


export type QueryHelloAssoConfigArgs = {
  editionId: Scalars['Float']['input'];
};


export type QueryInvoicesArgs = {
  editionId: Scalars['Float']['input'];
  status?: InputMaybe<InvoiceStatus>;
};


export type QueryProductsArgs = {
  editionId: Scalars['Float']['input'];
};

export type UpdateInvoicePaymentsInput = {
  budgetLineId: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['Float']['input']>;
  quantity: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type UserItem = {
  __typename?: 'UserItem';
  banExpires?: Maybe<Scalars['String']['output']>;
  banReason?: Maybe<Scalars['String']['output']>;
  banned?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['String']['output'];
  displayUsername?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  role?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type VendorsItem = {
  __typename?: 'VendorsItem';
  address?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

export type AddBudgetCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  color: Scalars['String']['input'];
}>;


export type AddBudgetCategoryMutation = { __typename?: 'Mutation', addBudgetCategory?: { __typename?: 'BudgetCategoriesItem', id: number, name: string, color: string } | null };

export type AddBudgetLineMutationVariables = Exact<{
  name: Scalars['String']['input'];
  budgetCategoryId: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  editionId: Scalars['Float']['input'];
  estimatedQuantity: Scalars['Int']['input'];
  estimatedUnitPrice: Scalars['Float']['input'];
  lineType: LineTypeEnum;
}>;


export type AddBudgetLineMutation = { __typename?: 'Mutation', addBudgetLine?: { __typename?: 'BudgetLinesItem', id: number, name: string } | null };

export type DeleteBudgetLineMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteBudgetLineMutation = { __typename?: 'Mutation', deleteBudgetLine?: { __typename?: 'BudgetLinesItem', id: number, name: string } | null };

export type GetBudgetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBudgetCategoriesQuery = { __typename?: 'Query', budgetCategories: Array<{ __typename?: 'BudgetCategoriesItem', id: number, name: string, color: string }> };

export type GetBudgetLinesQueryVariables = Exact<{
  editionId: Scalars['Float']['input'];
  budgetLineType: LineTypeEnum;
}>;


export type GetBudgetLinesQuery = { __typename?: 'Query', budgetLines: Array<{ __typename?: 'BudgetLinesItem', id: number, name: string, description?: string | null, estimatedQuantity: number, estimatedUnitPrice: string, realCost?: number | null, category?: { __typename?: 'BudgetCategoriesItem', id: number, name: string, color: string } | null }> };

export type UpdateBudgetLineMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  budgetCategoryId?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  editionId?: InputMaybe<Scalars['Float']['input']>;
  estimatedQuantity?: InputMaybe<Scalars['Int']['input']>;
  estimatedUnitPrice?: InputMaybe<Scalars['Float']['input']>;
  lineType?: InputMaybe<LineTypeEnum>;
}>;


export type UpdateBudgetLineMutation = { __typename?: 'Mutation', updateBudgetLine?: { __typename?: 'BudgetLinesItem', id: number, name: string } | null };

export type GetBudgetStatsByCategoriesQueryVariables = Exact<{
  editionId: Scalars['Float']['input'];
  lineType: LineTypeEnum;
}>;


export type GetBudgetStatsByCategoriesQuery = { __typename?: 'Query', getBudgetStatsByCategories: Array<{ __typename?: 'GetBudgetStatsByCategories', categoryName: string, totalEstimated: number, total: number }> };

export type GetEditionStatsQueryVariables = Exact<{
  editionId: Scalars['Float']['input'];
}>;


export type GetEditionStatsQuery = { __typename?: 'Query', edition?: { __typename?: 'EditionsItem', id: number, totalExpense: number, totalIncome: number, totalPrevisionnalExpense: number, totalPrevisionnalIncome: number } | null };

export type GetEditionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEditionsQuery = { __typename?: 'Query', editions: Array<{ __typename?: 'EditionsItem', id: number, name: string, active: boolean, startDate: string }> };

export type AddInvoiceMutationVariables = Exact<{
  name: Scalars['String']['input'];
  authorId: Scalars['ID']['input'];
  editionId: Scalars['Float']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  payments: Array<AddInvoicePaymentsInput> | AddInvoicePaymentsInput;
  status: InvoiceStatus;
  totalAmount: Scalars['Float']['input'];
  vendorId: Scalars['Float']['input'];
}>;


export type AddInvoiceMutation = { __typename?: 'Mutation', addInvoice?: { __typename?: 'InvoicesItem', id: number } | null };

export type AddOrUpdateVendorMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddOrUpdateVendorMutation = { __typename?: 'Mutation', addOrUpdateVendor?: { __typename?: 'VendorsItem', id: number, name: string, address?: string | null, email?: string | null, phoneNumber?: string | null, description?: string | null } | null };

export type DeleteInvoiceMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteInvoiceMutation = { __typename?: 'Mutation', deleteInvoice?: { __typename?: 'InvoicesItem', id: number } | null };

export type GetInvoicesQueryVariables = Exact<{
  editionId: Scalars['Float']['input'];
  status?: InputMaybe<InvoiceStatus>;
}>;


export type GetInvoicesQuery = { __typename?: 'Query', invoices: Array<{ __typename?: 'InvoicesItem', id: number, name: string, vendorId: number, totalAmount: string, note?: string | null, executedAt?: string | null, status: InvoicesStatusEnum, vendor?: { __typename?: 'VendorsItem', id: number, name: string } | null, author?: { __typename?: 'UserItem', id: string } | null, payments: Array<{ __typename?: 'PaymentsItem', id: number, budgetLineId: number, quantity: number, unitPrice: string }> }> };

export type GetVendorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVendorsQuery = { __typename?: 'Query', vendors: Array<{ __typename?: 'VendorsItem', id: number, name: string }> };

export type UpdateInvoiceMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
  editionId: Scalars['Float']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  payments?: InputMaybe<Array<UpdateInvoicePaymentsInput> | UpdateInvoicePaymentsInput>;
  status?: InputMaybe<InvoiceStatus>;
  totalAmount?: InputMaybe<Scalars['Float']['input']>;
  vendorId?: InputMaybe<Scalars['Float']['input']>;
}>;


export type UpdateInvoiceMutation = { __typename?: 'Mutation', updateInvoice?: { __typename?: 'InvoicesItem', id: number } | null };

export type GetProductsQueryVariables = Exact<{
  editionId: Scalars['Float']['input'];
}>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'ProductsItem', id: number, name: string, unitPrice: string, salesCount: number }> };


export const AddBudgetCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBudgetCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"color"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBudgetCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"color"},"value":{"kind":"Variable","name":{"kind":"Name","value":"color"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<AddBudgetCategoryMutation, AddBudgetCategoryMutationVariables>;
export const AddBudgetLineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addBudgetLine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"budgetCategoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"estimatedQuantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"estimatedUnitPrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lineType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LineTypeEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBudgetLine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"budgetCategoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"budgetCategoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"estimatedQuantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"estimatedQuantity"}}},{"kind":"Argument","name":{"kind":"Name","value":"estimatedUnitPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"estimatedUnitPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"lineType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lineType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddBudgetLineMutation, AddBudgetLineMutationVariables>;
export const DeleteBudgetLineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBudgetLine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBudgetLine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeleteBudgetLineMutation, DeleteBudgetLineMutationVariables>;
export const GetBudgetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBudgetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"budgetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<GetBudgetCategoriesQuery, GetBudgetCategoriesQueryVariables>;
export const GetBudgetLinesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBudgetLines"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"budgetLineType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LineTypeEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"budgetLines"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"budgetLineType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"budgetLineType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedUnitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"realCost"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]} as unknown as DocumentNode<GetBudgetLinesQuery, GetBudgetLinesQueryVariables>;
export const UpdateBudgetLineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBudgetLine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"budgetCategoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"estimatedQuantity"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"estimatedUnitPrice"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lineType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LineTypeEnum"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBudgetLine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"budgetCategoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"budgetCategoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"estimatedQuantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"estimatedQuantity"}}},{"kind":"Argument","name":{"kind":"Name","value":"estimatedUnitPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"estimatedUnitPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"lineType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lineType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateBudgetLineMutation, UpdateBudgetLineMutationVariables>;
export const GetBudgetStatsByCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBudgetStatsByCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lineType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LineTypeEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBudgetStatsByCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"lineType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lineType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"totalEstimated"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GetBudgetStatsByCategoriesQuery, GetBudgetStatsByCategoriesQueryVariables>;
export const GetEditionStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEditionStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalExpense"}},{"kind":"Field","name":{"kind":"Name","value":"totalIncome"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrevisionnalExpense"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrevisionnalIncome"}}]}}]}}]} as unknown as DocumentNode<GetEditionStatsQuery, GetEditionStatsQueryVariables>;
export const GetEditionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEditions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}}]}}]}}]} as unknown as DocumentNode<GetEditionsQuery, GetEditionsQueryVariables>;
export const AddInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"note"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payments"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddInvoicePaymentsInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InvoiceStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"totalAmount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"note"},"value":{"kind":"Variable","name":{"kind":"Name","value":"note"}}},{"kind":"Argument","name":{"kind":"Name","value":"payments"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payments"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"totalAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"totalAmount"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"authorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddInvoiceMutation, AddInvoiceMutationVariables>;
export const AddOrUpdateVendorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addOrUpdateVendor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addOrUpdateVendor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<AddOrUpdateVendorMutation, AddOrUpdateVendorMutationVariables>;
export const DeleteInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>;
export const GetInvoicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInvoices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"InvoiceStatus"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"executedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"payments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"budgetLineId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}}]}}]}}]}}]} as unknown as DocumentNode<GetInvoicesQuery, GetInvoicesQueryVariables>;
export const GetVendorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getVendors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetVendorsQuery, GetVendorsQueryVariables>;
export const UpdateInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"note"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payments"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateInvoicePaymentsInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"InvoiceStatus"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"totalAmount"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"note"},"value":{"kind":"Variable","name":{"kind":"Name","value":"note"}}},{"kind":"Argument","name":{"kind":"Name","value":"payments"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payments"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"totalAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"totalAmount"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"authorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"salesCount"}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;