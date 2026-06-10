import { gql } from 'graphql-request'

export const CLIENTES_QUERY = gql`
  query ClientesPaged($filterInput: ClienteFilterInput) {
    clientes(filterInput: $filterInput) {
      content {
        ...clienteFragment
      }
      totalElements
    }
  }

  fragment clienteFragment on Cliente {
    id
    nome
    telefone
    instagram
    endereco
  }
`