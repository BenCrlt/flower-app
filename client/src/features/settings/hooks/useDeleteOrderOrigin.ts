import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DeleteOrderOriginDocument,
  DeleteOrderOriginMutation,
  DeleteOrderOriginMutationVariables,
} from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

interface UseDeleteOrderOriginMutationProps {
  onError?: (error: Error) => void;
  onSuccess?: (data: DeleteOrderOriginMutation) => void;
}

export function useDeleteOrderOriginMutation({
  onError,
  onSuccess,
}: UseDeleteOrderOriginMutationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteOrderOrigin"],
    mutationFn: (variables: DeleteOrderOriginMutationVariables) =>
      gqlFetch({
        document: DeleteOrderOriginDocument,
        variables,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orderOrigins"] });
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
