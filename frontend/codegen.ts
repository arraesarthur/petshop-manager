import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    {
      'http://localhost:8080/graphql': {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJiYWNrZW5kIiwic3ViIjoiMSIsImV4cCI6MTc4MjYxMzA2MCwiaWF0IjoxNzgyNTI2NjYwLCJyb2xlcyI6WyJBRE1JTiJdfQ.d-3e5FrjtmLtBdK89Fq-GkpEuhbVIwlAmEdoCOjZgY3Dz8gwG1EgHe34yNtKtH0QFhTAskrACwSEfQLc0TW0Uojy_Mf2P9hJluH22-6mPV0px2nUvmdlVaLCThKrlyafExr1C9k5Voejrts6hioP-cz7XOfdv9N5LLpPzx17SCBAmSyzy68BD2g7Iq2RGQW-Wci40vGLONzD7ICyAfDaWOp0v6SPbc_CV9TkmrihUokUgpqmBBAP-pFb3knBjafyLtQmzaPeT9brfbzqdf6RNya69qvsR2njYn7G3-DGnTGXnl9iX4nZ4N5eh-gnSPiGhanEMCz3xysviwtsqZ6eAw'
        }
      }
    }
  ],

  documents: ['src/**/*.{ts,tsx}', '!src/gql/**/*'],

  generates: {
    './src/core/graphql/graphql.ts': {
      plugins: ['typescript-operations'],

      config: {
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: true
        },

        declarationKind: 'type',

        skipTypename: true
      }
    }
  }
}

export default config