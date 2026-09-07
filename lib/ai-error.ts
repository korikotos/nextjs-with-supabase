type ErrorPayload = { status: number; message: string }

/**
 * Normalizes AI Gateway errors into a user-facing message and HTTP status.
 * The Gateway free tier returns 403 for paid-only ("restricted") models and
 * 429 when a free model is rate-limited; both arrive as plain Error messages.
 */
export function toAiErrorResponse(err: unknown, fallback: string): ErrorPayload {
  const raw = err instanceof Error ? err.message : String(err)
  const lower = raw.toLowerCase()

  if (lower.includes("minimum balance") || lower.includes("balance is insufficient")) {
    return {
      status: 402,
      message:
        "Video generation through the Vercel AI Gateway requires a minimum $10 balance. Add credits in your Vercel dashboard (AI Gateway) to enable it — no code changes are needed.",
    }
  }

  if (lower.includes("do not have access") || lower.includes("restricted")) {
    return {
      status: 403,
      message:
        "This model isn't available on the current AI Gateway free tier. Add credits in your Vercel dashboard (AI Gateway) to enable it.",
    }
  }

  if (lower.includes("rate-limit") || lower.includes("rate limit") || lower.includes("429")) {
    return {
      status: 429,
      message: "The AI Gateway free tier is rate-limited right now. Wait a few seconds and try again.",
    }
  }

  return { status: 500, message: fallback }
}
