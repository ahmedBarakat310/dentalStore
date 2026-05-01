import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: "tools", label: "أدوات", icon: "🔧" },
  { name: "materials", label: "مواد", icon: "🧪" },
  { name: "equipment", label: "معدات", icon: "🦷" },
];

async function main() {
  await prisma.category.createMany({
    data: CATEGORIES,
    
  });

  console.log("✅ Categories seeded");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });