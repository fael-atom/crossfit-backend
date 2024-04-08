import { z } from "zod";

// Esquema para validação de criação de uma venda
export const salesSchema = z.object({
  productId: z.number(),
  userId: z.number()
});

// Esquema para validação de atualização de uma venda
export const salesUpdateSchema = z.object({
  productId: z.number().optional(),
  userId: z.number().optional()
});
