'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useFormState, useFormStatus } from 'react-dom'
import { createPost } from '@/app/actions'

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
            {pending ? 'Submitting...' : 'Submit'}
        </button>
    );
}

export default function CreatePostPage() {
    const [state, formAction] = useFormState(createPost, { message: '', errors: {} });

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: '',
    });

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">Create a New Post</h1>
            <form action={(formData) => {
                formData.set('content', editor?.getHTML() || '');
                formAction(formData);
            }} className="space-y-8">
                <div>
                    <label htmlFor="title" className="block text-lg font-medium text-gray-800 mb-2">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    {state.errors?.title && <p className="text-red-500 mt-2">{state.errors.title}</p>}
                </div>

                <div>
                    <label htmlFor="content" className="block text-lg font-medium text-gray-800 mb-2">Content</label>
                    <div className="border border-gray-300 rounded-lg">
                        <EditorContent editor={editor} className="prose max-w-none p-4" />
                    </div>
                    {state.errors?.content && <p className="text-red-500 mt-2">{state.errors.content}</p>}
                </div>
                
                <SubmitButton />
                
                {state.message && <p className="text-red-500 mt-4 text-center">{state.message}</p>}
            </form>
        </div>
    );
}
