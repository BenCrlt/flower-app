import { GetVendorsDocument } from "@/generated/graphql";
import { gqlFetch } from "@/lib/gqlFetch";
import { useQuery } from "@tanstack/react-query";

export function useGetVendorsQuery() {
  return useQuery({
    queryKey: ["vendors"],
    queryFn: () => gqlFetch({ document: GetVendorsDocument }),
  });
}
