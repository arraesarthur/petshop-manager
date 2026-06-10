import z from 'zod'

export const zodSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, 'O nome é obrigatório'),
  endereco: z.string().min(1, 'O endereço é obrigatório'),
  telefone: z.string().min(1, 'O telefone é obrigatório'),
  instagram: z.string().min(1, 'O Instagram é obrigatório')
})
