import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { ArrowRight } from 'lucide-react';

const prisma = new PrismaClient();

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });
  return posts;
}

export default async function Home() {
  const posts = await getPosts();
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Inkwell</h1>
          <nav className="flex items-center space-x-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
            <Link href="/auth/signin" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Share Your Voice
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Inkwell is a beautifully designed platform for writers, thinkers, and storytellers. Join our community and let your ideas flow.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link href="/write" className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105">
              Start Writing <ArrowRight className="inline ml-2" />
            </Link>
            <Link href="#featured" className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-50 transition-transform transform hover:scale-105">
              Explore Posts
            </Link>
          </div>
        </div>

        <div id="featured" className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Featured Posts</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <h4 className="text-xl font-bold mb-2 h-16 truncate">{post.title}</h4>
                  <p className="text-gray-700 mb-4 h-24 overflow-hidden text-ellipsis">{post.excerpt || post.content.substring(0, 100)}...</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        <p className="text-gray-600 text-sm ml-2">By {post.author?.name || 'Unknown'}</p>
                    </div>
                    <Link href={`/post/${post.slug}`} className="text-blue-600 hover:underline">Read More <ArrowRight className="inline ml-1 w-4 h-4" /></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white mt-16 py-8">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Inkwell. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
