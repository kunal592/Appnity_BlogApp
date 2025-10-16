import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Placeholder for blog posts */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="bg-gray-200 h-40 rounded-md mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Blog Post Title</h2>
            <p className="text-gray-600 mb-4">A short description of the blog post.</p>
            <Link href="#" className="text-blue-500 hover:underline">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
