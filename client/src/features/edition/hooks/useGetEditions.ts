import { useSuspenseQuery } from "@tanstack/react-query";
import { GetEditionsDocument } from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useGetEditionsSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: ["editions"],
    queryFn: () => gqlFetch({ document: GetEditionsDocument }),
  });
}
