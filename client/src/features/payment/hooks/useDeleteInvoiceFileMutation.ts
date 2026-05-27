import {
  DeleteInvoiceFileDocument,
  DeleteInvoiceFileMutationVariables,
} from "@/generated/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useDeleteInvoiceFileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteInvoiceFile"],
    mutationFn: (variables: DeleteInvoiceFileMutationVariables) =>
      gqlFetch({
        document: DeleteInvoiceFileDocument,
        variables,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}
