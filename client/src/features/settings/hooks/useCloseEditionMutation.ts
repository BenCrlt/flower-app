import {
  CloseEditionDocument,
  CloseEditionMutationVariables,
} from "@/generated/graphql";
import { gqlFetch } from "@/lib/gqlFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCloseEditionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["closeEdition"],
    mutationFn: (variables: CloseEditionMutationVariables) =>
      gqlFetch({ document: CloseEditionDocument, variables }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["editions"] });
    },
  });
}
