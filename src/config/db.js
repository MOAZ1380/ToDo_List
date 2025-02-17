const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // Exit the app if database connection fails
  }
}


module.exports = {
  prisma,
  connectDB,
};

