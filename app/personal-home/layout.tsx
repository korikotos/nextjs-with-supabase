"use client"

import React from "react"

import { SQYLOOMAuthProvider } from "@/components/sqyloom-auth"

export default function PersonalHomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SQYLOOMAuthProvider>{children}</SQYLOOMAuthProvider>
}
