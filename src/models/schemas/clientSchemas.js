import { z } from "zod";

// Esquema para validação de criação de cliente
export const clientSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

// Esquema para validação de atualização de cliente
export const clientUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

