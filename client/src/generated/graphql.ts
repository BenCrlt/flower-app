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
  helloAssoProductId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  isFreePrice: Scalars['Boolean']['output'];
  lineType: LineType;
  name: Scalars['String']['output'];
  realCost?: Maybe<Scalars['Float']['output']>;
  salesCount?: Maybe<Scalars['Int']['output']>;
};

export type EditionsItem = {
  __typename?: 'EditionsItem';
  active: Scalars['Boolean']['output'];
  endDate: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  openingBalance: Scalars['Int']['output'];
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

export type GoogleDriveConfig = {
  __typename?: 'GoogleDriveConfig';
  connectedAt?: Maybe<Scalars['String']['output']>;
  editionId: Scalars['Float']['output'];
  googleAccountEmail?: Maybe<Scalars['String']['output']>;
  invoiceFolderId?: Maybe<Scalars['String']['output']>;
  isConnected: Scalars['Boolean']['output'];
};

export type HelloAssoConfigItem = {
  __typename?: 'HelloAssoConfigItem';
  editionId: Scalars['Int']['output'];
  formSlug: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type InvoiceFilesItem = {
  __typename?: 'InvoiceFilesItem';
  createdAt: Scalars['String']['output'];
  driveFileId: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  invoiceId: Scalars['Int']['output'];
  mimeType: Scalars['String']['output'];
  sizeBytes: Scalars['Int']['output'];
  uploadedById: Scalars['String']['output'];
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
  invoiceFiles: Array<InvoiceFilesItem>;
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
  addOrUpdateOrderOrigin?: Maybe<OrderOriginsItem>;
  addOrUpdateVendor?: Maybe<VendorsItem>;
  deleteBudgetCategory?: Maybe<BudgetCategoriesItem>;
  deleteBudgetLine?: Maybe<BudgetLinesItem>;
  deleteEdition?: Maybe<EditionsItem>;
  deleteInvoice?: Maybe<InvoicesItem>;
  deleteInvoiceFile: Scalars['Boolean']['output'];
  deleteOrderOrigin?: Maybe<OrderOriginsItem>;
  deleteVendor?: Maybe<VendorsItem>;
  disconnectGoogleDrive: GoogleDriveConfig;
  synchroSales: Array<SalesItem>;
  updateBudgetCategory?: Maybe<BudgetCategoriesItem>;
  updateBudgetLine?: Maybe<BudgetLinesItem>;
  updateEdition?: Maybe<EditionsItem>;
  updateGoogleDriveConfig: GoogleDriveConfig;
  updateHelloAssoConfig?: Maybe<HelloAssoConfigItem>;
  updateInvoice?: Maybe<InvoicesItem>;
  validateOrder?: Maybe<OrdersItem>;
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
  isFreePrice?: InputMaybe<Scalars['Boolean']['input']>;
  lineType: LineTypeEnum;
  name: Scalars['String']['input'];
};


export type MutationAddEditionArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  endDate: Scalars['String']['input'];
  name: Scalars['String']['input'];
  openingBalance?: InputMaybe<Scalars['Float']['input']>;
  startDate: Scalars['String']['input'];
};


export type MutationAddHelloAssoConfigArgs = {
  budgetCategoryId?: InputMaybe<Scalars['Float']['input']>;
  editionId: Scalars['Float']['input'];
  enableSynchro?: InputMaybe<Scalars['Boolean']['input']>;
  formSlug: Scalars['String']['input'];
};


export type MutationAddInvoiceArgs = {
  authorId: Scalars['String']['input'];
  editionId: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  payments: Array<AddInvoicePaymentsInput>;
  status: InvoiceStatus;
  totalAmount: Scalars['Float']['input'];
  vendorId: Scalars['Float']['input'];
  withoutTVA?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationAddOrUpdateOrderOriginArgs = {
  budgetLineIds?: InputMaybe<Array<Scalars['Float']['input']>>;
  id?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
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


export type MutationDeleteInvoiceFileArgs = {
  deleteFromDrive: Scalars['Boolean']['input'];
  id: Scalars['Float']['input'];
};


export type MutationDeleteOrderOriginArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteVendorArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDisconnectGoogleDriveArgs = {
  editionId: Scalars['Float']['input'];
};


export type MutationSynchroSalesArgs = {
  from: Scalars['String']['input'];
  helloAssoConfigId: Scalars['Float']['input'];
  to: Scalars['String']['input'];
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
  helloAssoProductId?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Float']['input'];
  isFreePrice?: InputMaybe<Scalars['Boolean']['input']>;
  lineType?: InputMaybe<LineTypeEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateEditionArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  openingBalance?: InputMaybe<Scalars['Float']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateGoogleDriveConfigArgs = {
  editionId: Scalars['Float']['input'];
  invoiceFolderId: Scalars['String']['input'];
};


export type MutationUpdateHelloAssoConfigArgs = {
  formSlug: Scalars['String']['input'];
  id: Scalars['Float']['input'];
};


export type MutationUpdateInvoiceArgs = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  editionId: Scalars['Float']['input'];
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  payments?: InputMaybe<Array<UpdateInvoicePaymentsInput>>;
  status?: InputMaybe<InvoiceStatus>;
  totalAmount?: InputMaybe<Scalars['Float']['input']>;
  vendorId?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationValidateOrderArgs = {
  editionId: Scalars['Float']['input'];
  originId: Scalars['Float']['input'];
  paymentMethod: ValidateOrderPaymentMethodInput;
  sales: Array<ValidateOrderSalesInput>;
};

export type OrderOriginsItem = {
  __typename?: 'OrderOriginsItem';
  budgetLines: Array<BudgetLinesItem>;
  id: Scalars['Int']['output'];
  isPhysical: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type OrdersItem = {
  __typename?: 'OrdersItem';
  author?: Maybe<UserItem>;
  authorId?: Maybe<Scalars['String']['output']>;
  editionId: Scalars['Int']['output'];
  executedAt: Scalars['String']['output'];
  helloAssoOrderId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  origin?: Maybe<OrderOriginsItem>;
  originId: Scalars['Int']['output'];
  payerEmail?: Maybe<Scalars['String']['output']>;
  payerFirstName?: Maybe<Scalars['String']['output']>;
  payerLastName?: Maybe<Scalars['String']['output']>;
  paymentMethod: Scalars['String']['output'];
  sales: Array<SalesItem>;
  totalAmount: Scalars['Float']['output'];
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

export type Query = {
  __typename?: 'Query';
  budgetCategories: Array<BudgetCategoriesItem>;
  budgetLines: Array<BudgetLinesItem>;
  edition?: Maybe<EditionsItem>;
  editions: Array<EditionsItem>;
  getBudgetStatsByCategories: Array<GetBudgetStatsByCategories>;
  googleDriveConfig: GoogleDriveConfig;
  helloAssoConfig?: Maybe<HelloAssoConfigItem>;
  invoices: Array<InvoicesItem>;
  orderOrigin?: Maybe<OrderOriginsItem>;
  orderOrigins: Array<OrderOriginsItem>;
  orders: Array<OrdersItem>;
  sumUpConfig: SumUpConfig;
  vendors: Array<VendorsItem>;
};


export type QueryBudgetLinesArgs = {
  budgetLineType?: InputMaybe<LineTypeEnum>;
  editionId: Scalars['Float']['input'];
  excludeHelloAsso?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEditionArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetBudgetStatsByCategoriesArgs = {
  editionId: Scalars['Float']['input'];
  lineType: LineTypeEnum;
};


export type QueryGoogleDriveConfigArgs = {
  editionId: Scalars['Float']['input'];
};


export type QueryHelloAssoConfigArgs = {
  editionId: Scalars['Float']['input'];
};


export type QueryInvoicesArgs = {
  editionId: Scalars['Float']['input'];
  status?: InputMaybe<InvoiceStatus>;
};


export type QueryOrderOriginArgs = {
  id: Scalars['Float']['input'];
};


export type QueryOrderOriginsArgs = {
  onlyPhysical?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryOrdersArgs = {
  editionId: Scalars['Float']['input'];
  from?: InputMaybe<Scalars['String']['input']>;
  originIds?: InputMaybe<Array<Scalars['Float']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export type SalesItem = {
  __typename?: 'SalesItem';
  budgetLine?: Maybe<BudgetLinesItem>;
  budgetLineId: Scalars['Int']['output'];
  executedAt: Scalars['String']['output'];
  helloAssoSaleItemId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  orderId: Scalars['Int']['output'];
  quantity: Scalars['Float']['output'];
  unitPrice?: Maybe<Scalars['String']['output']>;
};

export type SumUpConfig = {
  __typename?: 'SumUpConfig';
  affiliateKey: Scalars['String']['output'];
  appId: Scalars['String']['output'];
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

export enum ValidateOrderPaymentMethodInput {
  Card = 'card',
  Cash = 'cash'
}

export type ValidateOrderSalesInput = {
  budgetLineId: Scalars['Float']['input'];
  quantity: Scalars['Int']['input'];
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
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
  isFreePrice?: InputMaybe<Scalars['Boolean']['input']>;
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
  excludeHelloAsso?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetBudgetLinesQuery = { __typename?: 'Query', budgetLines: Array<{ __typename?: 'BudgetLinesItem', id: number, name: string, description?: string | null, estimatedQuantity: number, estimatedUnitPrice: string, isFreePrice: boolean, realCost?: number | null, salesCount?: number | null, lineType: LineType, helloAssoProductId?: number | null, category?: { __typename?: 'BudgetCategoriesItem', id: number, name: string, color: string } | null }> };

export type UpdateBudgetLineMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  budgetCategoryId?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  editionId?: InputMaybe<Scalars['Float']['input']>;
  estimatedQuantity?: InputMaybe<Scalars['Int']['input']>;
  estimatedUnitPrice?: InputMaybe<Scalars['Float']['input']>;
  isFreePrice?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateBudgetLineMutation = { __typename?: 'Mutation', updateBudgetLine?: { __typename?: 'BudgetLinesItem', id: number, name: string } | null };

export type GetOrderOriginQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type GetOrderOriginQuery = { __typename?: 'Query', orderOrigin?: { __typename?: 'OrderOriginsItem', id: number, name: string, isPhysical: boolean, budgetLines: Array<{ __typename?: 'BudgetLinesItem', id: number, name: string, estimatedUnitPrice: string, isFreePrice: boolean, category?: { __typename?: 'BudgetCategoriesItem', id: number, name: string, color: string } | null }> } | null };

export type GetSumUpConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSumUpConfigQuery = { __typename?: 'Query', sumUpConfig: { __typename?: 'SumUpConfig', affiliateKey: string, appId: string } };

export type ValidateOrderMutationVariables = Exact<{
  editionId: Scalars['Float']['input'];
  originId: Scalars['Float']['input'];
  paymentMethod: ValidateOrderPaymentMethodInput;
  sales: Array<ValidateOrderSalesInput> | ValidateOrderSalesInput;
}>;


export type ValidateOrderMutation = { __typename?: 'Mutation', validateOrder?: { __typename?: 'OrdersItem', id: number } | null };

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


export type GetEditionsQuery = { __typename?: 'Query', editions: Array<{ __typename?: 'EditionsItem', id: number, name: string, active: boolean, startDate: string, endDate: string, openingBalance: number }> };

export type AddInvoiceMutationVariables = Exact<{
  name: Scalars['String']['input'];
  authorId: Scalars['String']['input'];
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

export type DeleteInvoiceFileMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  deleteFromDrive: Scalars['Boolean']['input'];
}>;


export type DeleteInvoiceFileMutation = { __typename?: 'Mutation', deleteInvoiceFile: boolean };

export type GetInvoicesQueryVariables = Exact<{
  editionId: Scalars['Float']['input'];
  status?: InputMaybe<InvoiceStatus>;
}>;


export type GetInvoicesQuery = { __typename?: 'Query', invoices: Array<{ __typename?: 'InvoicesItem', id: number, name: string, vendorId: number, totalAmount: string, note?: string | null, executedAt?: string | null, status: InvoicesStatusEnum, vendor?: { __typename?: 'VendorsItem', id: number, name: string } | null, author?: { __typename?: 'UserItem', id: string } | null, payments: Array<{ __typename?: 'PaymentsItem', id: number, budgetLineId: number, quantity: number, unitPrice: string }>, invoiceFiles: Array<{ __typename?: 'InvoiceFilesItem', id: number, fileName: string, mimeType: string, sizeBytes: number, createdAt: string }> }> };

export type GetVendorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVendorsQuery = { __typename?: 'Query', vendors: Array<{ __typename?: 'VendorsItem', id: number, name: string }> };

export type UpdateInvoiceMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  authorId?: InputMaybe<Scalars['String']['input']>;
  editionId: Scalars['Float']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  payments?: InputMaybe<Array<UpdateInvoicePaymentsInput> | UpdateInvoicePaymentsInput>;
  status?: InputMaybe<InvoiceStatus>;
  totalAmount?: InputMaybe<Scalars['Float']['input']>;
  vendorId?: InputMaybe<Scalars['Float']['input']>;
}>;


export type UpdateInvoiceMutation = { __typename?: 'Mutation', updateInvoice?: { __typename?: 'InvoicesItem', id: number } | null };

export type GetOrderOriginsQueryVariables = Exact<{
  onlyPhysical?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetOrderOriginsQuery = { __typename?: 'Query', orderOrigins: Array<{ __typename?: 'OrderOriginsItem', id: number, name: string, isPhysical: boolean }> };

export type GetOrdersQueryVariables = Exact<{
  editionId: Scalars['Float']['input'];
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  originIds?: InputMaybe<Array<Scalars['Float']['input']> | Scalars['Float']['input']>;
}>;


export type GetOrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'OrdersItem', id: number, totalAmount: number, executedAt: string, payerFirstName?: string | null, payerLastName?: string | null, payerEmail?: string | null, helloAssoOrderId?: number | null, authorId?: string | null, originId: number, origin?: { __typename?: 'OrderOriginsItem', id: number, name: string } | null, author?: { __typename?: 'UserItem', id: string, username?: string | null } | null, sales: Array<{ __typename?: 'SalesItem', id: number, budgetLineId: number, quantity: number, unitPrice?: string | null, executedAt: string, budgetLine?: { __typename?: 'BudgetLinesItem', id: number, name: string, estimatedUnitPrice: string, category?: { __typename?: 'BudgetCategoriesItem', id: number, name: string, color: string } | null } | null }> }> };

export type AddHelloAssoConfigMutationVariables = Exact<{
  formSlug: Scalars['String']['input'];
  editionId: Scalars['Float']['input'];
  enableSynchro: Scalars['Boolean']['input'];
  budgetCategoryId?: InputMaybe<Scalars['Float']['input']>;
}>;


export type AddHelloAssoConfigMutation = { __typename?: 'Mutation', addHelloAssoConfig?: { __typename?: 'HelloAssoConfigItem', id: number, formSlug: string } | null };

export type AddOrUpdateOrderOriginMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  budgetLineIds?: InputMaybe<Array<Scalars['Float']['input']> | Scalars['Float']['input']>;
}>;


export type AddOrUpdateOrderOriginMutation = { __typename?: 'Mutation', addOrUpdateOrderOrigin?: { __typename?: 'OrderOriginsItem', id: number, name: string } | null };

export type DeleteOrderOriginMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteOrderOriginMutation = { __typename?: 'Mutation', deleteOrderOrigin?: { __typename?: 'OrderOriginsItem', id: number, name: string } | null };

export type DisconnectGoogleDriveMutationVariables = Exact<{
  editionId: Scalars['Float']['input'];
}>;


export type DisconnectGoogleDriveMutation = { __typename?: 'Mutation', disconnectGoogleDrive: { __typename?: 'GoogleDriveConfig', editionId: number, isConnected: boolean, invoiceFolderId?: string | null, googleAccountEmail?: string | null, connectedAt?: string | null } };

export type GetGoogleDriveConfigQueryVariables = Exact<{
  editionId: Scalars['Float']['input'];
}>;


export type GetGoogleDriveConfigQuery = { __typename?: 'Query', googleDriveConfig: { __typename?: 'GoogleDriveConfig', editionId: number, isConnected: boolean, invoiceFolderId?: string | null, googleAccountEmail?: string | null, connectedAt?: string | null } };

export type GetHelloAssoConfigQueryVariables = Exact<{
  editionId: Scalars['Float']['input'];
}>;


export type GetHelloAssoConfigQuery = { __typename?: 'Query', helloAssoConfig?: { __typename?: 'HelloAssoConfigItem', id: number, formSlug: string } | null };

export type SynchroSalesMutationVariables = Exact<{
  helloAssoConfigId: Scalars['Float']['input'];
  from: Scalars['String']['input'];
  to: Scalars['String']['input'];
}>;


export type SynchroSalesMutation = { __typename?: 'Mutation', synchroSales: Array<{ __typename?: 'SalesItem', id: number }> };

export type UpdateEditionMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  openingBalance?: InputMaybe<Scalars['Float']['input']>;
}>;


export type UpdateEditionMutation = { __typename?: 'Mutation', updateEdition?: { __typename?: 'EditionsItem', id: number, name: string, startDate: string, endDate: string, openingBalance: number } | null };

export type UpdateGoogleDriveConfigMutationVariables = Exact<{
  editionId: Scalars['Float']['input'];
  invoiceFolderId: Scalars['String']['input'];
}>;


export type UpdateGoogleDriveConfigMutation = { __typename?: 'Mutation', updateGoogleDriveConfig: { __typename?: 'GoogleDriveConfig', editionId: number, isConnected: boolean, invoiceFolderId?: string | null, googleAccountEmail?: string | null, connectedAt?: string | null } };


export const AddBudgetCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBudgetCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"color"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBudgetCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"color"},"value":{"kind":"Variable","name":{"kind":"Name","value":"color"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<AddBudgetCategoryMutation, AddBudgetCategoryMutationVariables>;
export const AddBudgetLineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addBudgetLine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"budgetCategoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"estimatedQuantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"estimatedUnitPrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isFreePrice"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lineType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LineTypeEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBudgetLine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"budgetCategoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"budgetCategoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"estimatedQuantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"estimatedQuantity"}}},{"kind":"Argument","name":{"kind":"Name","value":"estimatedUnitPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"estimatedUnitPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"isFreePrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isFreePrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"lineType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lineType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddBudgetLineMutation, AddBudgetLineMutationVariables>;
export const DeleteBudgetLineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBudgetLine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBudgetLine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeleteBudgetLineMutation, DeleteBudgetLineMutationVariables>;
export const GetBudgetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBudgetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"budgetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<GetBudgetCategoriesQuery, GetBudgetCategoriesQueryVariables>;
export const GetBudgetLinesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBudgetLines"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"budgetLineType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LineTypeEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"excludeHelloAsso"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"budgetLines"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"budgetLineType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"budgetLineType"}}},{"kind":"Argument","name":{"kind":"Name","value":"excludeHelloAsso"},"value":{"kind":"Variable","name":{"kind":"Name","value":"excludeHelloAsso"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedUnitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"isFreePrice"}},{"kind":"Field","name":{"kind":"Name","value":"realCost"}},{"kind":"Field","name":{"kind":"Name","value":"salesCount"}},{"kind":"Field","name":{"kind":"Name","value":"lineType"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"helloAssoProductId"}}]}}]}}]} as unknown as DocumentNode<GetBudgetLinesQuery, GetBudgetLinesQueryVariables>;
export const UpdateBudgetLineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBudgetLine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"budgetCategoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"estimatedQuantity"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"estimatedUnitPrice"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isFreePrice"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBudgetLine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"budgetCategoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"budgetCategoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"estimatedQuantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"estimatedQuantity"}}},{"kind":"Argument","name":{"kind":"Name","value":"estimatedUnitPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"estimatedUnitPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"isFreePrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isFreePrice"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateBudgetLineMutation, UpdateBudgetLineMutationVariables>;
export const GetOrderOriginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getOrderOrigin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderOrigin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPhysical"}},{"kind":"Field","name":{"kind":"Name","value":"budgetLines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedUnitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"isFreePrice"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOrderOriginQuery, GetOrderOriginQueryVariables>;
export const GetSumUpConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSumUpConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sumUpConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affiliateKey"}},{"kind":"Field","name":{"kind":"Name","value":"appId"}}]}}]}}]} as unknown as DocumentNode<GetSumUpConfigQuery, GetSumUpConfigQueryVariables>;
export const ValidateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"validateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paymentMethod"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ValidateOrderPaymentMethodInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sales"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ValidateOrderSalesInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"originId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originId"}}},{"kind":"Argument","name":{"kind":"Name","value":"paymentMethod"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paymentMethod"}}},{"kind":"Argument","name":{"kind":"Name","value":"sales"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sales"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ValidateOrderMutation, ValidateOrderMutationVariables>;
export const GetBudgetStatsByCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBudgetStatsByCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lineType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LineTypeEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBudgetStatsByCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"lineType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lineType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"totalEstimated"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GetBudgetStatsByCategoriesQuery, GetBudgetStatsByCategoriesQueryVariables>;
export const GetEditionStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEditionStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalExpense"}},{"kind":"Field","name":{"kind":"Name","value":"totalIncome"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrevisionnalExpense"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrevisionnalIncome"}}]}}]}}]} as unknown as DocumentNode<GetEditionStatsQuery, GetEditionStatsQueryVariables>;
export const GetEditionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEditions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"openingBalance"}}]}}]}}]} as unknown as DocumentNode<GetEditionsQuery, GetEditionsQueryVariables>;
export const AddInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"note"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payments"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddInvoicePaymentsInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InvoiceStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"totalAmount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"note"},"value":{"kind":"Variable","name":{"kind":"Name","value":"note"}}},{"kind":"Argument","name":{"kind":"Name","value":"payments"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payments"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"totalAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"totalAmount"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"authorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddInvoiceMutation, AddInvoiceMutationVariables>;
export const AddOrUpdateVendorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addOrUpdateVendor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addOrUpdateVendor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<AddOrUpdateVendorMutation, AddOrUpdateVendorMutationVariables>;
export const DeleteInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>;
export const DeleteInvoiceFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteInvoiceFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteFromDrive"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteInvoiceFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"deleteFromDrive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteFromDrive"}}}]}]}}]} as unknown as DocumentNode<DeleteInvoiceFileMutation, DeleteInvoiceFileMutationVariables>;
export const GetInvoicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInvoices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"InvoiceStatus"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"executedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"payments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"budgetLineId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}}]}},{"kind":"Field","name":{"kind":"Name","value":"invoiceFiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"sizeBytes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetInvoicesQuery, GetInvoicesQueryVariables>;
export const GetVendorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getVendors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetVendorsQuery, GetVendorsQueryVariables>;
export const UpdateInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"note"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payments"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateInvoicePaymentsInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"InvoiceStatus"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"totalAmount"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"note"},"value":{"kind":"Variable","name":{"kind":"Name","value":"note"}}},{"kind":"Argument","name":{"kind":"Name","value":"payments"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payments"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"totalAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"totalAmount"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"authorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>;
export const GetOrderOriginsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getOrderOrigins"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onlyPhysical"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderOrigins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"onlyPhysical"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onlyPhysical"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPhysical"}}]}}]}}]} as unknown as DocumentNode<GetOrderOriginsQuery, GetOrderOriginsQueryVariables>;
export const GetOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"Argument","name":{"kind":"Name","value":"originIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"executedAt"}},{"kind":"Field","name":{"kind":"Name","value":"payerFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"payerLastName"}},{"kind":"Field","name":{"kind":"Name","value":"payerEmail"}},{"kind":"Field","name":{"kind":"Name","value":"helloAssoOrderId"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"originId"}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"budgetLineId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"executedAt"}},{"kind":"Field","name":{"kind":"Name","value":"budgetLine"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedUnitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOrdersQuery, GetOrdersQueryVariables>;
export const AddHelloAssoConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddHelloAssoConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"formSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enableSynchro"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"budgetCategoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addHelloAssoConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"formSlug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"formSlug"}}},{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"enableSynchro"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enableSynchro"}}},{"kind":"Argument","name":{"kind":"Name","value":"budgetCategoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"budgetCategoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"formSlug"}}]}}]}}]} as unknown as DocumentNode<AddHelloAssoConfigMutation, AddHelloAssoConfigMutationVariables>;
export const AddOrUpdateOrderOriginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addOrUpdateOrderOrigin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"budgetLineIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addOrUpdateOrderOrigin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"budgetLineIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"budgetLineIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddOrUpdateOrderOriginMutation, AddOrUpdateOrderOriginMutationVariables>;
export const DeleteOrderOriginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteOrderOrigin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOrderOrigin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeleteOrderOriginMutation, DeleteOrderOriginMutationVariables>;
export const DisconnectGoogleDriveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"disconnectGoogleDrive"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disconnectGoogleDrive"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editionId"}},{"kind":"Field","name":{"kind":"Name","value":"isConnected"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceFolderId"}},{"kind":"Field","name":{"kind":"Name","value":"googleAccountEmail"}},{"kind":"Field","name":{"kind":"Name","value":"connectedAt"}}]}}]}}]} as unknown as DocumentNode<DisconnectGoogleDriveMutation, DisconnectGoogleDriveMutationVariables>;
export const GetGoogleDriveConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGoogleDriveConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleDriveConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editionId"}},{"kind":"Field","name":{"kind":"Name","value":"isConnected"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceFolderId"}},{"kind":"Field","name":{"kind":"Name","value":"googleAccountEmail"}},{"kind":"Field","name":{"kind":"Name","value":"connectedAt"}}]}}]}}]} as unknown as DocumentNode<GetGoogleDriveConfigQuery, GetGoogleDriveConfigQueryVariables>;
export const GetHelloAssoConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getHelloAssoConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"helloAssoConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"formSlug"}}]}}]}}]} as unknown as DocumentNode<GetHelloAssoConfigQuery, GetHelloAssoConfigQueryVariables>;
export const SynchroSalesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"synchroSales"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"helloAssoConfigId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"synchroSales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"helloAssoConfigId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"helloAssoConfigId"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SynchroSalesMutation, SynchroSalesMutationVariables>;
export const UpdateEditionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateEdition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"openingBalance"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEdition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"openingBalance"},"value":{"kind":"Variable","name":{"kind":"Name","value":"openingBalance"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"openingBalance"}}]}}]}}]} as unknown as DocumentNode<UpdateEditionMutation, UpdateEditionMutationVariables>;
export const UpdateGoogleDriveConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateGoogleDriveConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invoiceFolderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGoogleDriveConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"invoiceFolderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invoiceFolderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editionId"}},{"kind":"Field","name":{"kind":"Name","value":"isConnected"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceFolderId"}},{"kind":"Field","name":{"kind":"Name","value":"googleAccountEmail"}},{"kind":"Field","name":{"kind":"Name","value":"connectedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateGoogleDriveConfigMutation, UpdateGoogleDriveConfigMutationVariables>;