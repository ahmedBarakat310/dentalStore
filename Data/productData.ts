import { Product } from "@prisma/client";

  const products: Product[] = [{id: 1, name: "منتج 1", description: "وصف المنتج 1", price: 100, stock: 10, image: null, categoryId: "cat1", isActive: true, createdAt: new Date(), updatedAt: new Date()},{id: 2, name: "منتج 2", description: "وصف المنتج 2", price: 200, stock: 5, image: null, categoryId: "cat1", isActive: true, createdAt: new Date(), updatedAt: new Date()}] // جلب من الداتابيز مباشرة
