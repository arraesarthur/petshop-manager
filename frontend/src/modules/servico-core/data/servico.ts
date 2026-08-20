import { gql } from 'graphql-request'

export const DELETE_SERVICO_MUTATION = gql`
  mutation RemoverServico($id: ID!) {
    removerServico(id: $id)
  }
`
