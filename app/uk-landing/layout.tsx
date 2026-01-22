"use client"

import React from "react"

import { SQYLOOMAuthProvider } from "@/components/sqyloom-auth"

export default function UKLandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SQYLOOMAuthProvider>{children}</SQYLOOMAuthProvider>
}
