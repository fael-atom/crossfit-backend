/*
  Warnings:

  - You are about to drop the column `productId` on the `sales` table. All the data in the column will be lost.
  - Added the required column `salesProductsInfo` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_productId_fkey";

-- AlterTable
ALTER TABLE "sales" DROP COLUMN "productId",
ADD COLUMN     "salesProductsInfo" JSONB NOT NULL;
