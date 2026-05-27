import {
  DisconnectGoogleDriveDocument,
  DisconnectGoogleDriveMutationVariables,
} from "@/generated/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useDisconnectGoogleDriveMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["disconnectGoogleDrive"],
    mutationFn: (variables: DisconnectGoogleDriveMutationVariables) =>
      gqlFetch({
        document: DisconnectGoogleDriveDocument,
        variables,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["googleDriveConfig"] });
    },
  });
}
