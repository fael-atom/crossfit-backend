import { z } from "zod";

// Esquema para validação de criação de cliente
export const clientSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  telefone: z.string().optional(),
});

// Esquema para validação de atualização de cliente
export const clientUpdateSchema = z.object({
  nome: z.string().optional(),
  email: z.string().email().optional(),
  telefone: z.string().optional(),
});

