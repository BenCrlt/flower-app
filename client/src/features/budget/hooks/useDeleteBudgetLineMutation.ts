import {
  DeleteBudgetLineDocument,
  DeleteBudgetLineMutationVariables,
} from "@/generated/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useDeleteBudgetLineMutation({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteBudgetLine"],
    mutationFn: (variables: DeleteBudgetLineMutationVariables) =>
      gqlFetch({
        document: DeleteBudgetLineDocument,
        variables,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgetLines"] });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
