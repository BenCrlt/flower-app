import { useQuery } from "@tanstack/react-query";
import {
  GetInvoicesDocument,
  GetInvoicesQuery,
  GetInvoicesQueryVariables,
} from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

interface UseGetInvoicesQueryProps {
  onComplete?: (response: GetInvoicesQuery) => void;
  variables: GetInvoicesQueryVariables;
}

export function useGetInvoicesQuery({
  onComplete,
  variables,
}: UseGetInvoicesQueryProps) {
  return useQuery({
    queryKey: ["invoices", variables],
    queryFn: () =>
      gqlFetch({
        document: GetInvoicesDocument,
        variables,
        onComplete,
      }),
  });
}
