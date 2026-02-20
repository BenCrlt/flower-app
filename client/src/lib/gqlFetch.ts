import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";

const GQL_ENDPOINT = "http://localhost:3000/graphql";

export async function gqlFetch<TData, TVariables>(
  document: TypedDocumentNode<TData, TVariables>,
  variables?: TVariables,
): Promise<TData> {
  const res = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: print(document),
      variables: variables ?? undefined,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}
