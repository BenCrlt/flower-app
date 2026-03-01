import { useQuery } from "@tanstack/react-query";
import {
  GetBudgetStatsByCategoriesDocument,
  GetBudgetStatsByCategoriesQueryVariables,
} from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

interface UseGetBudgetStatsByCategoriesQueryProps {
  variables: GetBudgetStatsByCategoriesQueryVariables;
}

export function useGetBudgetStatsByCategoriesQuery({
  variables,
}: UseGetBudgetStatsByCategoriesQueryProps) {
  return useQuery({
    queryKey: ["getBudgetStatsByCategories", variables],
    queryFn: () =>
      gqlFetch({
        document: GetBudgetStatsByCategoriesDocument,
        variables,
      }),
  });
}
