import { z } from 'zod'

export const zodSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  precoPequeno: z.coerce.number().min(0.01, 'Preço para porte pequeno é obrigatório'),
  precoMedio: z.coerce.number().min(0.01, 'Preço para porte médio é obrigatório'),
  precoGrande: z.coerce.number().min(0.01, 'Preço para porte grande é obrigatório')
})
