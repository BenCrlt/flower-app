import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  SynchroSalesDocument,
  SynchroSalesMutation,
  SynchroSalesMutationVariables,
} from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

interface UseSynchroSalesMutationProps {
  onError?: (error: Error) => void;
  onSuccess?: (data: SynchroSalesMutation) => void;
}

export function useSynchroSalesMutation({
  onError,
  onSuccess,
}: UseSynchroSalesMutationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["synchroSales"],
    mutationFn: (variables: SynchroSalesMutationVariables) =>
      gqlFetch({
        document: SynchroSalesDocument,
        variables,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
