'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ROUTES from '../../constants/routes';

export const SeeWorkouts = () => {
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => router.push(ROUTES.WORKOUTS)}
        className="bg-rose-600 hover:bg-rose-700 text-white cursor-pointe shadow-sm  hover:cursor-pointer py-5 px-10 rounded-xl"
      >
        <div className="flex hover:animate-pulse">
          <Image
            src="/Icons/SeeWorkouts.svg"
            alt="Progress-Icon"
            height={30}
            width={30}
            priority
            quality={100}
          />
          <div className="ml-2">
            <p>
              <span className="text-white text-xl">See all Workouts</span>
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};
