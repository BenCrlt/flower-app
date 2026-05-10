import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddOrUpdateOrderOriginDocument,
  AddOrUpdateOrderOriginMutation,
  AddOrUpdateOrderOriginMutationVariables,
} from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

interface UseAddOrUpdateOrderOriginMutationProps {
  onError?: (error: Error) => void;
  onSuccess?: (data: AddOrUpdateOrderOriginMutation) => void;
}

export function useAddOrUpdateOrderOriginMutation({
  onError,
  onSuccess,
}: UseAddOrUpdateOrderOriginMutationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addOrUpdateOrderOrigin"],
    mutationFn: (variables: AddOrUpdateOrderOriginMutationVariables) =>
      gqlFetch({
        document: AddOrUpdateOrderOriginDocument,
        variables,
      }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orderOrigins"] });
      if (variables.id != null) {
        queryClient.invalidateQueries({
          queryKey: ["orderOrigin", variables.id],
        });
      }
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
