/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation RemoverCliente($id: ID!) {\n    removerCliente(id: $id)\n  }\n": typeof types.RemoverClienteDocument,
    "\n  query cliente($id: ID!) {\n    cliente(id: $id) {\n      id\n      nome\n      telefone\n      instagram\n      endereco\n    }\n  }\n": typeof types.ClienteDocument,
    "\n  mutation salvarCliente($filterInput: ClienteInput!) {\n    salvarCliente(filterInput: $filterInput) {\n      id\n      nome\n      telefone\n      instagram\n      endereco\n    }\n}\n": typeof types.SalvarClienteDocument,
    "\n  query ClientesPaged($filterInput: ClienteFilterInput) {\n    clientes(filterInput: $filterInput) {\n      content {\n        ...clienteFragment\n      }\n      totalElements\n    }\n  }\n\n  fragment clienteFragment on Cliente {\n    id\n    nome\n    telefone\n    instagram\n    endereco\n  }\n": typeof types.ClientesPagedDocument,
};
const documents: Documents = {
    "\n  mutation RemoverCliente($id: ID!) {\n    removerCliente(id: $id)\n  }\n": types.RemoverClienteDocument,
    "\n  query cliente($id: ID!) {\n    cliente(id: $id) {\n      id\n      nome\n      telefone\n      instagram\n      endereco\n    }\n  }\n": types.ClienteDocument,
    "\n  mutation salvarCliente($filterInput: ClienteInput!) {\n    salvarCliente(filterInput: $filterInput) {\n      id\n      nome\n      telefone\n      instagram\n      endereco\n    }\n}\n": types.SalvarClienteDocument,
    "\n  query ClientesPaged($filterInput: ClienteFilterInput) {\n    clientes(filterInput: $filterInput) {\n      content {\n        ...clienteFragment\n      }\n      totalElements\n    }\n  }\n\n  fragment clienteFragment on Cliente {\n    id\n    nome\n    telefone\n    instagram\n    endereco\n  }\n": types.ClientesPagedDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoverCliente($id: ID!) {\n    removerCliente(id: $id)\n  }\n"): (typeof documents)["\n  mutation RemoverCliente($id: ID!) {\n    removerCliente(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query cliente($id: ID!) {\n    cliente(id: $id) {\n      id\n      nome\n      telefone\n      instagram\n      endereco\n    }\n  }\n"): (typeof documents)["\n  query cliente($id: ID!) {\n    cliente(id: $id) {\n      id\n      nome\n      telefone\n      instagram\n      endereco\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation salvarCliente($filterInput: ClienteInput!) {\n    salvarCliente(filterInput: $filterInput) {\n      id\n      nome\n      telefone\n      instagram\n      endereco\n    }\n}\n"): (typeof documents)["\n  mutation salvarCliente($filterInput: ClienteInput!) {\n    salvarCliente(filterInput: $filterInput) {\n      id\n      nome\n      telefone\n      instagram\n      endereco\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ClientesPaged($filterInput: ClienteFilterInput) {\n    clientes(filterInput: $filterInput) {\n      content {\n        ...clienteFragment\n      }\n      totalElements\n    }\n  }\n\n  fragment clienteFragment on Cliente {\n    id\n    nome\n    telefone\n    instagram\n    endereco\n  }\n"): (typeof documents)["\n  query ClientesPaged($filterInput: ClienteFilterInput) {\n    clientes(filterInput: $filterInput) {\n      content {\n        ...clienteFragment\n      }\n      totalElements\n    }\n  }\n\n  fragment clienteFragment on Cliente {\n    id\n    nome\n    telefone\n    instagram\n    endereco\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;