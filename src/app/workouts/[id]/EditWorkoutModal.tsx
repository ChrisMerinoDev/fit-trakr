'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Workout = {
  id: string; // must be mapped correctly from `_id` in server
  title: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
  }[];
};

type Props = {
  workout: Workout;
  onClose: () => void;
};

export function EditWorkoutModal({ workout, onClose }: Props) {
  const [title, setTitle] = useState(workout.title);
  const [exercises, setExercises] = useState([...workout.exercises]);
  const [loading, setLoading] = useState(false);
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
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!workout.id) {
      toast.error('Workout ID is missing');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/workouts/${workout.id}`, {
        method: 'PUT', // or PATCH if you prefer partial updates
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, exercises }),
      });

      if (!res.ok) throw new Error('Failed to update workout');

      toast.success('Workout updated');
      onClose();
      router.refresh(); // reload current page with updated data
    } catch (error) {
      toast.error('Error updating workout');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xl bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl">
        <h2 className="text-xl font-semibold mb-4 text-rose-600">
          Edit current workout
        </h2>

        <input
          type="text"
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
              className="text-red-500 text-sm hover:underline mt-1"
            >
              Remove Exercise
            </button>
          </div>
        ))}

        <button
          onClick={handleAddExercise}
          className="text-blue-600 hover:underline text-sm mb-4"
        >
          + Add another exercise
        </button>

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
