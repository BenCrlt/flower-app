import {
  AddInvoiceDocument,
  AddInvoiceMutationVariables,
} from "@/generated/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useAddInvoiceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addInvoice"],
    mutationFn: (variables: AddInvoiceMutationVariables) =>
      gqlFetch({
        document: AddInvoiceDocument,
        variables,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}
