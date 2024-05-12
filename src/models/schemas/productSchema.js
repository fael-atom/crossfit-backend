import { z } from "zod";

// Esquema para validação de criação de usuário
export const productCreateSchema = z.object({
  name: z.string(),
  type: z.string(),
  unitPrice: z.number(),
  stockQuantity: z.number(),
  pictureBinary: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string(),
  type: z.string(),
  unitPrice: z.number(),
  stockQuantity: z.number(),
  picture: z.string(),
});

// Esquema para validação de atualização de usuário
export const productUpdateSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  unitPrice: z.number().optional(),
  stockQuantity: z.number().optional(),
  picture: z.string().optional(),
});
