import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongoose';
import Workout from '../../../../models/workout.model';
import { WorkoutSchema } from '../../../../lib/validations';
import { getAuthUser } from '../../../../lib/auth';

// Create a new Workout
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = WorkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { title, exercises } = parsed.data;

    await dbConnect();

    const user = await getAuthUser();
    if ('error' in user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const newWorkout = await Workout.create({
      title,
      exercises,
      createdBy: user.userId, // 🛠️ Link workout to user
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

// View all Workouts
export async function GET() {
  try {
    await dbConnect();
    const user = await getAuthUser();
    console.log('[AUTH USER]', user); // 👈 log here

    if ('error' in user) {
      console.log('[AUTH ERROR]');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const workouts = await Workout.find({ createdBy: user.userId }).sort({
      createdAt: -1,
    });

    const formattedWorkouts = workouts.map((w) => ({
      id: w._id.toString(),
      title: w.title,
    }));

    return NextResponse.json({ workouts: formattedWorkouts });
  } catch (error) {
    console.error('Failed to fetch workouts', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
