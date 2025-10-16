'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { deletePost } from '@/app/actions'

export default function PostActions({ post }: { post: { id: string; authorId: string } }) {
  const { data: session } = useSession()

  if (session?.user?.id !== post.authorId) {
    return null
  }

  return (
    <div className="flex items-center space-x-4 mt-8">
      <Link href={`/edit-post/${post.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Edit Post</Link>
      <form action={deletePost}>
        <input type="hidden" name="id" value={post.id} />
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete Post</button>
      </form>
    </div>
  )
}
