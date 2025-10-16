'use server'

import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  authorId: z.string(),
})

export async function createPost(prevState: { message: string }, formData: FormData) {
  const validatedFields = postSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    authorId: formData.get('authorId'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed',
    }
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: validatedFields.data.title,
        content: validatedFields.data.content,
        authorId: validatedFields.data.authorId,
        slug: validatedFields.data.title.toLowerCase().replace(/ /g, '-'), // Simple slug generation
      },
    })
    return { message: `Post created with id: ${post.id}` }
  } catch (error) {
    console.error('Failed to create post:', error);
    return { message: 'Failed to create post' }
  }
}
