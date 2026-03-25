import { useSuspenseQuery } from "@tanstack/react-query";
import {
  GetEditionStatsDocument,
  GetEditionStatsQueryVariables,
} from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

interface UseGetEditionStatsQueryProps {
  variables: GetEditionStatsQueryVariables;
}

export function useGetEditionStatsSuspenseQuery({
  variables,
}: UseGetEditionStatsQueryProps) {
  return useSuspenseQuery({
    queryKey: ["getEditionStats", variables],
    queryFn: () =>
      gqlFetch({
        document: GetEditionStatsDocument,
        variables,
      }),
  });
}
