import React, { useState } from 'react';
import { supabase } from '../services/supabase';

export default function Auth() {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert('Check your email for the magic link!');
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Sign In</h2>
        <p className="text-center text-gray-600 mb-6">
            Enter your email to receive a magic link to sign in to the admin dashboard.
        </p>
        <form onSubmit={handleSignIn}>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 sr-only">
                    Email address
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-brand-green text-white py-2 px-4 rounded-md hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'পাঠানো হচ্ছে...' : 'ম্যাজিক লিঙ্ক পাঠান'}
            </button>
        </form>
    </div>
  );
}
