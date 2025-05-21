// (Server Component)
import { notFound } from 'next/navigation';
import { WorkoutDetailClient } from './WorkoutDetailClient';
import { PageProps } from '@/types';

export default async function WorkoutDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/workouts/${resolvedParams.id}`,
    { cache: 'no-store' }
  );

  if (!res.ok) return notFound();

  const data = await res.json();
  const workout = {
    id: data.workout._id,
    title: data.workout.title,
    exercises: data.workout.exercises,
  };

  return (
    <div>
      <WorkoutDetailClient workout={workout} />
    </div>
  );
}
