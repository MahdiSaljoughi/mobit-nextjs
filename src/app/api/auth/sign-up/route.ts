import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import bcrypt from "bcrypt";

interface IRegisterBody {
  phone: string;
  userName: string;
  password: string;
}

export async function POST(request: Request) {
  const data: IRegisterBody = await request.json();

  try {
    if (!data.phone || !data.password) {
      return NextResponse.json({
        message: "لطفا تمام فیلد ها را پرکنید",
        messageEng: "Please fill all the fields",
        status: 204,
      });
    }

    const userPhone = await prisma.user.findUnique({
      where: {
        phone: data.phone,
      },
    });
    const userName = await prisma.user.findUnique({
      where: {
        user_name: data.userName,
      },
    });

    if (userPhone) {
      return NextResponse.json({
        message: "حساب کاربری با این شماره از قبل وجود دارد",
        messageEng: "user exists - phone",
        status: 409,
      });
    }
    if (userName) {
      return NextResponse.json({
        message: "این نام کاربری از قبل انتخاب شده است",
        messageEng: "user exists - userName",
        status: 409,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = await prisma.user.create({
      data: {
        phone: data.phone,
        user_name: data.userName,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "حساب کاربری با موفقیت ایجاد شد",
      messageEng: "User create sucssesfull",
      status: 201,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "خطای سرور",
      messageEng: "Internal server error",
      status: 500,
      err: error,
    });
  }
}
