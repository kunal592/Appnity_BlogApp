'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createComment } from '@/app/actions'
import { useSession } from 'next-auth/react'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
    >
      {pending ? 'Submitting...' : 'Submit Comment'}
    </button>
  )
}

export default function CommentForm({ postId }: { postId: string }) {
  const { data: session } = useSession()
  const [state, formAction] = useFormState(createComment.bind(null, postId), { message: null, errors: {} })

  if (!session) {
    return (
      <div className="text-center bg-gray-100 p-8 rounded-lg">
        <p className="text-gray-600">You must be logged in to leave a comment.</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div>
        <label htmlFor="comment" className="block text-lg font-medium text-gray-800 mb-2">Leave a Comment</label>
        <textarea
          id="comment"
          name="content"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
        {state.errors?.content && <p className="text-red-500 mt-2">{state.errors.content[0]}</p>}
      </div>
      <SubmitButton />
      {state.message && state.message !== 'Comment created successfully' && <p className="text-red-500 mt-4 text-center">{state.message}</p>}
    </form>
  )
}
