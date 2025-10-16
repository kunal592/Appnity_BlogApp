'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          <Link href="/">Inkwell</Link>
        </h1>
        <div className="flex items-center">
          {session ? (
            <>
              <Link
                href="/new-post"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 mr-4"
              >
                New Post
              </Link>
              <p className="mr-4 text-gray-600">
                {session.user?.name || session.user?.email}
              </p>
              <button
                onClick={() => signOut()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
