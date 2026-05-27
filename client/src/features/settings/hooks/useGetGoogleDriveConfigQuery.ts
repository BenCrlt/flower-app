import { useQuery } from "@tanstack/react-query";
import {
  GetGoogleDriveConfigDocument,
  GetGoogleDriveConfigQuery,
  GetGoogleDriveConfigQueryVariables,
} from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

interface UseGetGoogleDriveConfigQueryProps {
  variables: GetGoogleDriveConfigQueryVariables;
}

export function useGetGoogleDriveConfigQuery({
  variables,
}: UseGetGoogleDriveConfigQueryProps) {
  return useQuery({
    queryKey: ["googleDriveConfig", variables],
    queryFn: () =>
      gqlFetch<GetGoogleDriveConfigQuery, GetGoogleDriveConfigQueryVariables>({
        document: GetGoogleDriveConfigDocument,
        variables,
      }),
  });
}
