import {
  UpsertBudgetCategoryDocument,
  UpsertBudgetCategoryMutationVariables,
} from "@/generated/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useUpsertBudgetCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["upsertBudgetCategory"],
    mutationFn: (variables: UpsertBudgetCategoryMutationVariables) =>
      gqlFetch({
        document: UpsertBudgetCategoryDocument,
        variables,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgetCategories"] });
    },
  });
}
