import { gql } from 'graphql-request'

export const CLIENTE_QUERY = gql`
  query cliente($id: ID!) {
    cliente(id: $id) {
      id
      nome
      telefone
      instagram
      endereco
    }
  }
`

export const SALVAR_CLIENTE_MUTATION = gql`
  mutation salvarCliente($filterInput: ClienteInput!) {
    salvarCliente(filterInput: $filterInput) {
      id
      nome
      telefone
      instagram
      endereco
    }
}
`