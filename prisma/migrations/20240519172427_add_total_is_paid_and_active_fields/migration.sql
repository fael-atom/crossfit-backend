/*
  Warnings:

  - You are about to drop the column `adminId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "adminId",
DROP COLUMN "status",
ADD COLUMN     "active" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "admin" INTEGER NOT NULL DEFAULT 0;
