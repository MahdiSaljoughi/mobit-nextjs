import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

interface IRegisterBody {
  phone: string;
  userName: string;
  password: string;
}

export async function POST(request: Request) {
  const data: IRegisterBody = await request.json();

  try {
    // Check if required fields are filled
    if (!data.phone || !data.password) {
      return NextResponse.json({
        message: "لطفا تمام فیلد ها را پرکنید",
        messageEng: "Please fill all the fields",
        status: 204,
      });
    }

    // Check if the user already exists
    const userPhone = await prisma.user.findUnique({
      where: {
        phone: data.phone,
      },
    });
    const userName = await prisma.user.findUnique({
      where: {
        userName: data.userName,
      },
    });

    // If user exists, return a message
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
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        phone: data.phone,
        userName: data.userName, // Ensure userName is provided in the request
        password: hashedPassword,
      },
    });

    // Return success message with the new user data
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
