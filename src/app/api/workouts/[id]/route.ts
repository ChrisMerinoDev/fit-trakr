import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/mongoose';
import Workout from '../../../../../models/workout.model';
import { WorkoutSchema } from '../../../../../lib/validations';

// GET /api/workouts/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const workout = await Workout.findById(params.id);

    if (!workout) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }

    return NextResponse.json({ workout });
  } catch (error) {
    console.error('Failed to fetch workout:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PUT /api/workouts/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const parsed = WorkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    await dbConnect();

    const updatedWorkout = await Workout.findByIdAndUpdate(
      params.id,
      { ...parsed.data },
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
    console.error('Failed to update workout:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/workouts/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const deleted = await Workout.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Failed to delete workout:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
