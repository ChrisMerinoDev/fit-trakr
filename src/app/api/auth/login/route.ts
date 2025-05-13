import { NextResponse } from 'next/server';
import { LoginSchema } from '../../../../../lib/validations';
import dbConnect from '../../../../../lib/mongoose';
import userModel from '../../../../../models/user.model';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../../../lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    await dbConnect();

    const normalizedEmail = email.toLowerCase();

    const existingUser = await userModel.findOne({ email: normalizedEmail });
    if (!existingUser) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // ✅ Sign the JWT
    const token = signToken({
      id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
    });

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Log in error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
