import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding the database...')

  // Clear existing data
  await prisma.postTag.deleteMany({})
  await prisma.tag.deleteMany({})
  await prisma.post.deleteMany({})
  await prisma.user.deleteMany({})

  // Create users
  await prisma.user.createMany({
    data: [
      {
        email: 'alice@example.com',
        name: 'Alice',
        image: 'https://i.pravatar.cc/150?u=alice',
      },
      {
        email: 'bob@example.com',
        name: 'Bob',
        image: 'https://i.pravatar.cc/150?u=bob',
      },
      {
        email: 'charlie@example.com',
        name: 'Charlie',
        image: 'https://i.pravatar.cc/150?u=charlie',
      },
    ],
  })

  const createdUsers = await prisma.user.findMany()

  // Create tags
  await prisma.tag.createMany({
    data: [
      { name: 'Technology', slug: 'technology' },
      { name: 'Programming', slug: 'programming' },
      { name: 'Design', slug: 'design' },
      { name: 'Productivity', slug: 'productivity' },
      { name: 'Next.js', slug: 'nextjs' },
    ],
  })

  const createdTags = await prisma.tag.findMany()

  // Create posts
  for (let i = 0; i < 15; i++) {
    const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)]
    const randomTags = createdTags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1)

    const title = `Post ${i + 1}`
    const slug = title.toLowerCase().replace(/\s+/g, '-')

    await prisma.post.create({
      data: {
        title: title,
        slug: slug,
        content: `This is the content for post ${i + 1}. It's a sample post created by the seed script.`,
        authorId: randomUser.id,
        status: 'PUBLISHED',
        visibility: 'PUBLIC',
        thumbnailUrl: `https://picsum.photos/seed/${slug}/800/400`,
        tags: {
          create: randomTags.map(tag => ({
            tag: {
              connect: { id: tag.id },
            },
          })),
        },
      },
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })