import { useQuery } from "@tanstack/react-query";
import { GetEditionsDocument } from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useGetEditionsQuery() {
  return useQuery({
    queryKey: ["editions"],
    queryFn: () => gqlFetch({ document: GetEditionsDocument }),
  });
}
