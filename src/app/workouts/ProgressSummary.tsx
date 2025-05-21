'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProgressSummary() {
  const [total, setTotal] = useState<number | null>(null);
  const [latest, setLatest] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProgress() {
      const res = await fetch('/api/workouts/progress');
      const data = await res.json();

      if (res.ok) {
        setTotal(data.totalWorkouts);
        setLatest(data.latestTitle);
      }
    }

    fetchProgress();
  }, []);

  if (total === null) return null; // or loading spinner

  return (
    <div>
      <div className="bg-white p-6 rounded-lg mx-4 shadow-md border border-gray-200 mt-6 text-center">
        <h2 className="text-xl font-semibold text-stone-800 mb-2">
          Your Progress
        </h2>
        <p className="text-gray-700 mb-1">
          Total workouts: <span className="font-medium">{total}</span>
        </p>
        {latest && (
          <p className="text-gray-700">
            Last workout: <span className="italic">{latest}</span>
          </p>
        )}
      </div>
      <div className="w-full mt-8 flex justify-center">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-stone-200 text-stone-700 px-4 py-2 rounded hover:bg-stone-300 hover:text-black transition cursor-pointer"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
