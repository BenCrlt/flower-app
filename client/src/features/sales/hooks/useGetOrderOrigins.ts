import { GetOrderOriginsDocument } from "@/generated/graphql";
import { gqlFetch } from "@/lib/gqlFetch";
import { useQuery } from "@tanstack/react-query";

export function useGetOrderOriginsQuery() {
  return useQuery({
    queryKey: ["orderOrigins"],
    queryFn: () => gqlFetch({ document: GetOrderOriginsDocument }),
  });
}
