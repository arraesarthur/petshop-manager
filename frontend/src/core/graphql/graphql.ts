/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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

export type EspecieEnum =
  | 'CACHORRO'
  | 'GATO'
  | 'OUTROS';

export type PetFilterInput = {
  busca?: string | null | undefined;
  clienteId?: number | null | undefined;
  page: number;
  size: number;
};

export type PetInput = {
  clienteId: string | number;
  dataNascimento: unknown;
  especie: string;
  id?: string | number | null | undefined;
  nome: string;
  observacao: string;
  porte: string;
  racaId: string | number;
  sexo: string;
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


export type ClientesPagedQuery = { clientesPaged: { totalElements: number | null, content: Array<{ id: string | null, nome: string | null, telefone: string | null, instagram: string | null, endereco: string | null } | null> | null } | null };

export type ClienteFragmentFragment = { id: string | null, nome: string | null, telefone: string | null, instagram: string | null, endereco: string | null };

export type RemoverPetMutationVariables = Exact<{
  id: string | number;
}>;


export type RemoverPetMutation = { removerPet: boolean | null };

export type PetQueryVariables = Exact<{
  id: string | number;
}>;


export type PetQuery = { pet: { id: string | null, nome: string | null, especie: string | null, sexo: string | null, porte: string | null, observacao: string | null, dataNascimento: unknown, raca: { id: string | null, nome: string | null } | null, cliente: { id: string | null, nome: string | null } | null } | null };

export type RacasQueryVariables = Exact<{
  especie: EspecieEnum;
}>;


export type RacasQuery = { racas: Array<{ id: string | null, nome: string | null, especie: EspecieEnum | null } | null> | null };

export type SalvarPetMutationVariables = Exact<{
  filterInput: PetInput;
}>;


export type SalvarPetMutation = { salvarPet: { id: string | null, nome: string | null, especie: string | null, sexo: string | null, porte: string | null, observacao: string | null, dataNascimento: unknown, raca: { id: string | null, nome: string | null } | null, cliente: { id: string | null, nome: string | null } | null } | null };

export type RemoverPetMutationVariables = Exact<{
  id: string | number;
}>;


export type RemoverPetMutation = { removerPet: boolean | null };

export type ClientesQueryVariables = Exact<{ [key: string]: never; }>;


export type ClientesQuery = { clientes: Array<{ id: string | null, nome: string | null } | null> | null };

export type ClientesFragmentFragment = { id: string | null, nome: string | null };

export type PetsPagedQueryVariables = Exact<{
  filterInput?: PetFilterInput | null | undefined;
}>;


export type PetsPagedQuery = { pets: { totalElements: number | null, content: Array<{ id: string | null, nome: string | null, sexo: string | null, porte: string | null, especie: string | null, raca: { nome: string | null } | null, cliente: { nome: string | null, id: string | null } | null } | null> | null } | null };

export type PetFragmentFragment = { id: string | null, nome: string | null, sexo: string | null, porte: string | null, especie: string | null, raca: { nome: string | null } | null, cliente: { nome: string | null, id: string | null } | null };
