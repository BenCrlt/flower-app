import { useQuery } from "@tanstack/react-query";
import {
  GetBudgetLinesDocument,
  GetBudgetLinesQuery,
  GetBudgetLinesQueryVariables,
} from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

interface UseGetBudgetLinesQueryProps {
  onComplete?: (response: GetBudgetLinesQuery) => void;
  variables: GetBudgetLinesQueryVariables;
}

export function useGetBudgetLinesQuery({
  onComplete,
  variables,
}: UseGetBudgetLinesQueryProps) {
  return useQuery({
    queryKey: ["budgetLines", variables],
    queryFn: () =>
      gqlFetch({
        document: GetBudgetLinesDocument,
        variables,
        onComplete,
      }),
  });
}
