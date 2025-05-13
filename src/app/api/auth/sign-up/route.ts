import { NextResponse } from 'next/server';
import { AccountSchema } from '../../../../../lib/validations';
import dbConnect from '../../../../../lib/mongoose';
import { hashPassword } from '../../../../../lib/hash';
import userModel from '../../../../../models/user.model';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate user input
    const parsed = AccountSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, username, email, password } = parsed.data;

    await dbConnect();

    const normalizedEmail = email.toLowerCase();

    // Check for duplicates

    const existingUser = await userModel.findOne({
      $or: [{ email: normalizedEmail }, { username }],
    });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Username or email already in use.' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Save new user
    const newUser = await userModel.create({
      name,
      username,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Sign-up error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
