import { gql } from 'graphql-request'

export const PETS_QUERY = gql`
  query PetsPaged($filterInput: PetFilterInput) {
    pets(filterInput: $filterInput) {
      content {
        ...petFragment
      }
      totalElements
    }
  }

  fragment petFragment on Pet {
    id
    nome
    sexo
    porte
    especie
    raca {
      nome
    }
    cliente {
      nome
      id
    }
  }
`
