'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ROUTES from '../../../constants/routes';
import { LoginSchema } from '../../../lib/validations';

type FieldErrors = Partial<Record<'email' | 'password', string[]>>;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = LoginSchema.safeParse({ email, password });

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || 'Login failed');
      return;
    }

    toast.success('Login successful!');
    router.push(ROUTES.DASHBOARD);
  };

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="mb-6 text-center">Log In</h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-md font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-md font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="•••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password[0]}</p>
            )}
          </div>

          <button type="submit" className="w-full mt-4 button">
            Log in
          </button>

          <p className="text-center mt-4">
            Don&apos;t have an account?
            <Link
              href="/sign-up"
              className="ml-2 text-rose-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
