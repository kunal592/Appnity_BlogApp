'use server'

import { z } from 'zod'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@/app/api/auth/[...nextauth]/route'

// Define a generic type for the form state
type FormState = {
  errors?: {
    [key: string]: string[] | undefined;
  };
  message?: string | null;
} | null;

const postSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters long' }),
});

const commentSchema = z.object({
  content: z.string().min(1, { message: 'Comment cannot be empty' }),
});

export async function createPost(prevState: FormState, formData: FormData) {
  const session = await auth()

  if (!session?.user) {
    return { message: 'Unauthorized' }
  }

  const validatedFields = postSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const slug = validatedFields.data.title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  try {
    await prisma.post.create({
      data: {
        title: validatedFields.data.title,
        slug: slug,
        content: validatedFields.data.content,
        author: {
            connect: {
                email: session.user.email as string,
            },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to create post',
    }
  }

  revalidatePath('/')
  redirect('/')
}

export async function updatePost(postId: string, prevState: FormState, formData: FormData) {
    const session = await auth();

    if (!session?.user) {
        return { message: "Unauthorized" };
    }

    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: { author: true },
    });

    if (!post) {
        return { message: "Post not found" };
    }

    if (post.author?.email !== session.user.email) {
        return { message: "Unauthorized" };
    }

    const validatedFields = postSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const slug = validatedFields.data.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');

    try {
        await prisma.post.update({
            where: { id: postId },
            data: {
                title: validatedFields.data.title,
                slug: slug,
                content: validatedFields.data.content,
            },
        });
    } catch (error) {
        console.error(error);
        return { message: "Failed to update post" };
    }

    revalidatePath('/');
    revalidatePath(`/posts/${postId}`);
    redirect(`/posts/${postId}`);
}

export async function createComment(postId: string, prevState: FormState, formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return { message: "Unauthorized" };
  }

  const validatedFields = commentSchema.safeParse({
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.comment.create({
      data: {
        content: validatedFields.data.content,
        post: {
          connect: {
            id: postId,
          },
        },
        author: {
          connect: {
            email: session.user.email as string,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "Failed to create comment" };
  }

  revalidatePath(`/posts/${postId}`);
  return { message: "Comment created successfully" };
}
