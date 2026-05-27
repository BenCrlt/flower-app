import {
  UpdateGoogleDriveConfigDocument,
  UpdateGoogleDriveConfigMutationVariables,
} from "@/generated/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gqlFetch } from "../../../lib/gqlFetch";

export function useUpdateGoogleDriveConfigMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateGoogleDriveConfig"],
    mutationFn: (variables: UpdateGoogleDriveConfigMutationVariables) =>
      gqlFetch({
        document: UpdateGoogleDriveConfigDocument,
        variables,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["googleDriveConfig"] });
    },
  });
}
