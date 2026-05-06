import { GetSumUpConfigDocument } from "@/generated/graphql";
import { gqlFetch } from "@/lib/gqlFetch";
import { useQuery } from "@tanstack/react-query";

export const useSumUpQuery = () => {
  return useQuery({
    queryKey: ["sumUpConfig"],
    queryFn: () => gqlFetch({ document: GetSumUpConfigDocument }),
  });
};
