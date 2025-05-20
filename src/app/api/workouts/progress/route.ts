import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/mongoose';
import Workout from '../../../../../models/workout.model';
import { getAuthUser } from '../../../../../lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const user = await getAuthUser();

    if ('error' in user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const total = await Workout.countDocuments({ createdBy: user.userId });
    const latest = await Workout.findOne({ createdBy: user.userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      totalWorkouts: total,
      latestTitle: latest?.title || null,
    });
  } catch (error) {
    console.error('Failed to load progress:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
