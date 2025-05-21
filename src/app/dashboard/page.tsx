import { getAuthUser } from '../../../lib/auth';
import { redirect } from 'next/navigation';
import { AddWorkout } from '@/components/AddWorkout';
import { SeeWorkouts } from '@/components/SeeWorkouts';
import { ProgressCheck } from '@/components/ProgressCheck';
import LogoutButton from '@/components/LogoutButton';
import Image from 'next/image';

export default async function DashboardPage() {
  const user = await getAuthUser();

  if ('error' in user) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen w-full bg-zinc-50 px-4 py-8 flex justify-center items-start">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 mt-10">
        <h1 className="text-xl font-semibold text-center text-shadow-lg">
          Welcome, <span className="text-rose-500">{user.username}!</span>
        </h1>

        <p className="text-center mt-4 text-gray-600">Select one option:</p>

        <div className="flex flex-col items-center gap-6 mt-6">
          <AddWorkout />
          <SeeWorkouts />
          <ProgressCheck />
          <LogoutButton />
        </div>
      </section>
    </main>
  );
}
