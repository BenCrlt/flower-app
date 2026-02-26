import {
  DeleteBudgetLineDocument,
  DeleteBudgetLineMutationVariables,
} from "@/generated/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useAddBudgetLineMutation() {
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
    },
  });
}
