import { createAPIFileRoute } from '@tanstack/react-start/api'
import { drizzle } from 'drizzle-orm/d1'
import { seed as seedData } from '../../db/seed'

export const APIRoute = createAPIFileRoute('/api/seed')({
  POST: async ({ request, context }) => {
    try {
      const db = drizzle(context.cloudflare.env.DB)
      await seedData(db)
      return { success: true, message: '✅ Seeding completed successfully' }
    } catch (error) {
      console.error('Seed error:', error)
      return { success: false, error: String(error) }
    }
  },
})
