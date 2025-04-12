-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "city" VARCHAR(255),
    "customer" VARCHAR(255),
    "mobile" VARCHAR(255),
    "address" VARCHAR(255),
    "comment" VARCHAR(255),
    "order_price" DECIMAL,
    "delivery_price" DECIMAL,
    "sum" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_key" ON "orders"("id");

