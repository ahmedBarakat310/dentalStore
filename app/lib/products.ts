"use server";

import { prisma } from "./db";


// جلب كل المنتجات
export async function getProducts() {
const products = await prisma.product.findMany();
return products;
}

// // جلب منتج واحد بالـ ID
// export async function getProductById(id: number) {
//   return await prisma.product.findUnique({
//     where: { id },
//   });
// }

// // جلب منتجات بفلتر كاتيجوري
// export async function getProductsByCategory(category: string) {
//   return await prisma.product.findMany({
//     where: { category },
//     orderBy: { createdAt: "desc" },
//   });
// }

// // ==============================
// // ➕ CREATE
// // ==============================

export async function createProduct(formData: FormData) {
  const name        = formData.get("name") as string;
  const price       = parseFloat(formData.get("price") as string);
  const stock       = parseInt(formData.get("stock") as string);
  const category    = formData.get("category") as string;
  const description = formData.get("description") as string;
  const image       = formData.get("image") as string;

  await prisma.product.create({
    data: { name, price, stock, category, description, image },
  });

  
}


// // ==============================
// // ✏️ UPDATE
// // ==============================

// export async function updateProduct(id: number, formData: FormData) {
//   const name        = formData.get("name") as string;
//   const price       = parseFloat(formData.get("price") as string);
//   const stock       = parseInt(formData.get("stock") as string);
//   const category    = formData.get("category") as string;
//   const description = formData.get("description") as string;
//   const image       = formData.get("image") as string;

//   await prisma.product.update({
//     where: { id },
//     data: { name, price, stock, category, description, image },
//   });

//   revalidatePath("/admin/dashboard/products");
//   revalidatePath("/");
//   redirect("/admin/dashboard/products");
// }

// // ==============================
// // 🗑️ DELETE
// // ==============================

// export async function deleteProduct(id: number) {
//   await prisma.product.delete({ where: { id } });
//   revalidatePath("/admin/dashboard/products");
//   revalidatePath("/");
// }