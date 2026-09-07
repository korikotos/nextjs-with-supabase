import { experimental_generateVideo as generateVideo, gateway } from "ai"
import { toAiErrorResponse } from "@/lib/ai-error"

// Video generation can take several minutes.
export const maxDuration = 300

export async function POST(req: Request) {
  try {
    const { prompt, aspectRatio } = await req.json()

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return Response.json({ error: "A prompt is required." }, { status: 400 })
    }

    const { video } = await generateVideo({
      model: gateway.videoModel("google/veo-3.0-fast-generate-001"),
      prompt: prompt.trim(),
      aspectRatio: aspectRatio ?? "16:9",
    })

    return Response.json({
      videoUrl: `data:${video.mediaType};base64,${video.base64}`,
    })
  } catch (err) {
    console.error("[v0] Video generation failed:", err)
    const { status, message } = toAiErrorResponse(err, "Failed to generate video.")
    return Response.json({ error: message }, { status })
  }
}
