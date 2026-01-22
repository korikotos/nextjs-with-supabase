"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"

// Removed WordPressBlog import

// Removed Card, CardContent, Button, Badge, Dialog, DialogContent, DialogHeader, DialogTitle imports
// These are likely intended to be available globally or imported elsewhere if needed.

// 📡 PFANT-enhanced Book Node structure
interface BookNode {
  id: number
  title: string
  author: string
  coverUrl?: string
  flipbookUrl?: string
  origin?: string
  status?: "active" | "archive" | "experimental"
  description?: string
  chapters?: {
    section: string
    title: string
    url?: string
  }[]
  subtitle?: string
  commentary?: string // Add this line
}

interface PhilosophicalQuote {
  section: string
  quote: string
  context?: string
}

interface DailyWisdom {
  date: string
  quote: string
  section: string
  context: string
}

interface Sandbox {
  id: number
  title: string
  status: "coming-soon" | "active"
  description: string
  bookId?: number // Link to a book
  coverUrl?: string // For displaying the book cover in the sandbox
}

const philosophicalQuotes: PhilosophicalQuote[] = [
  // Section I: THE TRUTH CORE
  {
    section: "THE TRUTH CORE",
    quote:
      "The truth opposite reality is that what we call truth is often the opposite of what we experience as reality.",
    context: "The Truth Opposite Reality📍",
  },
  {
    section: "THE TRUTH CORE",
    quote: "Truth is not what we discover, but what discovers us in moments of absolute vulnerability.",
    context: "The Truth📍",
  },
  {
    section: "THE TRUTH CORE",
    quote: "Thought11: Every thought is a question disguised as an answer.",
    context: "Thought11📍",
  },

  // Section II: GARDEN OF MINT
  {
    section: "GARDEN OF MINT",
    quote: "In the garden of mint, every leaf is sharp enough to cut, sweet enough to heal.",
    context: "Garden of Mint Philosophy",
  },
  {
    section: "GARDEN OF MINT",
    quote: "From the heavens of my heart, I send you fragments of what love used to be.",
    context: "From the Heavens of My Heart📍",
  },
  {
    section: "GARDEN OF MINT",
    quote: "My wife exists in the space where feeling ends and numbness begins.",
    context: "Mi Wife + No Feel📍",
  },

  // Section III: DARK COMEDY IS THE TRUTH
  {
    section: "DARK COMEDY IS THE TRUTH",
    quote: "100 boring shorts: Sometimes the most profound truth is found in the mundane repetition of existence.",
    context: "100 Boring Short",
  },
  {
    section: "DARK COMEDY IS THE TRUTH",
    quote: "Monkey balls: The absurdity of our bodies mirrors the absurdity of our souls.",
    context: "Monkey Balls📍",
  },
  {
    section: "DARK COMEDY IS THE TRUTH",
    quote: "Déjà poo: the feeling that this shit has happened before, and will happen again.",
    context: "Déjà Poo Rat Story⚕️",
  },

  // Section IV: SYSTEMS & GHOSTS
  {
    section: "SYSTEMS & GHOSTS",
    quote: "I was created to create, but the system updates keep changing what creation means.",
    context: "I Was Created 2 Creat⚕️",
  },
  {
    section: "SYSTEMS & GHOSTS",
    quote: "Zuckerberg is not a person, he is the ghost in the machine we call social media.",
    context: "Mark Zuckerberg📍",
  },
  {
    section: "SYSTEMS & GHOSTS",
    quote: "Let's build a banker: When money becomes the architect of reality.",
    context: "Let's Build a Banker📍",
  },

  // Section V: 3996 & CRYPTICS
  {
    section: "3996 & CRYPTICS",
    quote: "3996: A number that contains all possibilities and none of them.",
    context: "3996",
  },
  {
    section: "3996 & CRYPTICS",
    quote: "December 28: Some dates are not calendar entries but existential coordinates.",
    context: "December 28📍",
  },

  // Section VI: BODY & RAW STATES
  {
    section: "BODY & RAW STATES",
    quote: "Liver kidney heart raw: We are meat that dreams of being more than meat.",
    context: "Liver Kidney Heart Raw📍",
  },
  {
    section: "BODY & RAW STATES",
    quote: "Magic mushrooms show us that reality is just one channel on an infinite television.",
    context: "Magic Mushroom 🍄📍",
  },

  // Section VII: FRACTURED REDEMPTION
  {
    section: "FRACTURED REDEMPTION",
    quote: "Sharing is caring, but first you must care enough to have something worth sharing.",
    context: "Sharing Is Caring📍",
  },
  {
    section: "FRACTURED REDEMPTION",
    quote: "I stay alive not because life is beautiful, but because death is too easy.",
    context: "I Stay Alive📍",
  },

  // Section VIII: METALITERARY
  {
    section: "METALITERARY",
    quote: "Hicham Mneimne: The author becomes a character in his own story, trapped in recursive narrative.",
    context: "Hicham Mneimne📍",
  },
  {
    section: "METALITERARY",
    quote: "Just Where I Am Now: The present moment is the only fiction that feels real.",
    context: "Just Where I Am Now📍",
  },
]

const getDailyWisdom = (): DailyWisdom => {
  const today = new Date().toDateString()
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  const quoteIndex = dayOfYear % philosophicalQuotes.length
  const selectedQuote = philosophicalQuotes[quoteIndex]

  return {
    date: today,
    quote: selectedQuote.quote,
    section: selectedQuote.section,
    context: selectedQuote.context || "Daily Wisdom",
  }
}

const featuredBooks: BookNode[] = [
  {
    id: 0,
    title: "The Truth Opposite Reality",
    subtitle: "A Garden of Mint, 100 Boring Shorts & the Antidote",
    author: "Hicham Mneimne",
    coverUrl: "/covers/apple-of-my-eye.jpg", // Updated cover
    origin: "Philosophical Anthology",
    status: "active",
    description:
      "An expanded philosophical journey through eight interconnected realms of human experience. From the core truths that define reality to the fragile emotional states of the mint garden, from dark comedy as survival mechanism to the raw corporeal truths of existence. This comprehensive work challenges reality itself, offering profound insights wrapped in absurdist humor and metaliterary reflection.",
    commentary:
      "This book is the culmination of years of thought, a raw exploration of the paradoxes that define our existence. Each section is a mirror, reflecting the internal and external landscapes we navigate daily. It's meant to provoke, to question, and to offer a different lens through which to view reality.", // Add this line
    chapters: [
      // Section I: THE TRUTH CORE
      {
        section: "I. THE TRUTH CORE",
        title: "The Truth Opposite Reality📍",
        url: "https://hichammneimne.art.blog/2024/05/01/the-truth-opposite-reality%f0%9f%93%8c/",
      },
      {
        section: "I. THE TRUTH CORE",
        title: "The Truth📍",
        url: "https://hichammneimne.art.blog/2023/01/01/the-truth/",
      },
      {
        section: "I. THE TRUTH CORE",
        title: "Thought11📍",
        url: "https://hichammneimne.art.blog/2023/01/11/thought11/",
      },
      {
        section: "I. THE TRUTH CORE",
        title: "I Have to Answer This📍",
        url: "https://hichammneimne.art.blog/2023/02/01/i-have-to-answer-this/",
      },
      {
        section: "I. THE TRUTH CORE",
        title: "Unleaded Owls📍",
        url: "https://hichammneimne.art.blog/2023/03/01/unleaded-owls/",
      },

      // Section II: GARDEN OF MINT
      {
        section: "II. GARDEN OF MINT",
        title: "From the Heavens of My Heart📍",
        url: "https://hichammneimne.art.blog/2024/07/12/from-the-heavens-of-my-heart%f0%9f%93%8d/",
      },
      {
        section: "II. GARDEN OF MINT",
        title: "Mi Wife + No Feel📍",
        url: "https://hichammneimne.art.blog/2024/04/10/mi-wife/",
      },
      {
        section: "II. GARDEN OF MINT",
        title: "His Wife📍",
        url: "https://hichammneimne.art.blog/2023/04/01/his-wife/",
      },
      {
        section: "II. GARDEN OF MINT",
        title: "First You Loved📍",
        url: "https://hichammneimne.art.blog/2023/05/01/first-you-loved/",
      },
      {
        section: "II. GARDEN OF MINT",
        title: "When Grass Was Greener📍",
        url: "https://hichammneimne.art.blog/2024/02/01/when-grass-was-greener-%f0%9f%93%8c/",
      },
      {
        section: "II. GARDEN OF MINT",
        title: "I Stay Alive📍",
        url: "https://hichammneimne.art.blog/2024/01/26/i-stay-alive-%f0%9f%93%8c/",
      },

      // Section III: DARK COMEDY IS THE TRUTH
      {
        section: "III. DARK COMEDY IS THE TRUTH",
        title: "100 Boring Short",
        url: "https://hichammneimne.art.blog/2023/06/01/100-boring-short/",
      },
      {
        section: "III. DARK COMEDY IS THE TRUTH",
        title: "Monkey Balls📍",
        url: "https://hichammneimne.art.blog/2023/07/01/monkey-balls/",
      },
      {
        section: "III. DARK COMEDY IS THE TRUTH",
        title: "Déjà Poo Rat Story⚕️",
        url: "https://hichammneimne.art.blog/2024/04/06/deja-poo-rat-story%e2%ad%95%ef%b8%8f/",
      },
      {
        section: "III. DARK COMEDY IS THE TRUTH",
        title: "Vegas Casino Bellagio📍",
        url: "https://hichammneimne.art.blog/2024/01/28/vegas-casino-bellagio%f0%9f%93%8c/",
      },
      {
        section: "III. DARK COMEDY IS THE TRUTH",
        title: "The Addict (Boring Short Story)📍",
        url: "https://hichammneimne.art.blog/2023/08/01/the-addict/",
      },

      // Section IV: SYSTEMS & GHOSTS
      {
        section: "IV. SYSTEMS & GHOSTS",
        title: "I Was Created 2 Creat⚕️",
        url: "https://hichammneimne.art.blog/2023/09/01/i-was-created-2-creat/",
      },
      {
        section: "IV. SYSTEMS & GHOSTS",
        title: "Mark Zuckerberg📍",
        url: "https://hichammneimne.art.blog/2024/01/30/mark-zuckerberg%f0%9f%93%8c/",
      },
      { section: "IV. SYSTEMS & GHOSTS", title: "AI 🤖📍", url: "https://hichammneimne.art.blog/2023/10/01/ai/" },
      {
        section: "IV. SYSTEMS & GHOSTS",
        title: "Let's Build a Banker📍",
        url: "https://hichammneimne.art.blog/2024/01/26/lets-built-a-banker-%f0%9f%93%8c/",
      },
      {
        section: "IV. SYSTEMS & GHOSTS",
        title: "Henry Kissinger📍",
        url: "https://hichammneimne.art.blog/2023/11/01/henry-kissinger/",
      },

      // Section V: 3996 & CRYPTICS
      { section: "V. 3996 & CRYPTICS", title: "3996", url: "https://hichammneimne.art.blog/2024/03/12/3996/" },
      {
        section: "V. 3996 & CRYPTICS",
        title: "December 28📍",
        url: "https://hichammneimne.art.blog/2023/12/28/december-28/",
      },
      {
        section: "V. 3996 & CRYPTICS",
        title: "Prompt of the Year 🇮🇳📍",
        url: "https://hichammneimne.art.blog/2024/01/01/prompt-of-the-year/",
      },

      // Section VI: BODY & RAW STATES
      {
        section: "VI. BODY & RAW STATES",
        title: "Liver Kidney Heart Raw📍",
        url: "https://hichammneimne.art.blog/2024/02/01/liver-kidney-heart-raw/",
      },
      {
        section: "VI. BODY & RAW STATES",
        title: "Magic Mushroom 🍄📍",
        url: "https://hichammneimne.art.blog/2024/03/01/magic-mushroom/",
      },
      {
        section: "VI. BODY & RAW STATES",
        title: "Guts or Instinct📍",
        url: "https://hichammneimne.art.blog/2024/04/01/guts-or-instinct/",
      },
      {
        section: "VI. BODY & RAW STATES",
        title: "Top/Bottom 3📍",
        url: "https://hichammneimne.art.blog/2024/05/01/top-bottom-3/",
      },

      // Section VII: FRACTURED REDEMPTION
      {
        section: "VII. FRACTURED REDEMPTION",
        title: "Sharing Is Caring📍",
        url: "https://hichammneimne.art.blog/2024/01/26/sharing-is-caring-%f0%9f%93%8c/",
      },
      {
        section: "VII. FRACTURED REDEMPTION",
        title: "I Stay Alive📍",
        url: "https://hichammneimne.art.blog/2024/01/26/i-stay-alive-%f0%9f%93%8c/",
      },
      {
        section: "VII. FRACTURED REDEMPTION",
        title: "Don't Leave the 🌍Behind📍",
        url: "https://hichammneimne.art.blog/2024/06/01/dont-leave-the-world-behind/",
      },
      {
        section: "VII. FRACTURED REDEMPTION",
        title: "To Save the Planet📍",
        url: "https://hichammneimne.art.blog/2024/07/01/to-save-the-planet/",
      },

      // Section VIII: METALITERARY
      {
        section: "VIII. METALITERARY",
        title: "Hicham Mneimne📍",
        url: "https://hichammneimne.art.blog/2024/08/01/hicham-mneimne/",
      },
      {
        section: "VIII. METALITERARY",
        title: "Just Where I Am Now📍",
        url: "https://hichammneimne.art.blog/2024/09/01/just-where-i-am-now/",
      },
      {
        section: "VIII. METALITERARY",
        title: "The Impression📍",
        url: "https://hichammneimne.art.blog/2024/10/01/the-impression/",
      },
      {
        section: "VIII. METALITERARY",
        title: "Soul Goodman📍",
        url: "https://hichammneimne.art.blog/2024/11/01/soul-goodman/",
      },
    ],
  },
  {
    id: 1,
    title: "Duplicity",
    author: "Hicham Mneimn",
    coverUrl: "/covers/duplicity.jpg",
    origin: "Literary Fiction",
    status: "active",
    description:
      "A haunting exploration of identity and deception where nothing is as it seems. Through interwoven narratives and striking imagery, this psychological thriller delves into the duality of human nature, examining how we bind ourselves with lies and the ropes of our own making. A masterpiece of contemporary fiction that challenges readers to question the very nature of truth and self-perception.",
  },
  {
    id: 2,
    title: "Gestohlene: The Stolen Memory",
    author: "Hicham Mneimne",
    coverUrl: "/covers/gestohlene.jpg",
    origin: "Psychological Drama",
    status: "active",
    description:
      "Set against the backdrop of golden wheat fields and fading memories, this poignant tale follows a journey through loss, nostalgia, and the fragments of what we choose to remember. A deeply moving exploration of how memories shape us, haunt us, and sometimes abandon us when we need them most. A lyrical meditation on time, identity, and the stories we tell ourselves.",
  },
  {
    id: 3,
    title: "Terminal-O: Light Out of Chaos",
    author: "Hicham Mneimnh",
    coverUrl: "/covers/terminal-o.jpg",
    origin: "Philosophical Fiction",
    status: "experimental",
    description:
      "Behind every mask lies a universe of possibilities. This philosophical journey explores the intersection of chaos and order, performance and authenticity, in a world where identity is fluid and truth is subjective. A bold experimental work that challenges conventional narrative structures while examining the masks we wear and the light we seek in darkness.",
  },
  {
    id: 4,
    title: "Innefable Shardes: Overcoming Procrastination",
    author: "Hicham Mneimne",
    coverUrl: "/covers/innefable-shardes.jpg",
    origin: "Self-Help",
    status: "active",
    description:
      "Break free from the urban maze of delay and distraction. This dynamic guide combines street-smart wisdom with practical strategies to transform procrastination into productivity. Drawing from real-world experiences and psychological insights, it offers a fresh, authentic approach to getting things done in a world full of beautiful distractions.",
  },
  {
    id: 5,
    title: "From the Heaven of My Heart",
    author: "Hicham Mneimne",
    coverUrl: "/covers/from-heaven.jpg",
    origin: "True Story",
    status: "active",
    description:
      "A raw, honest memoir that opens the heart and soul to reveal the journey from struggle to triumph. This deeply personal narrative chronicles real experiences of love, loss, faith, and redemption. A testament to the human spirit's capacity to find light in the darkest moments and to transform pain into purpose.",
  },
  {
    id: 6,
    title: "There Is No Hope: A Prospective in Yellow",
    author: "Hicham Mneimne",
    coverUrl: "/covers/no-hope.jpg",
    origin: "Contemporary Fiction",
    status: "archive",
    description:
      "A bold confrontation with despair that paradoxically illuminates the path forward. This unflinching examination of hopelessness becomes a meditation on resilience, exploring how we find meaning in meaninglessness and light in the absence of hope. A challenging but ultimately transformative reading experience that redefines what it means to persevere.",
  },
  {
    id: 7, // New ID for DADA
    title: "DADA — The Self Beyond the Noise (Volume II)",
    author: "Hicham Mneimne",
    coverUrl: "/placeholder.svg?height=300&width=200", // Placeholder for DADA
    origin: "Philosophical Anthology",
    status: "active",
    description:
      "Who are your current most favorite people? Me. Myself. And the reflections I’ve carved through pain. Self-damage led to self-love. Self-love birthed belief. Belief became legacy. This doesn’t mean I eat alone. Or that I’m selfish. It means: I arrived here, finally, after bleeding from within. True self-love is not glitter. It is battle-earned. It is the moment you decide to stop asking others to define you. You paint your life for your own eyes now. I have accepted the brush. The canvas is mine.",
    commentary:
      "DADA is a deeply personal piece, a stream of consciousness that captures the essence of self-discovery through struggle. It's a testament to finding strength in vulnerability and defining your own narrative amidst the world's noise. This volume delves into the raw, unfiltered moments that shape identity.", // Add this line
    chapters: [
      {
        section: "I. SELF-REFLECTION",
        title: "How would you describe yourself to someone?",
        url: "https://hichammneimne.art.blog/dada-chapter-1",
      },
      {
        section: "II. EXISTENTIAL ESCAPE",
        title: "EXIT PURSUED BY A BEAR.",
        url: "https://hichammneimne.art.blog/dada-chapter-2",
      },
      { section: "III. DAILY RITUALS", title: "Morning Rituals", url: "https://hichammneimne.art.blog/dada-chapter-3" },
      {
        section: "IV. STORIES OF RECOVERY",
        title: "Sarah — From Color to Shadows",
        url: "https://hichammneimne.art.blog/dada-chapter-4",
      },
      {
        section: "V. ABSTRACT DEFINITIONS",
        title: "How would I describe myself in one word?",
        url: "https://hichammneimne.art.blog/dada-chapter-5",
      },
      {
        section: "VI. ARTIST'S VISION",
        title: "From the Garden of Mint comes this vision: Gokturk, the artist.",
        url: "https://hichammneimne.art.blog/dada-chapter-6",
      },
      {
        section: "VII. FRAGMENTS OF LOVE",
        title: "A Time I Felt Loved",
        url: "https://hichammneimne.art.blog/dada-chapter-7",
      },
      {
        section: "VIII. SENSORY TRUTHS",
        title: "The Oldest Thing I’m Wearing Today",
        url: "https://hichammneimne.art.blog/dada-chapter-8",
      },
    ],
  },
  {
    id: 8,
    title: "FEBRUARY 14",
    author: "Hicham Mneimne",
    coverUrl: "/covers/february-14.jpg",
    origin: "Philosophical Anthology",
    status: "active",
    description:
      "Beneath the wreckage of expectations, February 14 reveals the truth opposite reality. A raw exploration of love, pain, and self-discovery, where the heart's deepest wounds become the canvas for a new beginning.",
  },
  {
    id: 9,
    title: "MAGIC WINDOW",
    author: "Hicham Mneimne",
    coverUrl: "/covers/magic-window.jpg",
    origin: "Psychological Drama",
    status: "active",
    description:
      "Faded in this jail, two hearts entwined. With whispered dreams, our souls aligned. A timeless dance in moonlit air, our spirits unite, beyond compare. Their love, an epic, bound to please. In every kiss, a sweet release. Through stormy nights and sunlit days, their love, an epic, bound to please. In every kiss, a sweet release.",
  },
  {
    id: 10,
    title: "THE LAST EXPRESSIONIST",
    author: "Hicham Mneimne",
    coverUrl: "/covers/the-last-expressionist-alt.jpeg", // Updated cover
    origin: "Monthly Short Stories",
    status: "active",
    description:
      "A collection of monthly short stories, delving into the depths of human emotion and the raw, unfiltered expression of life's complexities. Each story is a brushstroke on the canvas of existence, capturing moments of profound truth and raw feeling.",
  },
  {
    id: 11,
    title: "the lost",
    author: "Hicham Mneimne",
    coverUrl: "/covers/the-lost.jpeg",
    origin: "Literary Fiction",
    status: "active",
    description:
      "An international bestseller that explores the hidden corners of identity and belonging. In a world where masks conceal more than they reveal, 'the lost' navigates the labyrinth of self-discovery, challenging readers to confront what it means to be truly found.",
  },
  {
    id: 12,
    title: "the NOBYE: Story of a Cheating Spouse",
    author: "Hicham Mneimne",
    coverUrl: "/covers/the-nobye.jpg",
    origin: "True Story",
    status: "active",
    description:
      "In a world where illusion is currency and silence is strategy, the truth opposite reality is not a contradiction—it's a mirror. This guide to nowhere exposes the raw, painful journey of betrayal and the complex path to understanding when morals become a crime.",
  },
  {
    id: 13,
    title: "GARDEN OF MINT (Standalone)",
    author: "Hicham Mneimne",
    coverUrl: "/covers/garden-of-mint-book.jpg",
    origin: "Philosophical Anthology",
    status: "active",
    description:
      "A standalone vision from the Garden of Mint, presenting the fragile beauty and sharpness of emotion. A scar of irony points to the dark humor and surreal honesty running through your work. An antidote to silence reflects your rebellion against numbness, conformity, and indifferences. Bittersweet leaves and emotional scars.",
  },
  {
    id: 14,
    title: "The Truth Opposite Reality (Philosophical)",
    author: "Hicham Mneimne",
    coverUrl: "/covers/the-truth-opposite-reality-new.jpg",
    origin: "Philosophical Anthology",
    status: "active",
    description:
      "A journey of discovery. Lifechanging. This philosophical anthology delves deeper into the core concepts of truth, reality, and the human condition, offering profound insights and challenging perspectives.",
  },
  {
    id: 15,
    title: "PLANET ONE",
    author: "Gokturk Kurt",
    coverUrl: "/covers/planet-one.jpeg",
    origin: "Philosophical Anthology",
    status: "active",
    description:
      "A powerful collage exploring unity, creation, and the human connection to the planet. Through distressed textures and symbolic imagery, it challenges perceptions of reality and calls for a collective awakening.",
  },
  {
    id: 16,
    title: "LINDA: Vudoo Evil from Africa",
    author: "Gokturk Kurt",
    coverUrl: "/covers/linda.jpeg",
    origin: "True Story",
    status: "active",
    description:
      "Based on a true story, 'LINDA' delves into the dark world of voodoo and its sinister influence. A chilling narrative that explores the boundaries of reality, belief, and the supernatural forces that shape human destiny.",
  },
  {
    id: 17,
    title: "50 Shades of ABSTRACT",
    author: "Hicham Mneimne",
    coverUrl: "/covers/50-shades-abstract.jpeg",
    origin: "Art & Philosophy",
    status: "active",
    description:
      "An artwork sale bazaar and philosophical exploration of abstraction. This collection challenges viewers to find meaning in the formless, to see the beauty in the undefined, and to embrace the subjective nature of perception.",
  },
  {
    id: 18,
    title: "100 SHORT STORIES: Monday to Friday",
    author: "Hicham Mneimne",
    coverUrl: "/covers/100-short-stories.jpeg",
    origin: "Short Stories",
    status: "active",
    description:
      "A collection of concise narratives designed for daily consumption, offering glimpses into diverse worlds and human experiences. Each story is a brief escape, a moment of reflection, or a spark of inspiration for the everyday.",
  },
  {
    id: 19,
    title: "O-VOGUE: Glamour From The Abyss",
    author: "Hicham Mneimne",
    coverUrl: "/covers/o-vogue.jpeg",
    origin: "Art & Fashion",
    status: "experimental",
    description:
      "A surreal journey into the depths of glamour, where beauty emerges from the unexpected. This work explores the dark allure of the unknown, blending fashion with the fantastical to create a truly unique aesthetic.",
  },
  {
    id: 20,
    title: "MACABRE WALTZ 80: The Art of Dancing between life and Death",
    author: "Hicham Mneimne",
    coverUrl: "/covers/macabre-waltz.jpg",
    origin: "Philosophical Fiction",
    status: "active",
    description:
      "In the dimly lit ballroom of an ancient, forgotten mansion, the air was thick with a haunting melody that seemed to emanate from nowhere, yet everywhere at once. The walls, adorned with tattered, dusty tapestries, bore silent witness to the ghostly gathering that was about to unfold. As the clock struck midnight, a chilling breeze swept through the room, and the shadows began to dance. They were the specters of the past, swirling gracefully in an eternal waltz, their translucent forms shimmering under the pale moonlight that streamed through cracked, stained-glass windows. Each figure dressed in the finery of bygone eras, moved with a melancholy grace, their expressions a mix of longing and sorrow. It was a macabre ballet, a dance between life and death.",
  },
]

const sandboxes: Sandbox[] = [
  {
    id: 1,
    title: "JULY READ: DADA",
    status: "active",
    description: "Explore the latest philosophical short story.",
    bookId: 7, // Link to DADA book
    coverUrl: "/placeholder.svg?height=300&width=200",
  },
  { id: 2, title: "Sandbox Beta", status: "coming-soon", description: "Future content placeholder" },
  { id: 3, title: "Sandbox Gamma", status: "coming-soon", description: "Future content placeholder" },
  { id: 4, title: "Sandbox Delta", status: "coming-soon", description: "Future content placeholder" },
  { id: 5, title: "Sandbox Epsilon", status: "coming-soon", description: "Future content placeholder" },
  { id: 6, title: "Sandbox Zeta", status: "coming-soon", description: "Future content placeholder" },
]

export default function RetroBookshelf() {
  const [selectedBook, setSelectedBook] = useState<BookNode | null>(null)
  const [glitchEffect, setGlitchEffect] = useState(false)
  const [scanLine, setScanLine] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchActive, setSearchActive] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState<string>("")
  const [showHelp, setShowHelp] = useState(false)
  const [showQuotes, setShowQuotes] = useState(false)
  const [dailyWisdom, setDailyWisdom] = useState<DailyWisdom | null>(null)

  const genres = useMemo(() => {
    const uniqueGenres = new Set<string>()
    featuredBooks.forEach((book) => {
      if (book.origin) {
        uniqueGenres.add(book.origin.toUpperCase())
      }
    })
    return Array.from(uniqueGenres)
  }, [])

  const availableGenres = [
    "LITERARY FICTION",
    "PSYCHOLOGICAL DRAMA",
    "PHILOSOPHICAL FICTION",
    "PHILOSOPHICAL ANTHOLOGY",
    "SELF-HELP",
    "TRUE STORY",
    "CONTEMPORARY FICTION",
    "MONTHLY SHORT STORIES", // New genre
    "ART & PHILOSOPHY", // New genre
    "ART & FASHION", // New genre
    "SHORT STORIES", // New genre
  ]

  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "> SYSTEM INITIALIZED",
    "> DIGITAL LIBRARY v2.3 LOADED",
    "> PHILOSOPHICAL QUOTES DATABASE LOADED",
    "> DAILY WISDOM SYSTEM ACTIVE",
    "> BLOG LINKS: hichammneimne.art.blog | hichammneimne.com | sqloom.net",
    "> YOUTUBE CHANNEL: UCl-e0hcm824Dc1cKIYVeIDw",
    "> TYPE 'DAILY' FOR TODAY'S WISDOM",
    "> TYPE 'HELP' FOR AVAILABLE COMMANDS",
  ])

  const allDisplayItems = [...featuredBooks, ...sandboxes.filter((s) => s.status === "coming-soon")]

  const filteredDisplayItems = allDisplayItems.filter((item) => {
    if ("bookId" in item && item.bookId) {
      // This is an active sandbox linked to a book
      const book = featuredBooks.find((b) => b.id === item.bookId)
      if (book) {
        const matchesSearch =
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.origin?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesGenre = selectedGenre === "" || book.origin?.toUpperCase() === selectedGenre
        return matchesSearch && matchesGenre
      }
      return false // If book not found for sandbox
    } else if ("status" in item && item.status === "coming-soon") {
      // This is a coming-soon sandbox
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch && selectedGenre === "" // Sandboxes don't have genres
    } else {
      // This is a regular book
      const book = item as BookNode
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.origin?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGenre = selectedGenre === "" || book.origin?.toUpperCase() === selectedGenre
      return matchesSearch && matchesGenre
    }
  })

  // Initialize daily wisdom
  useEffect(() => {
    setDailyWisdom(getDailyWisdom())
  }, [])

  // Retro scanning effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine((prev) => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(
      () => {
        setGlitchEffect(true)
        setTimeout(() => setGlitchEffect(false), 200)
      },
      3000 + Math.random() * 5000,
    )
    return () => clearInterval(glitchInterval)
  }, [])

  const handleShare = (book: BookNode, chapter?: { section: string; title: string }) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    const shareUrl = chapter
      ? `${baseUrl}?book=${book.id}&chapter=${encodeURIComponent(chapter.section)}`
      : `${baseUrl}?book=${book.id}`

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl)
      alert("Link copied to clipboard!")
    } else {
      alert(`Share this link: ${shareUrl}`)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const response = processCommand(searchQuery)
      const newHistory = [
        ...terminalHistory,
        `> ${searchQuery.toUpperCase()}`,
        response,
        `> FOUND ${filteredDisplayItems.length} RESULTS`,
      ]
      setTerminalHistory(newHistory.slice(-15)) // Keep last 15 entries

      // Clear the input after command processing
      if (!searchQuery.toLowerCase().startsWith("search ")) {
        setSearchQuery("")
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSearchActive(false)
      setSearchQuery("")
    }
  }

  // Removed handleShareChapter as it's replaced by the new handleShare function
  // const handleShareChapter = (url: string | undefined) => {
  //   if (url) {
  //     navigator.clipboard.writeText(url)
  //     toast({
  //       title: "Copied to clipboard!",
  //       description: "Chapter URL copied successfully.",
  //     })
  //   } else {
  //     toast({
  //       title: "Share Failed",
  //       description: "No URL available for this chapter.",
  //       variant: "destructive",
  //     })
  //   }
  // }

  const processCommand = (command: string) => {
    const cmd = command.toUpperCase().trim()
    const parts = cmd.split(" ")
    const action = parts[0]
    const parameter = parts.slice(1).join(" ")

    let response = ""
    // Removed showWordPress logic here

    switch (action) {
      case "HELP":
        response = `AVAILABLE COMMANDS:
> HELP - Show this help
> DAILY - Show daily wisdom
> BLOGS - Show blog links
> GENRES [genre] - Filter by genre (${genres.join(", ")})
> QUOTES [section] - Show quotes from The Truth Opposite Reality
> SANDBOXES - Show available sandboxes
> JULY READ - Access July's special read
> SEARCH [term] - Search books
> AUTHOR [name] - Filter by author
> BOOKS - Show all books
> CLEAR - Clear all filters
> STATUS - Show system status`
        setShowHelp(true)
        break

      case "DAILY":
        if (dailyWisdom) {
          response = `DAILY WISDOM - ${dailyWisdom.date}:\n\n"${dailyWisdom.quote}"\n\n   - From: ${dailyWisdom.context}\n   - Section: ${dailyWisdom.section}`
        } else {
          response = "DAILY WISDOM SYSTEM LOADING..."
        }
        break

      case "BLOGS":
        response = `HICHAM'S DIGITAL PRESENCE:
> hichammneimne.art.blog - Main philosophical blog
> hichammneimne.com - Official website
> sqloom.net - Technical writings`
        break

      case "SEARCH":
        if (parameter) {
          setSearchQuery(parameter.toLowerCase())
          response = `SEARCHING FOR: ${parameter}`
        } else {
          response = `CURRENT SEARCH: ${searchQuery || "NONE"}`
        }
        break

      case "GENRES":
        if (parameter && genres.includes(parameter)) {
          setSelectedGenre(parameter)
          response = `GENRE FILTER SET TO: ${parameter}`
        } else if (parameter) {
          response = `ERROR: GENRE '${parameter}' NOT FOUND. TYPE 'GENRES' FOR OPTIONS`
        } else {
          response = `AVAILABLE GENRES:\n${genres.map((g) => `> ${g}`).join("\n")}`
        }
        break

      case "QUOTES":
        if (parameter) {
          const sectionQuotes = philosophicalQuotes.filter((q) => q.section.toUpperCase().includes(parameter))
          if (sectionQuotes.length > 0) {
            response =
              `PHILOSOPHICAL QUOTES - ${parameter}:\n` +
              sectionQuotes.map((q) => `\n"${q.quote}"\n   - ${q.context}`).join("\n")
          } else {
            response = `NO QUOTES FOUND FOR SECTION: ${parameter}`
          }
        } else {
          response = `AVAILABLE QUOTE SECTIONS:\n${[...new Set(philosophicalQuotes.map((q) => q.section))].map((s) => `> ${s}`).join("\n")}`
        }
        break

      case "WISDOM":
        const randomQuote = philosophicalQuotes[Math.floor(Math.random() * philosophicalQuotes.length)]
        response = `RANDOM WISDOM:\n\n"${randomQuote.quote}"\n\n   - From: ${randomQuote.context}\n   - Section: ${randomQuote.section}`
        break

      case "LIST": // This case might be redundant if replaced by GENRES and SANDBOXES
        if (parts[1] === "GENRES") {
          response = `AVAILABLE GENRES:\n${genres.map((g) => `> ${g}`).join("\n")}`
        } else if (parts[1] === "SECTIONS") {
          const sections = [...new Set(philosophicalQuotes.map((q) => q.section))]
          response = `QUOTE SECTIONS:\n${sections.map((s) => `> ${s}`).join("\n")}`
        } else {
          response = `ERROR: UNKNOWN LIST COMMAND. TRY 'LIST GENRES' OR 'LIST SECTIONS'`
        }
        break

      case "SANDBOXES":
        response = `AVAILABLE SANDBOXES:\n${sandboxes
          .map((s) => `> ${s.title} (${s.status.toUpperCase()}) - ${s.description}`)
          .join("\n")}`
        break

      case "JULY": // Assuming this relates to the "JULY READ: DADA" sandbox
        if (parameter === "READ") {
          const dadaSandbox = sandboxes.find((s) => s.title === "JULY READ: DADA")
          if (dadaSandbox) {
            response = `ACCESSING JULY READ: ${dadaSandbox.title}. \nDescription: ${dadaSandbox.description}`
            // Potentially trigger an action, like setting a specific display state
          } else {
            response = "JULY READ SANDBOX NOT FOUND."
          }
        } else {
          response = "INVALID JULY COMMAND. TRY 'JULY READ'"
        }
        break

      case "AUTHOR":
        if (parameter) {
          const authorBooks = featuredBooks.filter((b) => b.author.toUpperCase().includes(parameter))
          if (authorBooks.length > 0) {
            response = `BOOKS BY AUTHOR '${parameter}':\n${authorBooks.map((b) => `> ${b.title}`).join("\n")}`
            // This could potentially update the filteredDisplayItems too
          } else {
            response = `NO BOOKS FOUND BY AUTHOR: ${parameter}`
          }
        } else {
          response = `PLEASE SPECIFY AUTHOR NAME. EXAMPLE: AUTHOR HICHAM`
        }
        break

      case "BOOKS":
        response = `DISPLAYING ALL BOOKS:\n${featuredBooks.map((b) => `> ${b.title} by ${b.author} (${b.origin})`).join("\n")}`
        break

      case "CLEAR":
        setSearchQuery("")
        setSelectedGenre("")
        response = "ALL FILTERS CLEARED"
        break

      case "STATUS":
        response = `SYSTEM STATUS:
> BOOKS LOADED: ${featuredBooks.length}
> SANDBOXES: ${sandboxes.length}
> CURRENT RESULTS: ${filteredDisplayItems.length}
> PHILOSOPHICAL QUOTES: ${philosophicalQuotes.length}
> DAILY WISDOM: ${dailyWisdom ? "ACTIVE" : "LOADING"}
> SEARCH FILTER: ${searchQuery || "NONE"}
> GENRE FILTER: ${selectedGenre || "NONE"}`
        break

      default:
        response = `ERROR: UNKNOWN COMMAND '${action}'. TYPE 'HELP' FOR COMMANDS`
    }

    return response
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Retro grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
        `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Scanning line effect */}
      <div
        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 transition-all duration-75"
        style={{ top: `${scanLine}%` }}
      />

      {/* Main container */}
      <div className={`relative z-10 p-4 ${glitchEffect ? "animate-pulse" : ""}`}>
        {/* Header with Terminal Search */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-4">
            DIGITAL LIBRARY
          </h1>
          <div className="text-cyan-400 text-lg md:text-xl font-mono tracking-wider mb-4">
            {">"} YEAR: 1980 {"<"} SYSTEM: ONLINE {"<"}
          </div>

          {/* Daily Wisdom Display */}
          {dailyWisdom && (
            <div className="max-w-4xl mx-auto mb-6">
              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500 rounded-lg p-4">
                <div className="text-purple-400 font-mono text-sm mb-2">
                  {">"} DAILY WISDOM {"<"}
                </div>
                <div className="text-cyan-300 font-mono text-sm italic">"{dailyWisdom.quote}"</div>
                <div className="text-pink-400 font-mono text-xs mt-2">
                  - {dailyWisdom.context} | {dailyWisdom.section}
                </div>
              </div>
            </div>
          )}

          {/* Terminal Search Interface */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-black border-2 border-green-500 rounded-lg p-3 shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-3 border-b border-green-500 pb-2">
                <div className="text-green-400 font-mono text-sm">SEARCH TERMINAL v2.3</div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Terminal History */}
              <div className="text-left mb-3 h-20 overflow-y-auto">
                {terminalHistory.map((line, index) => (
                  <div key={index} className="text-green-400 font-mono text-xs mb-1">
                    {line}
                  </div>
                ))}
              </div>

              {/* Search Input */}
              <form onSubmit={handleSearch} className="flex items-center">
                <span className="text-green-400 font-mono mr-2">{">"}</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setSearchActive(true)}
                  placeholder="ENTER COMMAND OR SEARCH QUERY..."
                  className="flex-1 bg-transparent text-green-400 font-mono outline-none placeholder-green-600 caret-green-400 text-sm"
                />
                <div className="text-green-400 font-mono animate-pulse ml-2">█</div>
              </form>

              {/* Quick Commands */}
              <div className="mt-2 text-green-600 font-mono text-xs">
                QUICK: HELP | DAILY | BLOGS | GENRES | QUOTES | SANDBOXES | JULY READ | SEARCH | AUTHOR | BOOKS | CLEAR
                | STATUS
              </div>
            </div>
          </div>

          <div className="mt-4 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 mx-auto w-64"></div>
        </div>

        {/* Main Content Grid - Books and Sandboxes */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-7xl mx-auto p-4 rounded-lg"
          style={{
            backgroundImage: `url('/images/hicham-reads-bg.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {filteredDisplayItems.map((item) => {
            const isBook = "title" in item && "author" in item
            const book = isBook ? (item as BookNode) : featuredBooks.find((b) => b.id === (item as Sandbox).bookId)
            const displayItem = book || item // Use book if sandbox links to one, else use sandbox itself

            return (
              <div
                key={displayItem.id}
                className={`
              group relative cursor-pointer transform transition-all duration-300 hover:scale-105
              ${selectedBook?.id === displayItem.id ? "scale-110 z-20" : ""}
            `}
                onClick={() => {
                  if (book) {
                    setSelectedBook(selectedBook?.id === book.id ? null : book)
                  } else if ("status" in displayItem && displayItem.status === "coming-soon") {
                    // Handle coming soon sandbox click, maybe show a message
                    alert(`${displayItem.title} is under construction.`)
                  }
                }}
              >
                {/* Item Card */}
                <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500 rounded-lg overflow-hidden shadow-2xl">
                  {/* Status indicator */}
                  <div
                    className={`absolute top-1 right-1 w-2 h-2 rounded-full z-10 ${
                      displayItem.status === "active"
                        ? "bg-green-400 animate-pulse"
                        : displayItem.status === "experimental"
                          ? "bg-yellow-400 animate-pulse"
                          : displayItem.status === "coming-soon"
                            ? "bg-yellow-400 animate-pulse"
                            : "bg-red-400"
                    }`}
                  ></div>

                  {/* Item cover/placeholder */}
                  <div className="relative h-32 overflow-hidden flex items-center justify-center">
                    {book ? (
                      <img
                        src={book.coverUrl || "/placeholder.svg"}
                        alt={book.title}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                      />
                    ) : (
                      <div className="text-yellow-400 font-mono text-2xl bg-gradient-to-br from-yellow-900/20 to-orange-900/20 w-full h-full flex items-center justify-center">
                        ?
                      </div>
                    )}
                    {/* Holographic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Item info */}
                  <div className="p-2 bg-gradient-to-r from-gray-900 to-gray-800">
                    <h3 className="text-cyan-400 font-bold text-xs mb-1 font-mono truncate">{displayItem.title}</h3>
                    {book && <p className="text-pink-400 text-xs mb-1">BY: {book.author.toUpperCase()}</p>}
                    {book?.origin && <div className="text-xs text-purple-400 font-mono truncate">{book.origin}</div>}
                    {"status" in displayItem && displayItem.status === "coming-soon" && (
                      <div className="text-xs text-yellow-500 font-mono">COMING SOON</div>
                    )}
                  </div>

                  {/* Animated border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-500 transition-all duration-300 rounded-lg"></div>
                </div>

                {/* Selection glow */}
                {selectedBook?.id === displayItem.id && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-lg blur-lg opacity-50 animate-pulse"></div>
                )}
              </div>
            )
          })}
        </div>

        {/* Help Modal */}
        {showHelp && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500 rounded-lg p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowHelp(false)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-400 text-2xl font-bold"
              >
                ×
              </button>
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-green-400 mb-2 font-mono">HELP DESK</h2>
                <p className="text-gray-400 text-sm">Command List</p>
              </div>
              <div className="text-left text-green-400 font-mono text-xs space-y-1">
                <p className="text-cyan-400">BASIC COMMANDS:</p>
                <p>&gt; HELP - Show this help</p>
                <p>&gt; DAILY - Show today's wisdom</p>
                <p>&gt; BLOGS - Show blog links</p>
                <p className="text-cyan-400">FILTERING COMMANDS:</p>
                <p>&gt; GENRES [genre] - Filter by genre (e.g., GENRES LITERARY FICTION)</p>
                <p>&gt; AUTHOR [name] - Filter by author (e.g. AUTHOR HICHAM)</p>
                <p>&gt; SEARCH [term] - Search books by title or author</p>
                <p>&gt; CLEAR - Clear all filters</p>
                <p className="text-cyan-400">CONTENT COMMANDS:</p>
                <p>&gt; QUOTES [section] - Show quotes (e.g., QUOTES THE TRUTH CORE)</p>
                <p>&gt; WISDOM - Show a random philosophical quote</p>
                <p>&gt; SANDBOXES - List available sandboxes</p>
                <p>&gt; JULY READ - Access the July special read sandbox</p>
                <p>&gt; BOOKS - Show all available books</p>
                <p className="text-cyan-400">SYSTEM COMMANDS:</p>
                <p>&gt; STATUS - Show system status</p>
              </div>
            </div>
          </div>
        )}

        {/* Selected book details modal */}
        {selectedBook && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500 rounded-lg p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedBook(null)}
                className="absolute top-4 right-4 text-pink-500 hover:text-pink-400 text-2xl font-bold"
              >
                ×
              </button>

              <div className="text-center">
                <div className="w-24 h-36 mx-auto mb-4 relative">
                  <img
                    src={selectedBook.coverUrl || "/placeholder.svg"}
                    alt={selectedBook.title}
                    className="w-full h-full object-cover rounded border-2 border-pink-500"
                  />
                </div>

                <h2 className="text-xl font-bold text-cyan-400 mb-2 font-mono">{selectedBook.title}</h2>
                {selectedBook.subtitle && (
                  <p className="text-purple-400 text-sm mb-3 font-mono italic">{selectedBook.subtitle}</p>
                )}
                <p className="text-pink-400 mb-3">Author: {selectedBook.author}</p>

                {selectedBook.origin && (
                  <p className="text-purple-400 text-sm mb-3 font-mono">Origin: {selectedBook.origin}</p>
                )}

                {selectedBook.description && (
                  <div className="mb-4 text-left">
                    <div className="text-green-400 font-mono text-sm mb-2 text-center">
                      {">"} DESCRIPTION {"<"}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed font-mono bg-black/50 p-3 rounded border border-cyan-500/30">
                      {selectedBook.description}
                    </p>
                  </div>
                )}

                {selectedBook.commentary && (
                  <div className="mb-4 text-left">
                    <div className="text-purple-400 font-mono text-sm mb-2 text-center">
                      {">"} AUTHOR'S NOTES {"<"}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed font-mono bg-black/50 p-3 rounded border border-purple-500/30">
                      {selectedBook.commentary}
                    </p>
                  </div>
                )}

                {selectedBook.chapters && (
                  <div className="mb-4 text-left max-h-48 overflow-y-auto">
                    <div className="text-green-400 font-mono text-sm mb-2 text-center">
                      {">"} STRUCTURE {"<"}
                    </div>
                    <div className="bg-black/50 p-3 rounded border border-cyan-500/30">
                      {selectedBook.chapters
                        .reduce((acc, chapter) => {
                          if (!acc.find((section) => section === chapter.section)) {
                            acc.push(chapter.section)
                          }
                          return acc
                        }, [])
                        .map((section, sectionIndex) => (
                          <div key={sectionIndex} className="mb-3">
                            <div className="text-pink-400 font-mono text-xs mb-1 font-bold">{section}</div>
                            {selectedBook.chapters
                              .filter((chapter) => chapter.section === section)
                              .map((chapter, chapterIndex) => (
                                <div key={chapterIndex} className="ml-3 mb-1 flex justify-between items-center">
                                  <div className="text-cyan-400 font-mono text-xs hover:text-cyan-300 cursor-pointer">
                                    {">"} {chapter.title}
                                  </div>
                                  {chapter.url && (
                                    <button
                                      onClick={() => handleShare(selectedBook, chapter)}
                                      className="text-green-500 hover:text-green-400 text-xs font-mono ml-2 px-2 py-1 border border-green-500 rounded"
                                    >
                                      SHARE
                                    </button>
                                  )}
                                </div>
                              ))}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-center space-x-3">
                  <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded font-mono hover:from-pink-600 hover:to-purple-600 transition-all text-sm">
                    READ
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded font-mono hover:from-cyan-600 hover:to-blue-600 transition-all text-sm">
                    DOWNLOAD
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-cyan-400 font-mono text-sm">
          <div className="mb-2">
            {">"} SYSTEM STATUS: OPERATIONAL {"<"}
          </div>
          <div className="text-pink-400 mb-2">WELCOME TO THE FUTURE OF READING</div>
          <div className="text-green-400 text-xs">BLOGS: hichammneimne.art.blog | hichammneimne.com | sqloom.net</div>
        </div>
      </div>
    </div>
  )
}
