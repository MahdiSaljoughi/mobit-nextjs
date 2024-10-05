import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";
const jwt = require("jsonwebtoken");

interface ILoginBody {
  phone: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const data: ILoginBody = await request.json();
    if (!data.phone || !data.password)
      return NextResponse.json({
        message: "please fill all the fields",
        status: 204,
      });

    const user = await prismadb.user.findUnique({
      where: {
        phone: data.phone,
      },
    });

    if (!user)
      return NextResponse.json({ message: "user not found", status: 404 });
    const valid = await bcrypt.compare(data.password, user.password);

    if (!valid)
      return NextResponse.json({
        message: "hashedPassword not valid",
        status: 404,
      });

    const tokenData = {
      id: user.id,
    };

    const token = jwt.sign(tokenData, "my secret", {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Token set in cookie",
      status: 201,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 86400,
    });

    return NextResponse.json({
      message: "user logged in successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}
