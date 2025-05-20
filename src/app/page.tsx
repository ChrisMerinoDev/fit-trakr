import Link from 'next/link';
import ROUTES from '../../constants/routes';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="w-screen h-screen bg-stone-50">
      <div className="flex justify-center h-full w-full items-center">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/Icons/Exercise2.svg"
            width={32}
            height={32}
            alt="App-Icon"
            className="mb-4 animate-spin"
            style={{ animationDuration: '3s' }}
          />
          <h1>Fit Trakr</h1>
          <p className="mt-2">
            Build your own workouts & track your progress in real-time.
          </p>
          <div className="flex justify-center">
            <Link href={ROUTES.SIGN_UP}>
              <button className="button">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
