import { gql } from 'graphql-request'

export const CLIENTES_QUERY = gql`
  query Clientes {
    clientes {
        ...clientesFragment
    }
  }

  fragment clientesFragment on Cliente {
    id
    nome
  }
`