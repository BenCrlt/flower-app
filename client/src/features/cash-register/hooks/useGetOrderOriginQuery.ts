import {
  GetOrderOriginDocument,
  GetOrderOriginQueryVariables,
} from "@/generated/graphql";
import { gqlFetch } from "@/lib/gqlFetch";
import { useQuery } from "@tanstack/react-query";

interface UseGetOrderOriginProps {
  variables: GetOrderOriginQueryVariables;
  enabled?: boolean;
}

export function useGetOrderOriginQuery({
  variables,
  enabled,
}: UseGetOrderOriginProps) {
  return useQuery({
    queryKey: ["orderOrigin", variables.id],
    queryFn: () => gqlFetch({ document: GetOrderOriginDocument, variables }),
    enabled,
  });
}
