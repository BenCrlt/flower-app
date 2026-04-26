import {
  GetOrderOriginsDocument,
  GetOrderOriginsQueryVariables,
} from "@/generated/graphql";
import { gqlFetch } from "@/lib/gqlFetch";
import { useQuery } from "@tanstack/react-query";

interface UseGetOrderOriginsQueryProps {
  variables?: GetOrderOriginsQueryVariables;
}

export function useGetOrderOriginsQuery({
  variables,
}: UseGetOrderOriginsQueryProps) {
  return useQuery({
    queryKey: ["orderOrigins"],
    queryFn: () => gqlFetch({ document: GetOrderOriginsDocument, variables }),
  });
}
