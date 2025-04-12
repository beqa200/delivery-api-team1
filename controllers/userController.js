import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId: 2,
      },
    });
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.users.findUnique({
    where: { email: email },
    include: { roles: true },
  });
  if (!user) {
    return res.status(500).json({ message: "incorect credentials" });
  }
  const ispasswordValid = await bcrypt.compare(password, user.password);
  if (!ispasswordValid) {
    return res.status(401).json({ message: "wrong password" });
  }
  const token = jwt.sign(
    { id: user.id, role: user.roles.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  delete user.password;
  res.json({ message: "login success", token: token, data: user });
};
