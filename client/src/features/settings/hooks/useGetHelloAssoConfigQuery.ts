import { useQuery } from "@tanstack/react-query";
import {
  GetHelloAssoConfigDocument,
  GetHelloAssoConfigQuery,
  GetHelloAssoConfigQueryVariables,
} from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

interface UseGetHelloAssoConfigQueryProps {
  onComplete?: (response: GetHelloAssoConfigQuery) => void;
  variables: GetHelloAssoConfigQueryVariables;
}

export function useGetHelloAssoConfigQuery({
  onComplete,
  variables,
}: UseGetHelloAssoConfigQueryProps) {
  return useQuery({
    queryKey: ["helloAssoConfig", variables],
    queryFn: () =>
      gqlFetch({
        document: GetHelloAssoConfigDocument,
        variables,
        onComplete,
      }),
  });
}
