import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/mongoose';
import Workout from '../../../../../models/workout.model';
import { WorkoutSchema } from '../../../../../lib/validations';
import { getAuthUser } from '../../../../../lib/auth';

export const dynamic = 'force-dynamic';

// GET /api/workouts/[id]
export async function GET(req: NextRequest, context: unknown) {
  const { params } = context as { params: { id: string } };
  const id = params.id;

  try {
    await dbConnect();
    const user = await getAuthUser();

    if ('error' in user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const workout = await Workout.findOne({
      _id: id,
      createdBy: user.userId,
    });

    if (!workout) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }

    return NextResponse.json({ workout });
  } catch (error) {
    console.error('[GET WORKOUT ERROR]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PUT /api/workouts/[id]
export async function PUT(req: NextRequest, context: unknown) {
  const { params } = context as { params: { id: string } };
  const id = params.id;

  try {
    const user = await getAuthUser();

    if ('error' in user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = WorkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    await dbConnect();

    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: id, createdBy: user.userId },
      parsed.data,
      { new: true }
    );

    if (!updatedWorkout) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Workout updated successfully',
      workout: updatedWorkout,
    });
  } catch (error) {
    console.error('[UPDATE WORKOUT ERROR]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/workouts/[id]
export async function DELETE(req: NextRequest, context: unknown) {
  const { params } = context as { params: { id: string } };
  const id = params.id;

  try {
    await dbConnect();
    const user = await getAuthUser();

    if ('error' in user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const deleted = await Workout.findOneAndDelete({
      _id: id,
      createdBy: user.userId,
    });

    if (!deleted) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('[DELETE WORKOUT ERROR]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
