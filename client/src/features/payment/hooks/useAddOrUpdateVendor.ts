import {
  AddOrUpdateVendorDocument,
  AddOrUpdateVendorMutationVariables,
} from "@/generated/graphql";
import { gqlFetch } from "@/lib/gqlFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddOrUpdateVendor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addOrUpdateVendor"],
    mutationFn: (variables: AddOrUpdateVendorMutationVariables) =>
      gqlFetch({
        document: AddOrUpdateVendorDocument,
        variables,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
}
