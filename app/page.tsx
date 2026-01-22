import QuantumTerminal from "@/components/quantum-terminal"
import GlobalFooter from "@/components/global-footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background grid-pattern">
      <QuantumTerminal />
      <GlobalFooter />
    </main>
  )
}
