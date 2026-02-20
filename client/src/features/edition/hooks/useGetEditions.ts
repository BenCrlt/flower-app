import { useQuery } from "@tanstack/react-query";
import { GetEditionsDocument } from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useGetEditions() {
  return useQuery({
    queryKey: ["editions"],
    queryFn: () => gqlFetch(GetEditionsDocument),
  });
}
