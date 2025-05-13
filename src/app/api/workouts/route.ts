import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongoose';
import Workout from '../../../../models/workout.model';
import { WorkoutSchema } from '../../../../lib/validations';

// Create a new Workout
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Zod validation
    const parsed = WorkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { title, exercises } = parsed.data;

    await dbConnect();

    const newWorkout = await Workout.create({
      title,
      exercises,
    });

    return NextResponse.json({
      message: 'Workout created Successfully',
      workout: {
        id: newWorkout._id,
        title: newWorkout.title,
        exercises: newWorkout.exercises,
      },
    });
  } catch (error) {
    console.error('Failed to create new Workout', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
