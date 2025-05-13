'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (res.ok) {
      localStorage.removeItem('token');
      router.push('/login');
      toast.success('Logged out successfully!');
    } else {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <button className="button" onClick={handleLogout}>
      Logout
    </button>
  );
}
