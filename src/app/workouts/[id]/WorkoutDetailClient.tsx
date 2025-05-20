'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { EditWorkoutModal } from './EditWorkoutModal';
import { DeleteConfirmModal } from './DeleteWorkoutModal';

type Workout = {
  id: string;
  title: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
  }[];
};

export function WorkoutDetailClient({ workout }: { workout: Workout }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/workouts/${workout.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete workout');

      toast.success('Workout deleted');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Error deleting workout');
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-rose-600">{workout.title}</h1>
          <div className="space-x-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-stone-200 text-stone-700 px-2 py-1 rounded hover:bg-stone-500 hover:text-white hover:cursor-pointer text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 hover:cursor-pointer text-sm"
            >
              Delete
            </button>
          </div>
        </div>

        {workout.exercises.length === 0 ? (
          <p className="text-gray-600">No exercises added yet.</p>
        ) : (
          <ul className="space-y-4">
            {workout.exercises.map((ex, index) => (
              <li
                key={index}
                className="border p-4 rounded-md bg-stone-100 text-slate-700"
              >
                <p className="font-semibold">Exercise: {ex.name}</p>
                <p>Sets: {ex.sets}</p>
                <p>Reps: {ex.reps}</p>
              </li>
            ))}
          </ul>
        )}

        {showEditModal && (
          <EditWorkoutModal
            workout={workout}
            onClose={() => setShowEditModal(false)}
          />
        )}

        {showDeleteModal && (
          <DeleteConfirmModal
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={() => {
              setShowDeleteModal(false);
              handleDelete();
            }}
          />
        )}
      </div>
      <div className="w-full mt-8 flex justify-center">
        <button
          onClick={() => router.push('/workouts')}
          className="bg-stone-200 text-stone-700 px-4 py-2 rounded hover:bg-stone-300 hover:text-black transition cursor-pointer"
        >
          Back to Workout List
        </button>
      </div>
    </main>
  );
}
