import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface IRegisterBody {
  email: string;
  hashedPassword: string;
  user_name: string;
}

export async function POST(request: Request) {
  try {
    const data: IRegisterBody = await request.json();
    if (!data.email || !data.hashedPassword || !data.user_name) {
      return NextResponse.json({
        message: "please fill all the fields",
      });
    }
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (user) return NextResponse.json({ message: "user already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.hashedPassword, salt);
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        hashedPassword: hashedPassword,
        user_name: data.user_name,
      },
    });
    return NextResponse.json({
      message: "user created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
