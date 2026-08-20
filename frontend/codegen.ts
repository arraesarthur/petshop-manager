import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    {
      'http://localhost:8080/graphql': {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJiYWNrZW5kIiwic3ViIjoiMSIsImV4cCI6MTc4NzI1MDI3OSwiaWF0IjoxNzg3MTYzODc5LCJyb2xlcyI6WyJBRE1JTiJdfQ.Uv0TAnCHiMjnqBWupg4mIP3HhLyuR2Qhpzti3GVnQWKdXe2ifPlihyFc3QgMCQwZoRXU6o8dOTdaz6-J8N3ZkSAAWnXQCm_mkaT21FOs4U647LJW_ObKVeLLAAe56o8b8mzvsZTd4q3q0CuAJXFtE_FHPtBqH7BWnHkoaNqEr9JHtZXD250HTD2py3Vx4njB1irSg6mgm7o0C9KJT9KY8lay9_lxJrEddIBfMwp7ZKm4Fqr9d0wbj8sJ9iRY3fhWo3az-1E29GrGNmHhVYPsjUIZcx_vUMTtevH_HVghCN-nFeCd_7iEF9lIEboybZ-xYb0GoseoCxne9bUF12sAhQ'
        }
      }
    }
  ],

  documents: ['src/**/*.{ts,tsx}', '!src/gql/**/*', '!src/core/graphql/**'],

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