'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import ROUTES from '../../../constants/routes';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    type SignUpResponse = {
      token: string;
      user: {
        id: string;
        username: string;
        email: string;
      };
      message: string;
      error?: string;
    };

    const data: SignUpResponse = await res.json();

    if (!res.ok) {
      toast.error(data.error || 'Something went wrong');
      return;
    }

    toast.success('Account created!');
    localStorage.setItem('token', data.token);
    router.push(ROUTES.LOGIN);
  };

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="mb-6 text-center">Sign Up</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-md font-medium text-slate-700 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md bg-slate-100 text-black focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-md font-medium text-slate-700 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md bg-slate-100 text-black focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-md font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md bg-slate-100 text-black focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-md font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="•••••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md bg-slate-100 text-black focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <button type="submit" className="w-full mt-4 button">
            Create account
          </button>

          <p className="text-center mt-4">
            Already have an account?
            <a
              href="/login"
              className="ml-2 text-rose-600 hover:underline font-medium"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
