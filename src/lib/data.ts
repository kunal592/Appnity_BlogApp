import prisma from './prisma'

export async function getPosts({ page = 1, limit = 6, query = '' }: { page?: number, limit?: number, query?: string }) {
  const skip = (page - 1) * limit;
  const where = query ? {
    title: {
      contains: query,
      mode: 'insensitive',
    }
  } : {};

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: limit,
      where,
      include: {
        author: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.post.count({ where }),
  ]);
  
  return { posts, total };
}

export async function getPost(id: string) {
    return await prisma.post.findUnique({
        where: {
            id,
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
}
