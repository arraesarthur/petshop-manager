import { z } from 'zod'
 
export const zodSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  especie: z.string().min(1, 'Espécie é obrigatória'),
  racaId: z.string().min(1, 'Raça é obrigatória'),
  sexo: z.string().min(1, 'Sexo é obrigatório'),
  porte: z.string().min(1, 'Porte é obrigatório'),
  clienteId: z.string().min(1, 'Cliente é obrigatório'),
  observacao: z.string().min(1, 'Observação é obrigatória'),
  dataNascimento: z.string().min(1, 'Data de nascimento é obrigatória')
})
 