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
});

// Esquema para validação de atualização de uma venda
export const salesUpdateSchema = z.object({
  productId: z.number().optional(),
  userId: z.number().optional(),
});
