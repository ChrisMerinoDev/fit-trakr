import { getAuthUser } from '../../../lib/auth';
import { redirect } from 'next/navigation';
import { AddWorkout } from '@/components/AddWorkout';
import { SeeWorkouts } from '@/components/SeeWorkouts';
import { ProgressCheck } from '@/components/ProgressCheck';
import LogoutButton from '@/components/LogoutButton';

export default async function DashboardPage() {
  const user = await getAuthUser();

  if ('error' in user) {
    redirect('/login');
  }

  return (
    <main className="flex justify-center items-center w-screen h-screen bg-zinc-50">
      <section className="flex flex-col items-center">
        <div className="w-fit h-fit mt-12 shadow-lg rounded-2xl bg-white px-12 py-8">
          <div>
            <h1 className="w-full text-shadow-lg">
              Welcome,
              <span className="text-rose-500 text-shadow-lg ml-3">
                {user.username}!
              </span>
            </h1>
          </div>

          <p className="flex justify-center mt-4">Select one option:</p>

          <div className="flex flex-col items-center gap-8 mt-8 mb-6">
            <AddWorkout />
            <SeeWorkouts />
            <ProgressCheck />
            <LogoutButton />
          </div>
        </div>
      </section>
    </main>
  );
}
