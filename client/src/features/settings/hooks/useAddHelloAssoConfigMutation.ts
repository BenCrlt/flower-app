import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddHelloAssoConfigDocument,
  AddHelloAssoConfigMutation,
  AddHelloAssoConfigMutationVariables,
} from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

interface UseAddHelloAssoConfigMutationProps {
  onError?: (error: Error) => void;
  onSuccess?: (data: AddHelloAssoConfigMutation) => void;
}

export function useAddHelloAssoConfigMutation({
  onError,
  onSuccess,
}: UseAddHelloAssoConfigMutationProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addHelloAssoConfig"],
    mutationFn: (variables: AddHelloAssoConfigMutationVariables) =>
      gqlFetch({
        document: AddHelloAssoConfigDocument,
        variables,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["helloAssoConfig"] });
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
