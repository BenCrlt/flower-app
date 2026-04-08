import { gqlFetch } from "@/lib/gqlFetch";
import { useQuery } from "@tanstack/react-query";
import {
  GetProductsDocument,
  GetProductsQuery,
  GetProductsQueryVariables,
} from "../../../generated/graphql";

interface UseGetProductsQueryProps {
  variables: GetProductsQueryVariables;
  onComplete?: (data: GetProductsQuery) => void;
}

export function useGetProductsQuery({
  variables,
  onComplete,
}: UseGetProductsQueryProps) {
  return useQuery({
    queryKey: ["products", variables],
    queryFn: () =>
      gqlFetch({ document: GetProductsDocument, variables, onComplete }),
  });
}
