import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismadb from "@/lib/prisma";

export async function GET() {
  return NextResponse.json({
    msg: "User Api GET",
  });
}

export async function POST(request: Request) {
  try {
    const { password, phone, userName, email } = await request.json();

    if (!password || !phone || !userName || !email) {
      return NextResponse.json({
        message: "لطفا تمام فیلد ها را پرکنید",
        messageEng: "Please fill all the fields",
        status: 204,
      });
    }

    // Check if the user already exists
    const userPhone = await prismadb.user.findUnique({
      where: {
        phone,
      },
    });
    const userEmail = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    const UserName = await prismadb.user.findUnique({
      where: {
        userName,
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
    if (userEmail) {
      return NextResponse.json({
        message: "حساب کاربری با این ایمیل از قبل وجود دارد",
        messageEng: "user exists - email",
        status: 409,
      });
    }
    if (UserName) {
      return NextResponse.json({
        message: "این نام کاربری از قبل انتخاب شده است",
        messageEng: "user exists - userName",
        status: 409,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prismadb.user.create({
      data: {
        password: hashedPassword,
        phone,
        email,
        userName,
      },
    });

    if (newUser) {
      return NextResponse.json({
        message: "کاربر با موفقیت ایجاد شد",
        messageEng: `User ${newUser.email} created successfully!`,
        status: 201,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "خطای سرور",
      messageEng: "Internal server error",
      status: 500,
      err: error,
    });
  } finally {
    await prismadb.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    // استخراج داده‌ها از بدنه درخواست
    const {
      id,
      email,
      userName,
      firstName,
      lastName,
      phone,
      role,
      emailVerified,
    } = await request.json();

    // بررسی وجود ID
    if (!id) {
      return NextResponse.json({
        message: "آیدی الزامی است",
        messageEng: "ID is required",
        status: 400,
      });
    }

    if (
      !email || !userName || !firstName || !lastName || !phone || !role
    ) {
      return NextResponse.json({
        message: "لطفا تمام فیلد ها را پر کنید",
        messageEng: "Please fill in all fields",
        status: 400,
      });
    }

    // انجام عملیات به‌روزرسانی (مثلاً از پایگاه داده)
    const updatedUser = await prismadb.user.update({
      where: {
        id,
      },
      data: {
        id,
        email,
        userName,
        firstName,
        lastName,
        phone,
        role,
        emailVerified: Boolean(emailVerified),
      },
    });

    if (updatedUser) {
      return NextResponse.json({
        message: "کاربر با موفقیت ویرایش شد",
        messageEng: "",
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: "کاربر یافت نشد",
        messageEng: "User not found",
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({
      message: "خطای سرور",
      messageEng: "Internal Server Error",
      status: 500,
    });
  } finally {
    await prismadb.$disconnect(); // قطع اتصال به پایگاه داده
  }
}

export async function DELETE(request: Request) {
  try {
    // استخراج ID از URL یا body درخواست
    const { id } = await request.json(); // فرض بر این است که ID در بدنه درخواست ارسال می‌شود

    if (!id) {
      return NextResponse.json({
        message: "آیدی الزامی است",
        messageEng: "ID is required",
        status: 400,
      });
    }

    // انجام عملیات حذف (مثلاً از پایگاه داده)
    // فرض کنید که شما یک تابع deleteProduct دارید که محصول را حذف می‌کند
    const result = await prismadb.user.delete({
      where: {
        id,
      },
    });

    if (result) {
      return NextResponse.json({
        message: "کاربر با موفقیت حذف شد",
        messageEng: "User deleted successfully",
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: "کاربر یافت نشد",
        messageEng: "User not found",
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({
      message: "خطای سرور",
      messageEng: "Internal Server Error",
      status: 500,
    });
  } finally {
    await prismadb.$disconnect(); // قطع اتصال به پایگاه داده
  }
}
