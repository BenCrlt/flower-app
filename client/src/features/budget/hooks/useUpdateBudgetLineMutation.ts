import {
  UpdateBudgetLineDocument,
  UpdateBudgetLineMutationVariables,
} from "@/generated/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useUpdateBudgetLineMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateBudgetLine"],
    mutationFn: (variables: UpdateBudgetLineMutationVariables) =>
      gqlFetch({
        document: UpdateBudgetLineDocument,
        variables,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgetLines"] });
    },
  });
}
