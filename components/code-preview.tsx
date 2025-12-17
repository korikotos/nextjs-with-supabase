"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface CodePreviewProps {
  code: string
}

export default function CodePreview({ code }: CodePreviewProps) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <button
        onClick={copyCode}
        className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors z-10"
      >
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-gray-300" />}
      </button>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code className="text-gray-300">
          {code.split("\n").map((line, index) => (
            <div key={index} className="min-h-[1.25rem]">
              <span className="text-gray-500 select-none mr-4 inline-block w-8 text-right">{index + 1}</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: line
                    .replace(/import|export|from|default/g, '<span class="text-purple-400">$&</span>')
                    .replace(/function|const|let|var/g, '<span class="text-blue-400">$&</span>')
                    .replace(/return/g, '<span class="text-pink-400">$&</span>')
                    .replace(/"([^"]*)"/g, '<span class="text-green-400">"$1"</span>')
                    .replace(/\/\/.*$/g, '<span class="text-gray-500">$&</span>'),
                }}
              />
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
