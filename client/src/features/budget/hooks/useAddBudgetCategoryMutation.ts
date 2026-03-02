import {
  AddBudgetCategoryDocument,
  AddBudgetCategoryMutationVariables,
} from "@/generated/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useAddBudgetCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addBudgetCategory"],
    mutationFn: (variables: AddBudgetCategoryMutationVariables) =>
      gqlFetch({
        document: AddBudgetCategoryDocument,
        variables,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgetCategories"] });
    },
  });
}
