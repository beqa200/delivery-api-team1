import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getOrders = async (req, res) => {
  try {
    const orders =
      req.user.id === 1
        ? await prisma.orders.findMany()
        : await prisma.orders.findMany({
            where: {
              courier_id: req.user.id,
            },
          });
    res
      .status(200)
      .json({ message: "Orders fetched successfully", data: orders });
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

export const createOrder = async (req, res) => {
  const { order_price, delivery_price } = req.body;
  try {
    const order = await prisma.orders.create({
      data: {
        ...req.body,
        sum: order_price + delivery_price,
      },
    });
    res
      .status(201)
      .json({ message: "Order created successfully", data: order });
  } catch (error) {
    res.status(500).json({ error: "Error creating order" });
  }
};
