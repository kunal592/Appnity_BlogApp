import { getPost } from '@/lib/data'
import { notFound } from 'next/navigation'
import { auth } from "@/app/api/auth/[...nextauth]/route"
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Edit } from 'lucide-react'
import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/CommentList'

export default async function PostPage({ params }: { params: { id: string } }) {
  const session = await auth()
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <div className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2"/>
              <span>Back to Home</span>
            </div>
          </Link>
          {session?.user?.email === post.author?.email && (
            <Link href={`/posts/${post.id}/edit`}>
              <div className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Edit className="w-5 h-5 mr-2" />
                <span>Edit Post</span>
              </div>
            </Link>
          )}
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{post.title}</h1>

        <div className="flex items-center space-x-4 mb-8">
          {post.author?.image && <Image width={48} height={48} src={post.author.image} alt={post.author.name ?? ''} className="w-12 h-12 rounded-full" />}
          <div>
            <p className="font-semibold text-gray-800">{post.author?.name}</p>
            <p className="text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <hr className="my-12" />

        <CommentForm postId={post.id} />

        <CommentList postId={post.id} />
      </div>
    </div>
  )
}
