'use server'

import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  authorId: z.string(),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  thumbnail: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
  visibility: z.enum(['PUBLIC', 'PRIVATE', 'UNLISTED']).optional(),
  tags: z.array(z.string()).optional(),
})

export type FormState = {
    errors?: {
        title?: string[];
        content?: string[];
        authorId?: string[];
        slug?: string[];
        excerpt?: string[];
        thumbnail?: string[];
        status?: string[];
        visibility?: string[];
        tags?: string[];
    };
    message?: string | null;
};

export async function createPost(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = postSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    authorId: formData.get('authorId'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    thumbnail: formData.get('thumbnail'),
    status: formData.get('status'),
    visibility: formData.get('visibility'),
    tags: JSON.parse(formData.get('tags') as string || '[]'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { tags, ...data } = validatedFields.data
  const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    const post = await prisma.post.create({
      data: {
        ...data,
        slug: slug,
        status: data.status || 'DRAFT',
        visibility: data.visibility || 'PUBLIC',
        tags: {
          create: tags?.map(tag => ({
            tag: {
              connectOrCreate: {
                where: { name: tag },
                create: { name: tag, slug: tag.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
              },
            },
          })),
        },
      },
    })
    revalidatePath('/')
    redirect(`/post/${post.id}`)
  } catch (e) {
    console.error(e)
    return {
        message: 'Database Error: Failed to Create Post.',
    };
  }
}

const updatePostSchema = postSchema.extend({
  id: z.string(),
});

export async function updatePost(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = updatePostSchema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    content: formData.get('content'),
    authorId: formData.get('authorId'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    thumbnail: formData.get('thumbnail'),
    status: formData.get('status'),
    visibility: formData.get('visibility'),
    tags: JSON.parse(formData.get('tags') as string || '[]'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed',
    };
  }

  const { id, tags, ...data } = validatedFields.data;
  const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    await prisma.$transaction(async (tx) => {
        await tx.postTag.deleteMany({ where: { postId: id } });

        await tx.post.update({
            where: { id },
            data: {
                ...data,
                slug,
                status: data.status || 'DRAFT',
                visibility: data.visibility || 'PUBLIC',
                tags: {
                    create: tags?.map(tag => ({
                        tag: {
                            connectOrCreate: {
                                where: { name: tag },
                                create: { name: tag, slug: tag.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
                            },
                        },
                    })),
                },
            },
        });
    });
  } catch (e) {
    console.error(e);
    return {
      message: 'Database Error: Failed to Update Post.',
    };
  }

  revalidatePath(`/post/${id}`);
  revalidatePath('/');
  redirect(`/post/${id}`);
}


const deletePostSchema = z.object({
  id: z.string(),
})

export async function deletePost(formData: FormData) {
  const validatedFields = deletePostSchema.safeParse({
    id: formData.get('id'),
  })

  if (!validatedFields.success) {
    return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Delete Post.',
    };
  }

  const { id } = validatedFields.data;

  try {
    await prisma.post.delete({
      where: { id },
    })
  } catch (e) {
    console.error(e);
    return { message: 'Database Error: Failed to Delete Post.' };
  }
  revalidatePath('/')
  redirect('/')
}
