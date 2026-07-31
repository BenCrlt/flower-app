import {
  GetEditionClosingSummaryDocument,
  GetEditionClosingSummaryQueryVariables,
} from "@/generated/graphql";
import { gqlFetch } from "@/lib/gqlFetch";
import { useQuery } from "@tanstack/react-query";

interface UseGetEditionClosingSummaryQueryProps {
  variables: GetEditionClosingSummaryQueryVariables;
  enabled?: boolean;
}

export function useGetEditionClosingSummaryQuery({
  variables,
  enabled = true,
}: UseGetEditionClosingSummaryQueryProps) {
  return useQuery({
    queryKey: ["editionClosingSummary", variables],
    queryFn: () =>
      gqlFetch({ document: GetEditionClosingSummaryDocument, variables }),
    enabled,
  });
}
