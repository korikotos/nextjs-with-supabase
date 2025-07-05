import { Suspense } from "react"
import QuantumClient from "../components/quantum-client"

export default function Home() {
  return (
    <Suspense fallback={null}>
      <QuantumClient />
    </Suspense>
  )
}
