import { gql } from "graphql-request";

export const DELETE_CLIENTE_MUTATION = gql`
  mutation RemoverCliente($id: ID!) {
    removerCliente(id: $id)
  }
`