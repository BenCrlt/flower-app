import { useQuery } from "@tanstack/react-query";
import { GetBudgetCategoriesDocument } from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useGetBudgetCategoriesQuery() {
  return useQuery({
    queryKey: ["budgetCategories"],
    queryFn: () =>
      gqlFetch({
        document: GetBudgetCategoriesDocument,
      }),
  });
}
