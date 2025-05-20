'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import Image from 'next/image';

export const AddWorkout = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [exercises, setExercises] = useState([
    { name: '', sets: '', reps: '' },
  ]);

  const router = useRouter();

  const handleExerciseChange = (
    index: number,
    field: 'name' | 'sets' | 'reps',
    value: string
  ) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  const handleAddExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '' }]);
  };

  const handleRemoveExercise = (index: number) => {
    const updated = exercises.filter((_, i) => i !== index);
    setExercises(updated);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, exercises }),
      });

      if (!res.ok) throw new Error('Failed to create workout');

      const data = await res.json();
      toast.success(`Workout created: ${data.workout.title}`);
      setShowModal(false);
      setTitle('');
      setExercises([{ name: '', sets: '', reps: '' }]);
      router.push(`/workouts/${data.workout.id}`);
    } catch (error) {
      toast.error('Failed to create workout');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        disabled={loading}
        className="bg-rose-600 hover:bg-rose-700 text-white shadow-sm py-5 px-6 rounded-xl cursor-pointer"
      >
        <div className="flex hover:animate-pulse">
          <Image
            src="/Icons/Add.svg"
            width={30}
            height={30}
            alt="Add-Workout"
          />

          <div className="ml-2">
            <span className="text-xl">
              {loading ? 'Creating...' : 'Create new Workout'}
            </span>
          </div>
        </div>
      </button>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-xl bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl">
            <h2 className="text-xl font-semibold mb-4">New Workout</h2>

            <input
              type="text"
              placeholder="Workout Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded-md border border-gray-300"
            />

            {exercises.map((exercise, index) => (
              <div key={index} className="mb-4 space-y-2 border p-3 rounded-md">
                <input
                  type="text"
                  placeholder="Exercise Name"
                  value={exercise.name}
                  onChange={(e) =>
                    handleExerciseChange(index, 'name', e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-md border border-gray-300"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Sets"
                    value={exercise.sets}
                    onChange={(e) =>
                      handleExerciseChange(index, 'sets', e.target.value)
                    }
                    className="w-1/2 px-4 py-2 rounded-md border border-gray-300"
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    value={exercise.reps}
                    onChange={(e) =>
                      handleExerciseChange(index, 'reps', e.target.value)
                    }
                    className="w-1/2 px-4 py-2 rounded-md border border-gray-300"
                  />
                </div>
                <button
                  onClick={() => handleRemoveExercise(index)}
                  className="text-red-500 text-sm hover:underline mt-1 cursor-pointer"
                >
                  Remove Exercise
                </button>
              </div>
            ))}

            <button
              onClick={handleAddExercise}
              className="text-blue-600 hover:underline text-sm mb-4 cursor-pointer"
            >
              + Add another exercise
            </button>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded cursor-pointer"
              >
                {loading ? 'Saving...' : 'Save Workout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
