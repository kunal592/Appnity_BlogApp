import { getPosts } from '@/lib/data'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'

export default async function Home({ searchParams }: { searchParams: { page?: string, query?: string } }) {
  const page = Number(searchParams.page) || 1
  const query = searchParams.query || ''
  const { posts, total } = await getPosts({ page, query })
  const totalPages = Math.ceil(total / 6)

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">Welcome to Appnity Blog</h1>
          <p className="text-xl text-gray-400 mt-4 max-w-3xl mx-auto">Your daily dose of the latest in web development, design, and technology. Stay curious.</p>
        </div>
      </div>

      {/* Search and Blog Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="mb-12">
            <form className="max-w-md mx-auto">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                        type="search"
                        name="query"
                        defaultValue={query}
                        placeholder="Search for articles..."
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                        Search
                    </button>
                </div>
            </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      
      {/* Pagination */}
        <div className="flex justify-center items-center space-x-6 my-10">
            <Link href={`/?page=${page > 1 ? page - 1 : 1}&query=${query}`}>
              <div className={`flex items-center px-4 py-2 rounded-lg transition-colors ${page > 1 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span>Previous</span>
              </div>
            </Link>
            
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>

            <Link href={`/?page=${page < totalPages ? page + 1 : totalPages}&query=${query}`}>
              <div className={`flex items-center px-4 py-2 rounded-lg transition-colors ${page < totalPages ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>
        </div>
    </div>
  )
}
