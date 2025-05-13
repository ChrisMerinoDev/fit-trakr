'use client';

export const AddWorkout = () => {
  const handleClick = () => {};

  return (
    <div>
      <button
        onClick={handleClick}
        className="text-rose-500 bg-zinc-100 shadow-sm hover:bg-zinc-200 hover:cursor-pointer py-4 px-4"
      >
        <div>
          <div className="hover:animate-spin">
            <span className="text-6xl font-bold">+</span>
          </div>
          <div>
            <span className="text-md">Create a new Workout</span>
          </div>
        </div>
      </button>
    </div>
  );
};
