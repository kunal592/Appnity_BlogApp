import prisma from '@/lib/prisma'
import Image from 'next/image'

export default async function CommentList({ postId }: { postId: string }) {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (comments.length === 0) {
    return <p className="text-center text-gray-500 mt-8">No comments yet.</p>
  }

  return (
    <div className="space-y-8 mt-12">
      <h2 className="text-3xl font-bold text-gray-900">Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4 mb-4">
            {comment.author?.image && <Image width={48} height={48} src={comment.author.image} alt={comment.author.name ?? ''} className="w-12 h-12 rounded-full" />}
            <div>
              <p className="font-semibold text-gray-800">{comment.author?.name}</p>
              <p className="text-gray-600">{new Date(comment.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <p className="text-gray-700">{comment.content}</p>
        </div>
      ))}
    </div>
  )
}
