import { gql } from 'graphql-request'

export const SERVICOS_QUERY = gql`
  query ServicosPaged($filterInput: ServicoFilterInput) {
    servicosPaged(filterInput: $filterInput) {
      content {
        ...servicoFragment
      }
      totalElements
    }
  }

  fragment servicoFragment on Servico {
    id
    nome
    descricao
    precoPequeno
    precoMedio
    precoGrande
  }
`
