import { cosineSimilarity } from '@/helpers/cosine-sim'
import { withMethods } from '@/lib/api-middlewares/with-methods'
import { db } from '@/lib/db'
import { openai } from '@/lib/openai'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const reqSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as unknown

  const apiKey = req.headers.authorization

  if (!apiKey) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const { text1, text2 } = reqSchema.parse(body)

    const validApiKey = await db.apiKey.findFirst({
      where: {
        key: apiKey,
        enabled: true,
      },
    })

    if (!validApiKey) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const start = new Date()
    const embeddings = await Promise.all(
      [text1, text2].map(async (text) => {
        const res = await openai.createEmbedding({
          model: 'text-embedding-ada-002',
          input: text,
        })

        return res.data.data[0].embedding
      })
    )

    const similarity = cosineSimilarity(embeddings[0], embeddings[1])

    const duration = new Date().getTime() - start.getTime()

    // Persist request
    await db.apiRequest.create({
      data: {
        duration,
        method: req.method as string,
        path: req.url as string,
        status: 200,
        apiKeyId: validApiKey.id,
        usedApiKey: validApiKey.key,
      },
    })

    return res.status(200).json({ success: true, text1, text2, similarity })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues })
    }

    return res.status(500).json({ error: 'Internal server error' })
  }
}

export default withMethods(['POST'], handler)
