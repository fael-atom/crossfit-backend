import { z } from "zod";

// Esquema para validação de criação de usuário
export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

// Esquema para validação de atualização de usuário
export const userUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

