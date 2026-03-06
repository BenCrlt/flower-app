import {
  UpdateInvoiceDocument,
  UpdateInvoiceMutationVariables,
} from "@/generated/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useUpdateInvoiceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editInvoice"],
    mutationFn: (variables: UpdateInvoiceMutationVariables) =>
      gqlFetch({
        document: UpdateInvoiceDocument,
        variables,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}
