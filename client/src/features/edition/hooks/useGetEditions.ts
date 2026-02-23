import { useQuery } from "@tanstack/react-query";
import {
  GetEditionsDocument,
  GetEditionsQuery,
} from "../../../generated/graphql";
import { gqlFetch } from "../../../lib/gqlFetch";

interface UseGetEditionsQueryProps {
  onComplete?: (response: GetEditionsQuery) => void;
}

export function useGetEditionsQuery({ onComplete }: UseGetEditionsQueryProps) {
  return useQuery({
    queryKey: ["editions"],
    queryFn: () =>
      gqlFetch({
        document: GetEditionsDocument,
        onComplete,
      }),
  });
}
