/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ClienteFilterInput = {
  busca?: string | null | undefined;
  page: number;
  size: number;
};

export type ClienteInput = {
  endereco: string;
  id?: string | number | null | undefined;
  instagram: string;
  nome: string;
  telefone: string;
};

export type RemoverClienteMutationVariables = Exact<{
  id: string | number;
}>;


export type RemoverClienteMutation = { removerCliente: boolean | null };

export type ClienteQueryVariables = Exact<{
  id: string | number;
}>;


export type ClienteQuery = { cliente: { id: string | null, nome: string | null, telefone: string | null, instagram: string | null, endereco: string | null } | null };

export type SalvarClienteMutationVariables = Exact<{
  filterInput: ClienteInput;
}>;


export type SalvarClienteMutation = { salvarCliente: { id: string | null, nome: string | null, telefone: string | null, instagram: string | null, endereco: string | null } | null };

export type ClientesPagedQueryVariables = Exact<{
  filterInput?: ClienteFilterInput | null | undefined;
}>;


export type ClientesPagedQuery = { clientes: { totalElements: number | null, content: Array<{ id: string | null, nome: string | null, telefone: string | null, instagram: string | null, endereco: string | null } | null> | null } | null };

export type ClienteFragmentFragment = { id: string | null, nome: string | null, telefone: string | null, instagram: string | null, endereco: string | null };

export const ClienteFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"clienteFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cliente"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nome"}},{"kind":"Field","name":{"kind":"Name","value":"telefone"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"endereco"}}]}}]} as unknown as DocumentNode<ClienteFragmentFragment, unknown>;
export const RemoverClienteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoverCliente"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removerCliente"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoverClienteMutation, RemoverClienteMutationVariables>;
export const ClienteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"cliente"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cliente"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nome"}},{"kind":"Field","name":{"kind":"Name","value":"telefone"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"endereco"}}]}}]}}]} as unknown as DocumentNode<ClienteQuery, ClienteQueryVariables>;
export const SalvarClienteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"salvarCliente"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClienteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"salvarCliente"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filterInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nome"}},{"kind":"Field","name":{"kind":"Name","value":"telefone"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"endereco"}}]}}]}}]} as unknown as DocumentNode<SalvarClienteMutation, SalvarClienteMutationVariables>;
export const ClientesPagedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ClientesPaged"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ClienteFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clientes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filterInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"clienteFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalElements"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"clienteFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cliente"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nome"}},{"kind":"Field","name":{"kind":"Name","value":"telefone"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"endereco"}}]}}]} as unknown as DocumentNode<ClientesPagedQuery, ClientesPagedQueryVariables>;