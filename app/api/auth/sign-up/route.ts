import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import bcrypt from "bcrypt";

interface IRegisterBody {
  password: string;
  phone: string;
}

export async function POST(request: Request) {
  try {
    const data: IRegisterBody = await request.json();
    if (!data.phone || !data.password) {
      return NextResponse.json({
        message: "please fill all the fields",
      });
    }
    const user = await prisma.user.findFirst({
      where: {
        phone: data.phone,
      },
    });
    if (user) return NextResponse.json({ message: "user already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newUser = await prisma.user.create({
      data: {
        phone: data.phone,
        password: hashedPassword,
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
