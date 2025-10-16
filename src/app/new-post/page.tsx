'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createPost } from '@/app/actions'
import { useSession } from 'next-auth/react'

const initialState = {
  message: null,
  errors: {},
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="bg-blue-500 text-white px-6 py-2 rounded-md disabled:bg-gray-400"
    >
      Create Post
    </button>
  )
}

export default function NewPost() {
  const { data: session } = useSession()
  const [state, formAction] = useFormState(createPost, initialState)

  if (!session) {
    return <div>You must be signed in to create a post.</div>
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Create a New Post</h1>
      <form action={formAction}>
        <input type="hidden" name="authorId" value={session.user.id} />
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-4 py-2 border rounded-md"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-lg font-medium mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="w-full px-4 py-2 border rounded-md"
            rows={10}
            aria-describedby="content-error"
          />
          <div id="content-error" aria-live="polite" aria-atomic="true">
            {state.errors?.content &&
              state.errors.content.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <SubmitButton />
        {state.message && (
          <p className="mt-4 text-sm text-green-500">{state.message}</p>
        )}
      </form>
    </div>
  )
}
