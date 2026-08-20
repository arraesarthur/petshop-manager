import { gql } from 'graphql-request'

export const PET_QUERY = gql`
  query pet($id: ID!) {
    pet(id: $id) {
      id
      nome
      especie
      raca {
        id
        nome
      }
      sexo
      porte
      cliente {
        id
        nome
      }
      observacao
      dataNascimento
    }
  }
`

export const RACAS_QUERY = gql`
  query racas($especie: EspecieEnum!) {
    racas(especie: $especie) {
      id
      nome
      especie
    }
  }
`

export const SALVAR_PET_MUTATION = gql`
  mutation salvarPet($filterInput: PetInput!) {
    salvarPet(filterInput: $filterInput) {
      id
      nome
      especie
      raca {
        id
        nome
      }
      sexo
      porte
      cliente {
        id
        nome
      }
      observacao
      dataNascimento
    }
  }
`