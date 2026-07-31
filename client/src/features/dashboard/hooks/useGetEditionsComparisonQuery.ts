import { useQuery } from "@tanstack/react-query";
import { GetEditionsComparisonDocument } from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useGetEditionsComparisonQuery() {
  return useQuery({
    queryKey: ["getEditionsComparison"],
    queryFn: () =>
      gqlFetch({
        document: GetEditionsComparisonDocument,
      }),
  });
}
