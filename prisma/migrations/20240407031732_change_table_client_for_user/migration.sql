/*
  Warnings:

  - You are about to drop the column `quantity` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `unit_price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `sales` table. All the data in the column will be lost.
  - The `status` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stockQuantity` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "quantity",
DROP COLUMN "unit_price",
ADD COLUMN     "stockQuantity" INTEGER NOT NULL,
ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "sales" DROP COLUMN "adminId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "adminId" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");
