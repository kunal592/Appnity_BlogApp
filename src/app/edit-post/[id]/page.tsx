'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { updatePost } from '@/app/actions'
import { useSession } from 'next-auth/react'
import RichTextEditor from '@/components/RichTextEditor'
import { useState, useEffect } from 'react'
import { Settings, X } from 'lucide-react'
import { getPost } from '@/lib/data'

import type { Post, Tag, User } from '@prisma/client'

type PostWithRelations = Post & {
  author: User
  tags: { tag: Tag }[]
}

const initialState = {
  message: null,
  errors: {},
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="bg-blue-600 text-white px-8 py-3 rounded-md disabled:bg-gray-400 font-semibold text-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Update Post
    </button>
  )
}

export default function EditPost({ params }: { params: { id: string } }) {
  const { data: session } = useSession()
  const [state, formAction] = useFormState(updatePost, initialState)
  const [post, setPost] = useState<PostWithRelations | null>(null)
  const [content, setContent] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    getPost(params.id).then(data => {
        setPost(data)
        setContent(data.content)
    })
  }, [params.id])

  if (!session || session.user.id !== post?.authorId) {
    return <div className="container mx-auto px-6 py-12 text-center">You are not authorized to edit this post.</div>
  }
  
  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <form action={formAction}>
        <input type="hidden" name="id" value={post.id} />
        <input type="hidden" name="authorId" value={session.user.id} />
        <input type="hidden" name="content" value={content} />
        
        <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <Settings className="w-6 h-6" />
                <span className="sr-only">Post Settings</span>
              </button>
              <SubmitButton />
            </div>
          </div>
        </header>

        <div className="flex pt-24">
          <main className="flex-grow container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <label htmlFor="title" className="sr-only">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter post title here..."
                  className="w-full text-5xl font-extrabold text-gray-900 placeholder-gray-400 bg-transparent border-none focus:ring-0"
                  aria-describedby="title-error"
                  defaultValue={post.title}
                />
                <div id="title-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.title &&
                    state.errors.title.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md">
                <RichTextEditor content={content} onChange={setContent} />
              </div>
              <div id="content-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.content &&
                    state.errors.content.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
              </div>
            </div>
          </main>

          {/* Sidebar for Post Settings */}
          <aside className={`fixed top-0 right-0 h-full bg-white shadow-lg z-20 w-80 transform transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Post Settings</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700">URL Slug</label>
                  <input type="text" name="slug" id="slug" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue={post.slug} />
                </div>
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt</label>
                  <textarea name="excerpt" id="excerpt" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue={post.excerpt || ''}></textarea>
                </div>
                <div>
                  <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Thumbnail Image URL</label>
                  <input type="text" name="thumbnail" id="thumbnail" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue={post.thumbnailUrl || ''} />
                </div>
                 <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                  <select id="status" name="status" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" defaultValue={post.status}>
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>
                 <div>
                  <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">Visibility</label>
                  <select id="visibility" name="visibility" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" defaultValue={post.visibility}>
                    <option value="PUBLIC">Public</option>
                    <option value="UNLISTED">Unlisted</option>
                     <option value="PRIVATE">Private</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-end">
                  <button type="button" onClick={() => setIsSidebarOpen(false)} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Done
                  </button>
                </div>
              </div>
            </div>
          </aside>
          {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsSidebarOpen(false)}></div>}
        </div>
      </form>
    </div>
  )
}
