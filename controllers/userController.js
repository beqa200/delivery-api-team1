import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      include: {
        orders: true,
      },
    });
    res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};
