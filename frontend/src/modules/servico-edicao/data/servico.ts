import { gql } from 'graphql-request'

export const SERVICO_QUERY = gql`
  query servico($id: ID!) {
    servico(id: $id) {
      id
      nome
      descricao
      precoPequeno
      precoMedio
      precoGrande
    }
  }
`

export const SALVAR_SERVICO_MUTATION = gql`
  mutation salvarServico($filterInput: ServicoInput!) {
    salvarServico(filterInput: $filterInput) {
      id
      nome
      descricao
      precoPequeno
      precoMedio
      precoGrande
    }
  }
`
