'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ROUTES from '../../constants/routes';

export const ProgressCheck = () => {
  const router = useRouter();
  return (
    <div className="flex">
      <button
        onClick={() => router.push(ROUTES.PROGRESS)}
        className="bg-rose-600 hover:bg-rose-700 text-white cursor-pointer shadow-sm  hover:cursor-pointer py-5 px-6 rounded-xl"
      >
        <div className="flex hover:animate-pulse">
          <Image
            src="/Icons/Progress2.svg"
            alt="Progress-Icon"
            height={30}
            width={30}
          />
          <div className="ml-2">
            <p>
              <span className="text-white text-xl">Check your Progress</span>
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};
