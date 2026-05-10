import z from "zod"

export const registerSchema = z.object({
  nomeCompleto: z
    .string()
    .min(2, 'O nome completo deve conter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres')
})

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres')
})
