import { ResolverPayload } from "@gqloom/core";
import { FastifyRequest } from "fastify";
import { GraphQLError } from "graphql";

export type AuthSession = NonNullable<FastifyRequest["authSession"]>;

export type AppGraphQLContext = {
  authSession: AuthSession;
};

export function getAppGraphQLContext(context: unknown): AppGraphQLContext {
  const authSession = (context as { authSession?: AuthSession } | undefined)
    ?.authSession;
  if (!authSession?.user?.id) {
    throw new GraphQLError("Authentication required", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
  return { authSession };
}

export function resolveWithContext<TInput, TOutput>(
  fn: (
    input: TInput,
    context: AppGraphQLContext,
  ) => Promise<TOutput> | TOutput,
): (
  input: TInput,
  payload: ResolverPayload | undefined,
) => Promise<TOutput> | TOutput {
  return async (input, payload) => {
    const appContext = getAppGraphQLContext(payload?.context ?? undefined);
    return fn(input, appContext);
  };
}
