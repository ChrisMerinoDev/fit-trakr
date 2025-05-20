// app/workouts/[id]/page.tsx (Server Component)
import { notFound } from 'next/navigation';
import { WorkoutDetailClient } from './WorkoutDetailClient';

type Workout = {
  id: string;
  title: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
  }[];
};

type Params = {
  params: {
    id: string;
  };
};

export default async function WorkoutDetailPage({ params }: Params) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/workouts/${id}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) notFound();

  const data = await res.json();
  const workout: Workout = {
    id: data.workout._id, // ✅ map _id to id
    title: data.workout.title,
    exercises: data.workout.exercises,
  };

  return (
    <div>
      <div>
        <WorkoutDetailClient workout={workout} />
      </div>
    </div>
  );
}
