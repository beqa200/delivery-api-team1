-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "store_id" INTEGER;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
