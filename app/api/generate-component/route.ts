import { generateText } from "ai"
import { toAiErrorResponse } from "@/lib/ai-error"

export const maxDuration = 60

const SYSTEM_PROMPT = `You are an expert React and Tailwind CSS engineer.
Generate a single, self-contained React component in TypeScript (.tsx) based on the user's description.

Rules:
- Return ONLY the raw code. No markdown fences, no explanations, no prose.
- Use a default export.
- Use Tailwind CSS utility classes for all styling.
- Prefer shadcn/ui primitives ("@/components/ui/...") and lucide-react icons where appropriate.
- Make the component visually polished and production-ready.
- The component must be complete and immediately usable.`

export async function POST(req: Request) {
  try {
    const { prompt, componentType } = await req.json()

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "A prompt is required." }, { status: 400 })
    }

    const { text } = await generateText({
      model: "openai/gpt-oss-120b",
      system: SYSTEM_PROMPT,
      prompt: `Component type: ${componentType || "component"}.\nDescription: ${prompt}`,
    })

    const code = text
      .replace(/^```(?:tsx?|jsx?|typescript|javascript)?\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim()

    return Response.json({ code })
  } catch (error) {
    console.error("[v0] Component generation failed:", error)
    const { status, message } = toAiErrorResponse(error, "Failed to generate component.")
    return Response.json({ error: message }, { status })
  }
}
