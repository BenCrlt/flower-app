import {
  DeleteInvoiceDocument,
  DeleteInvoiceMutationVariables,
} from "@/generated/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useDeleteInvoiceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteInvoice"],
    mutationFn: (variables: DeleteInvoiceMutationVariables) =>
      gqlFetch({
        document: DeleteInvoiceDocument,
        variables,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}
