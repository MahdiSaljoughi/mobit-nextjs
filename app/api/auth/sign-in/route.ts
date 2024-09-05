import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface ILoginBody {
  email: string;
  hashedPassword: string;
}
export async function POST(request: Request) {
  try {
    const data: ILoginBody = await request.json();
    if (!data.email || !data.hashedPassword)
      return NextResponse.json({ message: "please fill all the fields" });

    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) return NextResponse.json({ message: "user not found" });
    const valid = await bcrypt.compare(
      data.hashedPassword,
      user.hashedPassword
    );
    if (!valid)
      return NextResponse.json({ message: "hashedPassword not valid" });

    const tokenData = {
      id: user.id,
    };
    const token = jwt.sign(tokenData, "my secret", {
      expiresIn: "1d",
    });
    const response = NextResponse.json({ message: "Token set in cookie" });

    // تنظیم کوکی
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 86400, // 1 day
    });
    return (
      NextResponse.json({ message: "user logged in successfully" })
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
// {
//     "email": "saljooghimahdii@gmail.com",
//     "hashedPassword": "123123123",
//     "user_name": "mahdisaljoughi",
//     "phone": "09121231234",
//     "image": "/images/test"
// }
