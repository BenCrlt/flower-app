import {
  GetOrderOriginDocument,
  GetOrderOriginQuery,
  GetOrderOriginQueryVariables,
} from "@/generated/graphql";
import { gqlFetch } from "@/lib/gqlFetch";
import { useQuery } from "@tanstack/react-query";

interface UseGetOrderOriginProps {
  variables: GetOrderOriginQueryVariables;
  enabled?: boolean;
  onComplete?: (data: GetOrderOriginQuery) => void;
}

export function useGetOrderOriginQuery({
  variables,
  enabled,
  onComplete,
}: UseGetOrderOriginProps) {
  return useQuery({
    queryKey: ["orderOrigin", variables.id, variables.editionId],
    queryFn: () =>
      gqlFetch({ document: GetOrderOriginDocument, variables, onComplete }),
    enabled,
  });
}
