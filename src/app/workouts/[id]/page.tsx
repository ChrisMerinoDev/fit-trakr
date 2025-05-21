import dbConnect from '../../../../lib/mongoose';
import Workout from '../../../../models/workout.model';
import { getAuthUser } from '../../../../lib/auth';
import { notFound } from 'next/navigation';
import { PageProps } from '@/types';
import { WorkoutDetailClient } from './WorkoutDetailClient';

export default async function WorkoutDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  await dbConnect();
  const user = await getAuthUser();

  if ('error' in user) return notFound();

  const workout = await Workout.findOne({
    _id: resolvedParams.id,
    createdBy: user.userId,
  });

  if (!workout) return notFound();

  return (
    <div>
      <WorkoutDetailClient
        workout={{
          id: workout._id.toString(),
          title: workout.title,
          exercises: workout.exercises,
        }}
      />
    </div>
  );
}
