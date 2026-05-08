import { prisma } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
 
  try {
    const { name, email, password, phone } = await req.json();

    // check user exists
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // return NextResponse.json(
    //   { message: "Server error", error },
    //   { status: 500 }
    // );
      console.log(error); // 👈 مهم
  return NextResponse.json(
    { message: "Server error", error: String(error) },
    { status: 500 }
  );
  }
}