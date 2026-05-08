import { prisma } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // check user
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log("password input:", password);
    console.log("hashed password in DB:", user?.password);

 

    // check password

 if (!user || !(await bcrypt.compare(password, user.password))) {

  return NextResponse.json(
    { message: "Invalid credentials" },
    { status: 400 }
  );
}

    // create token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    // save token in cookie
    (await
          // save token in cookie
          cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: String(error) },
      { status: 500 }
    );
  }
}