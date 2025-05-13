import LogoutButton from '@/components/LogoutButton';
import { getAuthUser } from '../../../lib/auth';
import { redirect } from 'next/navigation';
import { AddWorkout } from '@/components/AddWorkout';

export default async function DashboardPage() {
  const user = await getAuthUser();

  if ('error' in user) {
    redirect('/login');
  }

  return (
    <main className="w-screen h-screen bg-stone-50">
      <div className="py-20">
        <h1 className="flex justify-center items-center text-shadow-lg">
          Welcome back,
          <span className="text-rose-600 text-shadow-lg ml-3">
            {user.username}!
          </span>
        </h1>
        <div className="flex space-x-6 justify-center gap-2 mt-10">
          <AddWorkout />
          {/* <LogoutButton /> */}
        </div>
        {/* Create a New Workout box option */}
        {/* See all the workouts you've created below */}
      </div>
    </main>
  );
}
