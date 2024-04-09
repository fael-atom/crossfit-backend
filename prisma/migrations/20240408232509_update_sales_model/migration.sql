/*
  Warnings:

  - You are about to drop the column `clientId` on the `sales` table. All the data in the column will be lost.
  - Added the required column `userId` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sales_productId_fkey";

-- AlterTable
ALTER TABLE "sales" DROP COLUMN "clientId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- RenameForeignKey
ALTER TABLE "sales" RENAME CONSTRAINT "sales_product_fkey" TO "sales_productId_fkey";

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
