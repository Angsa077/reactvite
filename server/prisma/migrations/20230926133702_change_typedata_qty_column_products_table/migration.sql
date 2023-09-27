/*
  Warnings:

  - You are about to alter the column `qty` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Int`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `qty` INTEGER NOT NULL;
