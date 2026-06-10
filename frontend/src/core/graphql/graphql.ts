/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Cliente = {
  endereco: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['ID']['output']>;
  instagram: Maybe<Scalars['String']['output']>;
  nome: Maybe<Scalars['String']['output']>;
  telefone: Maybe<Scalars['String']['output']>;
};

export type ClienteFilterInput = {
  busca?: InputMaybe<Scalars['String']['input']>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};

export type ClienteInput = {
  endereco: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  instagram: Scalars['String']['input'];
  nome: Scalars['String']['input'];
  telefone: Scalars['String']['input'];
};

export type ClientesPaged = {
  content: Maybe<Array<Maybe<Cliente>>>;
  totalElements: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  removerCliente: Maybe<Scalars['Boolean']['output']>;
  salvarCliente: Maybe<Cliente>;
};


export type MutationRemoverClienteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSalvarClienteArgs = {
  filterInput: InputMaybe<ClienteInput>;
};

export type Query = {
  cliente: Maybe<Cliente>;
  clientes: Maybe<ClientesPaged>;
};


export type QueryClienteArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClientesArgs = {
  filterInput: InputMaybe<ClienteFilterInput>;
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
