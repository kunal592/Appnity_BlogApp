import Link from 'next/link'
import { getPosts } from '@/lib/data'
import Image from 'next/image'
import { format } from 'date-fns'

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div className="bg-gray-50 font-sans">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
            <span className="block">Welcome to Our Blog</span>
            <span className="block text-blue-600">Insights & Stories</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
            Discover the latest articles on technology, design, and more. 
            Updated weekly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden transform hover:-translate-y-1">
              <Link href={`/post/${post.id}`}>
                  <div className="relative h-56">
                    <Image
                      src={post.thumbnailUrl || 'https://picsum.photos/seed/picsum/800/400'}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      {post.tags.map(({ tag }) => (
                        <span key={tag.id} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight hover:text-blue-600 transition-colors duration-200">{post.title}</h2>
                    <p className="text-gray-600 mb-4 h-24 overflow-hidden">{post.content.substring(0, 100)}...</p>
                    <div className="flex items-center mt-6">
                      <Image
                        src={post.author.image || 'https://i.pravatar.cc/150'}
                        alt={post.author.name || 'User'}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
                        <p className="text-sm text-gray-500">{format(new Date(post.createdAt), 'PPP')}</p>
                      </div>
                    </div>
                  </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
