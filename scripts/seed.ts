const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Mathematics" },
        { name: "Physics" },
        { name: "Statistics" },
        { name: "Software Engineering" },
      ],
    });
    console.log("Seeding successful!");
  } catch (error) {
    console.log("Error seeding database categories: ", error);
  } finally {
    await database.$disconnect();
  }
}

main();
