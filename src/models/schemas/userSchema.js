import { z } from "zod";

// Esquema para validação de criação de usuário
export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string()
});

// Esquema para validação de atualização de usuário
export const userUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  active: z.number().optional(),
  admin: z.number().optional()
});

