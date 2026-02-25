import {
  AddBudgetLineDocument,
  AddBudgetLineMutationVariables,
} from "@/generated/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useAddBudgetLineMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addBudgetLine"],
    mutationFn: (variables: AddBudgetLineMutationVariables) =>
      gqlFetch({
        document: AddBudgetLineDocument,
        variables,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgetLines"] });
    },
  });
}
