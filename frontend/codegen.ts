import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    {
      'http://localhost:8080/graphql': {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJiYWNrZW5kIiwic3ViIjoiMSIsImV4cCI6MTc4MTIwMDYyMiwiaWF0IjoxNzgxMTE0MjIyLCJyb2xlcyI6WyJBRE1JTiJdfQ.MBck8vNDqp_QuMVrIjl3W4-F6-amAWSabQFh32JaA5ZxMhda_HLz84QAN34AWadbBfa6uu8xW3XXtN3DWDL8ax_nHNijDIvGRdmq3-bqsbwD1EFT-RCGKowReOhfTQ96iKKlQl1ArxOoo4SwctMfYlGlSSOUc7Y-RxE-mBNHqZdLL4gYHhMYNkatZN7vD5IST-Z62-gfbiTN5eP0cKqa2R-igyB4mjJNHz3bsoGx2Ts5XS-BbMBRIOCmF7Qiaftwq15ZHim4WlfqRvskzqpdoFxqG2i9vImQiKoWABfT316GcFPCO3ynqxo7dArL0qn_RxjvFUFLzPntNiBrr9-zaw'
        }
      }
    }
  ],

  documents: ['src/**/*.{ts,tsx}', '!src/gql/**/*'],

  generates: {
    './src/core/graphql/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],

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