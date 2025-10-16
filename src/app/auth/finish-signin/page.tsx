'use client'

import { useEffect, useState } from 'react';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const FinishSignIn = () => {
  const [message, setMessage] = useState('Verifying your sign-in link...');
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const email = window.localStorage.getItem('emailForSignIn');

    if (isSignInWithEmailLink(auth, window.location.href) && email) {
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn');
          setMessage('You have been successfully signed in!');
          router.push('/'); // Redirect to the homepage after successful sign-in
        })
        .catch((error) => {
          setMessage(error.message);
        });
    } else {
      setMessage('Invalid sign-in link.');
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <p className="text-center text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default FinishSignIn;
