import { generateImage } from 'ai'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const { image } = await generateImage({
    model: 'openai/dall-e-3',
    prompt: `Professional product photography: ${prompt}. Clean white background, soft natural lighting, high quality, detailed, photorealistic, artisan handmade product.`,
    size: '1024x1024',
  })

  return Response.json({ imageUrl: image.base64 })
}
