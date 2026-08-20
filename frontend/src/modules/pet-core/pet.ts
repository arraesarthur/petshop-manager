import { gql } from "graphql-request";

export const DELETE_PET_MUTATION = gql`
  mutation RemoverPet($id: ID!) {
    removerPet(id: $id)
  }
`