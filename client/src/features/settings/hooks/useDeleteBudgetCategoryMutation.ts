import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DeleteBudgetCategoryDocument,
  DeleteBudgetCategoryMutation,
  DeleteBudgetCategoryMutationVariables,
} from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

interface UseDeleteBudgetCategoryMutationProps {
  onError?: (error: Error) => void;
  onSuccess?: (data: DeleteBudgetCategoryMutation) => void;
}

export function useDeleteBudgetCategoryMutation({
  onError,
  onSuccess,
}: UseDeleteBudgetCategoryMutationProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteBudgetCategory"],
    mutationFn: (variables: DeleteBudgetCategoryMutationVariables) =>
      gqlFetch({
        document: DeleteBudgetCategoryDocument,
        variables,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["budgetCategories"] });
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
