import { PrismaClient } from "@prisma/client";
import xlsx from "xlsx";
import fs from "fs";
import path from "path";

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
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.orders.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res
      .status(200)
      .json({ message: "Order fetched successfully", data: order });
  } catch (error) {
    res.status(500).json({ error: "Error fetching order" });
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
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.orders.update({
      where: {
        id: parseInt(id),
      },
      data: req.body,
    });
    res
      .status(200)
      .json({ message: "Order updated successfully", data: order });
  } catch (error) {
    res.status(500).json({ error: "Error updating order" });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.orders.delete({
      where: {
        id: parseInt(id),
      },
    });
    res
      .status(200)
      .json({ message: "Order deleted successfully", data: order });
  } catch (error) {
    res.status(500).json({ error: "Error deleting order" });
  }
};

export const uploadOrderExcel = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const workbook = xlsx.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  const orders = data.map((item) => ({
    city: item.city,
    customer: item.customer,
    mobile: item.mobile,
    address: item.address,
    comment: item.comment,
    order_price: item.order_price,
    delivery_price: item.delivery_price,
    sum: parseInt(item.order_price) + parseInt(item.delivery_price),
    courier_id: item.courier_id,
    status_id: item.status_id,
  }));
  const createdOrders = await prisma.orders.createMany({
    data: orders,
  });
  res.status(201).json({
    message: "Orders uploaded successfully",
    data: createdOrders,
  });
  const filePath = path.join(__dirname, "..", "uploads", req.file.filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
};
