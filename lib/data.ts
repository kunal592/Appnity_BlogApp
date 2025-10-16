import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export async function getPosts() {
  const posts = await prisma.post.findMany({
    where: {
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })
  return posts
}

export async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
        author: true,
        tags: {
            include: {
                tag: true,
            }
        }
    }
  })
  if (!post) {
    notFound()
  }
  return post
}
