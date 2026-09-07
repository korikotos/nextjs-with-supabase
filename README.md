# The Ineffable — AI Creative Generator

An AI-driven creative platform for generating components, images, and videos, built with Next.js and powered entirely by Vercel.

## Features

- Works across the entire [Next.js](https://nextjs.org) App Router stack
- AI generation via the [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) (zero-config, no provider keys):
  - Component code generation
  - AI image generation
  - AI video generation (requires AI Gateway credits)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)
- Deployed on [Vercel](https://vercel.com)

## AI Gateway

AI features use the Vercel AI Gateway through the AI SDK. Authentication is automatic on Vercel deployments and in the v0 preview — no API keys to configure.

- Image and component generation work on the free tier.
- Video generation (Google Veo) requires a minimum balance on your AI Gateway account. Add credits in your Vercel dashboard under AI Gateway to enable it.

## Deploy to Vercel

Push to your connected Git repository and Vercel builds and deploys automatically, or use the "Publish" action.

## Run locally

```bash
pnpm install
pnpm dev
```

The app runs on [localhost:3000](http://localhost:3000/).
