import {
  UpdateEditionDocument,
  UpdateEditionMutationVariables,
} from "@/generated/graphql";
import { gqlFetch } from "@/lib/gqlFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateEdition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateEdition"],
    mutationFn: (variables: UpdateEditionMutationVariables) =>
      gqlFetch({ document: UpdateEditionDocument, variables }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["editions"] });
    },
  });
}
