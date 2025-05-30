import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

async function main() {
  // Create categories
  const roles = await prisma.roles.createMany({
    data: [
      {
        id: 1,
        name: "admin",
      },
      {
        id: 2,
        name: "courier",
      },
      {
        id: 3,
        name: "store",
      },
    ],
  });
  const statuses = await prisma.statuses.createMany({
    data: [
      {
        id: 1,
        name: "Delivered",
      },
      {
        id: 2,
        name: "Denied once",
      },
      {
        id: 3,
        name: "Denied twice",
      },
      {
        id: 4,
        name: "To deliver",
      },
    ],
  });
  const users = await prisma.users.createMany({
    data: [
      {
        name: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("admin123", 10),
        roleId: 1,
      },
      {
        name: "nika",
        email: "nika@gmail.com",
        password: bcrypt.hashSync("nika123", 10),
        roleId: 2,
      },
      {
        name: "luka",
        email: "luka@gmail.com",
        password: bcrypt.hashSync("luka123", 10),
        roleId: 2,
      },
    ],
  });
  // Create orders and connect to categories
  await prisma.orders.createMany({
    data: [
      {
        city: "tbilisi",
        customer: "John Doe",
        mobile: "+995 555 123456",
        address: "123 Main St",
        comment: "Leave at the door",
        order_price: 100,
        delivery_price: 5,
        sum: 105,
        courier_id: 2,
        status_id: 1,
      },
      {
        city: "gori",
        customer: "nika",
        mobile: "+995 555 123456",
        address: "321 Main St",
        comment: "Leave at the door",
        order_price: 32,
        delivery_price: 12,
        sum: 44,
        courier_id: 2,
        status_id: 2,
      },
      {
        city: "batumi",
        customer: "luka",
        mobile: "+995 555 123456",
        address: "batumi Main St",
        comment: "Leave at the door",
        order_price: 300,
        delivery_price: 50,
        sum: 350,
        courier_id: 3,
        status_id: 3,
      },
      {
        city: "batumi",
        customer: "luka",
        mobile: "+995 555 123456",
        address: "batumi Main St",
        comment: "Leave at the door",
        order_price: 300,
        delivery_price: 50,
        sum: 350,
        courier_id: 3,
        status_id: 4,
      },
    ],
  });
  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
