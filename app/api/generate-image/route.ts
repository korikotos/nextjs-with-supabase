import { generateImage, gateway } from "ai"
import { toAiErrorResponse } from "@/lib/ai-error"

// Image generation can take a bit; give the function room.
export const maxDuration = 120

export async function POST(req: Request) {
  try {
    const { prompt, aspectRatio } = await req.json()

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return Response.json({ error: "A prompt is required." }, { status: 400 })
    }

    const { image } = await generateImage({
      model: gateway.imageModel("bfl/flux-pro-1.1"),
      prompt: prompt.trim(),
      aspectRatio: aspectRatio ?? "1:1",
    })

    return Response.json({
      imageUrl: `data:${image.mediaType};base64,${image.base64}`,
    })
  } catch (err) {
    console.error("[v0] Image generation failed:", err)
    const { status, message } = toAiErrorResponse(err, "Failed to generate image.")
    return Response.json({ error: message }, { status })
  }
}
