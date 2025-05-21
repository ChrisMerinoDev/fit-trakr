import { NextResponse } from 'next/server';
import { AccountSchema } from '../../../../../lib/validations';
import dbConnect from '../../../../../lib/mongoose';
import { hashPassword } from '../../../../../lib/hash';
import userModel from '../../../../../models/user.model';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = AccountSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, username, email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    await dbConnect();

    const existingUser = await userModel.findOne({
      $or: [{ email: normalizedEmail }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username or email already in use.' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await userModel.create({
      name,
      username,
      email: normalizedEmail,
      password: hashedPassword,
    });

    // ✅ Generate a token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token, // ✅ include token
    });
  } catch (error) {
    console.error('Sign-up error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
