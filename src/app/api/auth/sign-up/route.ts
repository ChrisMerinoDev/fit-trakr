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

    // Trim input before validating
    const parsed = AccountSchema.safeParse({
      name: body.name?.trim(),
      username: body.username?.trim(),
      email: body.email?.trim(),
      password: body.password,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
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
        {
          error: {
            username: ['Username or email already in use.'],
            email: ['Username or email already in use.'],
          },
        },
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
      token,
    });
  } catch (error) {
    console.error('Sign-up error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
