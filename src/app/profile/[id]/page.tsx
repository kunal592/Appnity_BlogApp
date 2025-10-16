import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const prisma = new PrismaClient()

async function getUserProfile(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      posts: {
        where: { status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
  if (!user) {
    notFound()
  }
  return user
}

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const user = await getUserProfile(params.id)

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-8 mb-12">
          <Image src={user.image || '/avatar-placeholder.png'} alt={user.name || 'User'} width={150} height={150} className="rounded-full" />
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 text-lg mt-2">{user.email}</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-8">Posts by {user.name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {user.posts.map(post => (
            <Link key={post.id} href={`/post/${post.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                    {post.thumbnail && <Image src={post.thumbnail} alt={post.title} width={400} height={225} className="w-full h-48 object-cover" />} 
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{post.title}</h3>
                        <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                    </div>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
