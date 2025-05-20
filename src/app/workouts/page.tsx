import dbConnect from '../../../lib/mongoose';
import Workout from '../../../models/workout.model';
import { getAuthUser } from '../../../lib/auth';
import Link from 'next/link';
import ROUTES from '../../../constants/routes';

export default async function WorkoutsPage() {
  await dbConnect();
  const user = await getAuthUser();

  if ('error' in user) {
    return <p className="text-center text-red-500 mt-10">Unauthorized</p>;
  }

  const workouts = await Workout.find({ createdBy: user.userId }).sort({
    createdAt: -1,
  });

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-rose-600 mb-6 text-center">
        My Workouts
      </h1>
      {workouts.length === 0 ? (
        <p className="text-gray-600 text-center">No workouts found.</p>
      ) : (
        <ul className="space-y-4">
          {workouts.map((workout) => (
            <li
              key={workout._id.toString()}
              className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-stone-700">{workout.title}</p>
                <Link
                  href={`/workouts/${workout._id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="w-full mt-8 flex justify-center">
        <Link href={ROUTES.DASHBOARD}>
          <button className="bg-stone-200 text-stone-700 px-4 py-2 rounded hover:bg-stone-300 hover:text-black transition cursor-pointer">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </main>
  );
}
