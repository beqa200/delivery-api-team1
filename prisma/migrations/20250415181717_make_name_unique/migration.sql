/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `statuses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "statuses_name_key" ON "statuses"("name");
