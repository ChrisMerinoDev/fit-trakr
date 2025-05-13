import Link from 'next/link';
import ROUTES from '../../constants/routes';

export default function Home() {
  return (
    <main className="w-screen h-screen bg-stone-50">
      <div className="flex justify-center h-full w-full items-center">
        <div className="flex flex-col text-center">
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
