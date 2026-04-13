import {
  GetOrdersDocument,
  GetOrdersQuery,
  GetOrdersQueryVariables,
} from "@/generated/graphql";
import { gqlFetch } from "@/lib/gqlFetch";
import { useQuery } from "@tanstack/react-query";

interface UseGetOrdersQueryProps {
  onComplete?: (response: GetOrdersQuery) => void;
  variables: GetOrdersQueryVariables;
}

export function useGetOrdersQuery({
  onComplete,
  variables,
}: UseGetOrdersQueryProps) {
  return useQuery({
    queryKey: ["orders", variables],
    queryFn: () =>
      gqlFetch({ document: GetOrdersDocument, variables, onComplete }),
  });
}
