'use client'

import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useFormState, useFormStatus } from 'react-dom'
import { updatePost } from '@/app/actions'
import { getPost } from '@/lib/data'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import type { Post, User } from '@prisma/client'

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
            {pending ? 'Updating...' : 'Update Post'}
        </button>
    );
}

export default function EditPostPage({ params }: { params: { id: string } }) {
    const postId = params.id;
    const { data: session, status } = useSession();
    const [state, formAction] = useFormState(updatePost.bind(null, postId), { message: null, errors: {} });
    const [post, setPost] = useState<(Post & { author: User }) | null>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: '',
        editable: false,
    });
    
    useEffect(() => {
        if (status === 'unauthenticated') {
            redirect('/');
        }
        if (status === 'authenticated') {
            getPost(postId).then(postData => {
                if (!postData || postData.author.email !== session?.user?.email) {
                    redirect('/');
                } else {
                    setPost(postData);
                    if (editor && !editor.isDestroyed) {
                        editor.commands.setContent(postData.content);
                        editor.setEditable(true);
                    }
                }
            });
        }
    }, [status, postId, session, editor]);

    if (status === 'loading' || !post || !editor) {
        return <div className="text-center p-12">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">Edit Post</h1>
            <form action={(formData) => {
                if(editor) {
                    formData.set('content', editor.getHTML());
                }
                formAction(formData);
            }} className="space-y-8">
                <div>
                    <label htmlFor="title" className="block text-lg font-medium text-gray-800 mb-2">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        defaultValue={post.title}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    {state.errors?.title && <p className="text-red-500 mt-2">{state.errors.title[0]}</p>}
                </div>

                <div>
                    <label htmlFor="content" className="block text-lg font-medium text-gray-800 mb-2">Content</label>
                    <div className="border border-gray-300 rounded-lg">
                        <EditorContent editor={editor} className="prose max-w-none p-4" />
                    </div>
                    {state.errors?.content && <p className="text-red-500 mt-2">{state.errors.content[0]}</p>}
                </div>
                
                <SubmitButton />
                
                {state.message && <p className="text-red-500 mt-4 text-center">{state.message}</p>}
            </form>
        </div>
    );
}
