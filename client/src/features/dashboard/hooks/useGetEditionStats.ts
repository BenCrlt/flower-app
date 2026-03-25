import { useQuery } from "@tanstack/react-query";
import {
  GetEditionStatsDocument,
  GetEditionStatsQueryVariables,
} from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

interface UseGetEditionStatsQueryProps {
  variables: GetEditionStatsQueryVariables;
}

export function useGetEditionStatsQuery({
  variables,
}: UseGetEditionStatsQueryProps) {
  return useQuery({
    queryKey: ["getEditionStats", variables],
    queryFn: () =>
      gqlFetch({
        document: GetEditionStatsDocument,
        variables,
      }),
  });
}
