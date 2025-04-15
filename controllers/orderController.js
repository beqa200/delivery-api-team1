import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role == "admin") {
      orders = await prisma.orders.findMany();
    } else if (req.user.role == "courier") {
      orders = await prisma.orders.findMany({
        where: {
          courier_id: req.user.id,
        },
      });
    } else if (req.user.role == "store") {
      orders = await prisma.orders.findMany({
        where: {
          status_id: 3,
        },
      });
    }
    res
      .status(200)
      .json({ message: "Orders fetched successfully", data: orders });
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const statusRecord = await prisma.statuses.findUnique({
    where: {
      name: status,
    },
  });

  if (!statusRecord) {
    return res.status(404).json({ error: "Status not found" });
  }

  try {
    const order = await prisma.orders.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status_id: statusRecord.id,
      },
    });
    res
      .status(200)
      .json({ message: "Order updated successfully", data: order });
  } catch (error) {
    res.status(500).json({ error: "Error updating order" });
  }
};
export const changeCourier = async (req, res) => {
  const { id } = req.params;
  const { courier_id } = req.body;

  try {
    const order = await prisma.orders.update({
      where: {
        id: parseInt(id),
      },
      data: {
        courier_id,
      },
    });
    res
      .status(200)
      .json({ message: "Courier changed successfully", data: order });
  } catch (error) {
    res.status(500).json({ error: "Error changing courier" });
  }
};
export const createOrder = async (req, res) => {
  const { order_price, delivery_price } = req.body;
  try {
    const order = await prisma.orders.create({
      data: {
        ...req.body,
        sum: order_price + delivery_price,
        status_id: 4,
      },
    });
    res
      .status(201)
      .json({ message: "Order created successfully", data: order });
  } catch (error) {
    res.status(500).json({ error: "Error creating order" });
  }
};
