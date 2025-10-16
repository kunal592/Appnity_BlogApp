import { getPost } from '@/lib/data'
import Image from 'next/image'
import { format } from 'date-fns'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  return (
    <div className="bg-white py-12 font-sans">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Back to Blog</span>
              </div>
            </Link>
          </div>

          <article>
            <header className="mb-12 text-center">
              <div className="mb-4">
                {post.tags.map(({ tag }) => (
                  <span key={tag.id} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                    {tag.name}
                  </span>
                ))}
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">{post.title}</h1>
              <div className="flex justify-center items-center text-gray-500">
                <div className="flex items-center">
                    <Image
                        src={post.author.image || 'https://i.pravatar.cc/150'}
                        alt={post.author.name || 'User'}
                        width={48}
                        height={48}
                        className="rounded-full"
                    />
                    <div className="ml-4 text-left">
                        <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
                        <p className="text-sm text-gray-500">{format(new Date(post.createdAt), 'PPP')}</p>
                    </div>
                </div>
              </div>
            </header>

            <div className="relative h-96 mb-12 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={post.thumbnailUrl || 'https://picsum.photos/seed/picsum/1200/600'}
                alt={post.title}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="prose prose-lg max-w-none mx-auto text-gray-800 leading-relaxed">
              {post.content}
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
