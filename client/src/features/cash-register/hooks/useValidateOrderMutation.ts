import {
  ValidateOrderDocument,
  ValidateOrderMutationVariables,
} from "@/generated/graphql";
import { gqlFetch } from "@/lib/gqlFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseValidateOrderMutationProps {
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}

export const useValidateOrderMutation = ({
  onError,
  onSuccess,
}: UseValidateOrderMutationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["validateOrder"],
    mutationFn: (variables: ValidateOrderMutationVariables) =>
      gqlFetch({
        document: ValidateOrderDocument,
        variables,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
