import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../server/generated/schema.gql",
  documents: "src/**/*.graphql",
  generates: {
    "src/generated/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
