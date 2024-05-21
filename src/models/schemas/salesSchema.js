import { z } from "zod";

// Esquema para validação de criação de uma venda
export const salesSchema = z.object({
  userId: z.number(),
  salesProductsInfo: z.array(
    z.object({
      quantity: z.number(),
      productId: z.number(),
      name: z.string(),
      type: z.string(),
      unitPrice: z.number(),
      stockQuantity: z.number(),
    })
  ),
  total: z.number(),
});

// Esquema para validação de atualização de uma venda
export const salesUpdateSchema = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  salesProductsInfo: z.array(
    z.object({
      quantity: z.number().optional(),
      productId: z.number().optional(),
      name: z.string().optional(),
      type: z.string().optional(),
      unitPrice: z.number().optional(),
      stockQuantity: z.number().optional(),
    })
  ).optional(),
  isPaid: z.boolean().optional(),
});
