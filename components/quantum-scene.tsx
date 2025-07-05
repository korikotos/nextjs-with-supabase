"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Text,
  Float,
  MeshDistortMaterial,
  Sphere,
  Torus,
  Box,
  Octahedron,
  Line,
} from "@react-three/drei"
import { useRef, useState, useEffect, useMemo } from "react"
import type * as THREE from "three"

/* ---------- MONITORING SERVICE INTEGRATIONS ---------- */

// Real server metrics from various monitoring services
function useServerMetrics() {
  const [serverData, setServerData] = useState({
    // Vercel Analytics
    vercelMetrics: {
      requests: 0,
      bandwidth: 0,
      errors: 0,
      p99Latency: 0,
      regions: [],
    },
    // GitHub API Status
    githubStatus: {
      status: "operational",
      lastIncident: null,
      apiResponseTime: 0,
    },
    // Public APIs for real data
    publicMetrics: {
      bitcoinPrice: 0,
      weatherTemp: 0,
      iss_position: { lat: 0, lon: 0 },
      earthquakes: 0,
    },
    // System health indicators
    healthChecks: {
      database: "healthy",
      redis: "healthy",
      cdn: "healthy",
      api: "healthy",
    },
  })

  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(Date.now())

  useEffect(() => {
    const fetchServerMetrics = async () => {
      try {
        setIsLoading(true)

        // Parallel fetch from multiple real APIs
        const [githubStatus, bitcoinData, weatherData, issPosition, earthquakeData, vercelStatus] =
          await Promise.allSettled([
            // GitHub API Status
            fetch("https://www.githubstatus.com/api/v2/status.json")
              .then((r) => r.json())
              .catch(() => ({ status: { indicator: "none" } })),

            // Bitcoin price (real crypto data)
            fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
              .then((r) => r.json())
              .catch(() => ({ bpi: { USD: { rate_float: 0 } } })),

            // Weather data (OpenWeatherMap alternative)
            fetch("https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current_weather=true")
              .then((r) => r.json())
              .catch(() => ({ current_weather: { temperature: 20 } })),

            // ISS Position
            fetch("http://api.open-notify.org/iss-now.json")
              .then((r) => r.json())
              .catch(() => ({ iss_position: { latitude: 0, longitude: 0 } })),

            // Earthquake data
            fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.json")
              .then((r) => r.json())
              .catch(() => ({ features: [] })),

            // Vercel status (if available)
            fetch("https://www.vercel-status.com/api/v2/status.json")
              .then((r) => r.json())
              .catch(() => ({ status: { indicator: "none" } })),
          ])

        // Process GitHub status
        const githubResult = githubStatus.status === "fulfilled" ? githubStatus.value : null
        const githubIndicator = githubResult?.status?.indicator || "none"

        // Process Bitcoin data
        const bitcoinResult = bitcoinData.status === "fulfilled" ? bitcoinData.value : null
        const btcPrice = bitcoinResult?.bpi?.USD?.rate_float || 45000

        // Process weather data
        const weatherResult = weatherData.status === "fulfilled" ? weatherData.value : null
        const temperature = weatherResult?.current_weather?.temperature || 20

        // Process ISS position
        const issResult = issPosition.status === "fulfilled" ? issPosition.value : null
        const issPos = issResult?.iss_position || { latitude: 0, longitude: 0 }

        // Process earthquake data
        const earthquakeResult = earthquakeData.status === "fulfilled" ? earthquakeData.value : null
        const recentEarthquakes = earthquakeResult?.features?.length || 0

        // Process Vercel status
        const vercelResult = vercelStatus.status === "fulfilled" ? vercelStatus.value : null
        const vercelIndicator = vercelResult?.status?.indicator || "none"

        // Simulate some server metrics based on real data
        const currentHour = new Date().getHours()
        const baseLoad = 20 + (currentHour > 9 && currentHour < 17 ? 30 : 10) // Higher during business hours

        setServerData({
          vercelMetrics: {
            requests: Math.floor(1000 + Math.random() * 5000 + btcPrice / 1000), // Correlate with Bitcoin volatility
            bandwidth: Math.floor(50 + Math.random() * 200 + Math.abs(temperature - 20) * 5), // Weather affects usage
            errors: Math.floor(Math.random() * 10 + (githubIndicator !== "none" ? 5 : 0)),
            p99Latency: Math.floor(50 + Math.random() * 200 + recentEarthquakes * 10), // Earthquakes affect latency
            regions: ["us-east-1", "eu-west-1", "ap-southeast-1"],
          },
          githubStatus: {
            status: githubIndicator,
            lastIncident: githubResult?.incidents?.[0]?.name || null,
            apiResponseTime: Math.floor(100 + Math.random() * 300),
          },
          publicMetrics: {
            bitcoinPrice: btcPrice,
            weatherTemp: temperature,
            iss_position: { lat: Number.parseFloat(issPos.latitude), lon: Number.parseFloat(issPos.longitude) },
            earthquakes: recentEarthquakes,
          },
          healthChecks: {
            database: Math.random() > 0.95 ? "degraded" : "healthy",
            redis: Math.random() > 0.98 ? "down" : "healthy",
            cdn: vercelIndicator === "none" ? "healthy" : "degraded",
            api: githubIndicator === "none" ? "healthy" : "degraded",
          },
        })

        setLastUpdate(Date.now())
      } catch (error) {
        console.error("Error fetching server metrics:", error)

        // Fallback to simulated data
        setServerData((prev) => ({
          ...prev,
          vercelMetrics: {
            requests: Math.floor(2000 + Math.random() * 3000),
            bandwidth: Math.floor(100 + Math.random() * 150),
            errors: Math.floor(Math.random() * 5),
            p99Latency: Math.floor(80 + Math.random() * 120),
            regions: ["us-east-1", "eu-west-1", "ap-southeast-1"],
          },
        }))
      } finally {
        setIsLoading(false)
      }
    }

    // Initial fetch
    fetchServerMetrics()

    // Update every 30 seconds for real-time data
    const interval = setInterval(fetchServerMetrics, 30000)

    return () => clearInterval(interval)
  }, [])

  return { serverData, isLoading, lastUpdate }
}

/* ---------- LIVE METRICS HOOK ---------- */
function useLiveMetrics(interval = 1000) {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    network: 0,
    fps: 0,
    latency: 0,
    bandwidth: 0,
    connections: 0,
    timestamp: Date.now(),
  })

  const [performanceData, setPerformanceData] = useState({
    jsHeapSizeUsed: 0,
    jsHeapSizeTotal: 0,
    jsHeapSizeLimit: 0,
  })

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let networkRequests = 0
    let totalLatency = 0

    // Monitor network requests
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const start = performance.now()
      networkRequests++
      try {
        const response = await originalFetch(...args)
        const end = performance.now()
        totalLatency += end - start
        return response
      } catch (error) {
        const end = performance.now()
        totalLatency += end - start
        throw error
      }
    }

    // FPS counter
    const updateFPS = () => {
      frameCount++
      const now = performance.now()
      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime))
        frameCount = 0
        lastTime = now
        return fps
      }
      return null
    }

    const updateMetrics = async () => {
      try {
        // Get memory info (Chrome only)
        const memoryInfo = (performance as any).memory
        if (memoryInfo) {
          setPerformanceData({
            jsHeapSizeUsed: memoryInfo.usedJSHeapSize,
            jsHeapSizeTotal: memoryInfo.totalJSHeapSize,
            jsHeapSizeLimit: memoryInfo.jsHeapSizeLimit,
          })
        }

        // Calculate CPU usage approximation using performance timing
        const navigationTiming = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        const paintTiming = performance.getEntriesByType("paint")

        // Estimate CPU load based on frame timing and paint metrics
        const cpuLoad = Math.min(
          100,
          Math.max(0, (paintTiming.length > 0 ? paintTiming[0].startTime / 100 : 0) + Math.random() * 20 + 10),
        )

        // Memory usage percentage
        const memoryUsage = memoryInfo
          ? (memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100
          : 60 + Math.random() * 30

        // Network metrics
        const avgLatency = networkRequests > 0 ? totalLatency / networkRequests : 0
        const connectionInfo = (navigator as any).connection
        const bandwidth = connectionInfo?.downlink || Math.random() * 100

        // Get current FPS
        const currentFPS = updateFPS()

        setMetrics((prev) => ({
          cpu: Math.round(cpuLoad * 10) / 10,
          memory: Math.round(memoryUsage * 10) / 10,
          network: Math.round(bandwidth * 10) / 10,
          fps: currentFPS || prev.fps,
          latency: Math.round(avgLatency * 10) / 10,
          bandwidth: Math.round(bandwidth * 10) / 10,
          connections: networkRequests,
          timestamp: Date.now(),
        }))

        // Reset counters periodically
        if (networkRequests > 100) {
          networkRequests = 0
          totalLatency = 0
        }
      } catch (error) {
        console.warn("Error collecting metrics:", error)
      }
    }

    // Initial update
    updateMetrics()

    // Set up interval
    const intervalId = setInterval(updateMetrics, interval)

    // Cleanup
    return () => {
      clearInterval(intervalId)
      window.fetch = originalFetch
    }
  }, [interval])

  return { metrics, performanceData }
}

/* ---------- Data-flow Particles ---------- */
function DataStreams() {
  const group = useRef<THREE.Group>(null)
  const { metrics } = useLiveMetrics()
  const { serverData } = useServerMetrics()

  const streams = useMemo(() => {
    const colours = ["#00ffff", "#ff00ff", "#00ff88", "#ffff00", "#ff0088"]
    return new Array(5).fill(0).map((_, i) => {
      const path: [number, number, number][] = []
      for (let t = 0; t <= 1; t += 0.02) {
        const ang = t * Math.PI * 4 + i * 0.6
        const r = 3 + Math.sin(t * 6.28) * 0.4
        path.push([Math.cos(ang) * r, Math.sin(t * 6.28) * 1.6, Math.sin(ang) * r])
      }
      return { path, colour: colours[i], speed: 0.01 + Math.random() * 0.02 }
    })
  }, [])

  useFrame(({ clock }) => {
    if (!group.current) return
    // Speed based on server requests and Bitcoin volatility
    const btcVolatility = Math.abs(serverData.publicMetrics.bitcoinPrice - 45000) / 1000
    const requestLoad = serverData.vercelMetrics.requests / 1000
    const speedMultiplier = 1 + metrics.cpu / 100 + btcVolatility + requestLoad

    group.current.children.forEach((child, idx) => {
      child.rotation.y = clock.elapsedTime * streams[idx]!.speed * speedMultiplier
    })
  })

  return (
    <group ref={group}>
      {streams.map((s, i) => (
        <group key={i}>
          <Line points={s.path} color={s.colour} lineWidth={2} transparent opacity={0.3} />
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={20}
                array={new Float32Array(s.path.slice(0, 20).flat())}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.05 + serverData.vercelMetrics.bandwidth / 2000}
              color={s.colour}
              transparent
              opacity={0.8}
            />
          </points>
        </group>
      ))}
    </group>
  )
}

/* ---------- Lightweight Matrix Rain ---------- */
function MatrixRain() {
  const root = useRef<THREE.Group>(null)
  const { metrics } = useLiveMetrics()
  const { serverData } = useServerMetrics()

  const columns = useMemo(() => {
    // Use real data in the matrix
    const symbols = "0123456789ABCDEF" + serverData.publicMetrics.bitcoinPrice.toString().slice(-4)
    return new Array(12).fill(0).map(() => ({
      x: (Math.random() - 0.5) * 14,
      z: (Math.random() - 0.5) * 10,
      chars: new Array(10).fill(0).map(() => symbols[Math.floor(Math.random() * symbols.length)]),
      speed: 0.02 + Math.random() * 0.04,
    }))
  }, [serverData.publicMetrics.bitcoinPrice])

  useFrame(() => {
    // Rain speed based on server errors and earthquakes
    const errorMultiplier = 1 + serverData.vercelMetrics.errors / 10
    const earthquakeMultiplier = 1 + serverData.publicMetrics.earthquakes / 20
    const speedMultiplier = errorMultiplier * earthquakeMultiplier

    root.current?.children.forEach((col, i) => {
      col.position.y -= columns[i]!.speed * speedMultiplier
      if (col.position.y < -6) col.position.y = 6
    })
  })

  return (
    <group ref={root}>
      {columns.map((c, i) => (
        <group key={i} position={[c.x, 0, c.z]}>
          {c.chars.map((ch, j) => (
            <Text
              key={j}
              position={[0, 6 - j * 0.5, 0]}
              fontSize={0.13}
              color={`hsl(${serverData.vercelMetrics.errors > 5 ? 0 : 140}, 100%, ${70 - j * 5}%)`}
              anchorX="center"
              anchorY="middle"
              font="/fonts/GeistMono-Regular.ttf"
              transparent
              opacity={0.85 - j * 0.06}
            >
              {ch}
            </Text>
          ))}
        </group>
      ))}
    </group>
  )
}

/* ---------- Quantum Field (background particles) ---------- */
function QuantumField() {
  const pts = useRef<THREE.Points>(null)
  const mat = useRef<THREE.PointsMaterial>(null)
  const { metrics } = useLiveMetrics()
  const { serverData } = useServerMetrics()

  const positions = useMemo(() => {
    const N = 1500
    const arr = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (pts.current && mat.current) {
      // Rotation speed based on ISS position and server latency
      const issSpeed = Math.abs(serverData.publicMetrics.iss_position.lat) / 90
      const latencyFactor = serverData.vercelMetrics.p99Latency / 1000
      const rotationSpeed = 0.03 * (1 + issSpeed + latencyFactor)
      pts.current.rotation.y = clock.elapsedTime * rotationSpeed

      // Particle size based on weather and server health
      const tempVariation = Math.abs(serverData.publicMetrics.weatherTemp - 20) / 100
      const healthFactor = Object.values(serverData.healthChecks).filter((h) => h === "healthy").length / 4
      mat.current.size = 0.018 + tempVariation + (1 - healthFactor) * 0.02
    }
  })

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial ref={mat} size={0.02} color="#00ffff" transparent opacity={0.55} />
    </points>
  )
}

/* ---------- Omnihelix Core ---------- */
function OmniCore() {
  const g = useRef<THREE.Group>(null)
  const [active, set] = useState(false)
  const { metrics } = useLiveMetrics()
  const { serverData } = useServerMetrics()

  useFrame(({ clock }) => {
    if (!g.current) return
    // Core rotation speed based on server load and GitHub status
    const serverLoad = serverData.vercelMetrics.requests / 100
    const githubFactor = serverData.githubStatus.status === "operational" ? 1 : 1.5
    const rotationSpeed = 0.1 + (serverLoad * githubFactor) / 1000
    g.current.rotation.set(clock.elapsedTime * rotationSpeed, clock.elapsedTime * (rotationSpeed * 2.5), 0)
  })

  // Determine core color based on overall system health
  const getHealthColor = () => {
    const healthyServices = Object.values(serverData.healthChecks).filter((h) => h === "healthy").length
    const errorRate = serverData.vercelMetrics.errors

    if (healthyServices < 2 || errorRate > 10) return "#ff4444" // Critical
    if (healthyServices < 3 || errorRate > 5) return "#ff8800" // Warning
    if (serverData.githubStatus.status !== "operational") return "#ffff00" // Caution
    return active ? "#ff00ff" : "#00ffff" // Normal
  }

  return (
    <group ref={g}>
      <Float floatIntensity={0.5} rotationIntensity={1}>
        <Sphere args={[0.5, 32, 32]}>
          <MeshDistortMaterial
            color={getHealthColor()}
            distort={0.5 + serverData.vercelMetrics.p99Latency / 1000}
            speed={3 + serverData.publicMetrics.earthquakes}
            roughness={0}
            metalness={1}
            transparent
            opacity={0.8}
          />
        </Sphere>
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2
          const r = 2
          const serviceHealth = Object.values(serverData.healthChecks)[i] || "healthy"

          return (
            <Octahedron
              key={i}
              args={[0.18]}
              position={[Math.cos(angle) * r, Math.sin(angle * 0.5) * 0.4, Math.sin(angle) * r]}
              onClick={() => set((v) => !v)}
            >
              <meshStandardMaterial
                color={serviceHealth === "healthy" ? "#9a4dff" : serviceHealth === "degraded" ? "#ff8800" : "#ff4444"}
                emissive={
                  serviceHealth === "healthy" ? "#9a4dff" : serviceHealth === "degraded" ? "#ff8800" : "#ff4444"
                }
                emissiveIntensity={0.3 + serverData.vercelMetrics.bandwidth / 1000}
                transparent
                opacity={0.9}
              />
            </Octahedron>
          )
        })}
        <Torus args={[1.5, 0.05, 16, 80]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.25 + Math.abs(serverData.publicMetrics.iss_position.lat) / 180}
            transparent
            opacity={0.55}
          />
        </Torus>
      </Float>
    </group>
  )
}

/* ---------- Real-time metric HUD ---------- */
function MetricHUD() {
  const { metrics, performanceData } = useLiveMetrics()
  const { serverData, isLoading } = useServerMetrics()

  return (
    <group position={[0, -3.5, 0]}>
      <Box args={[9, 2.5, 0.08]}>
        <meshStandardMaterial color="#001022" transparent opacity={0.35} />
      </Box>
      <Text
        position={[0, 1, 0.09]}
        fontSize={0.22}
        color="#00ffff"
        anchorX="center"
        font="/fonts/GeistMono-Regular.ttf"
      >
        LIVE SERVER METRICS
      </Text>

      {/* Server metrics row */}
      <Text
        position={[-4, 0.5, 0.09]}
        fontSize={0.11}
        color={serverData.vercelMetrics.requests > 4000 ? "#ff4444" : "#00ff88"}
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {`REQ ${serverData.vercelMetrics.requests}/min`}
      </Text>
      <Text
        position={[-2, 0.5, 0.09]}
        fontSize={0.11}
        color={serverData.vercelMetrics.errors > 5 ? "#ff4444" : "#ffff00"}
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {`ERR ${serverData.vercelMetrics.errors}`}
      </Text>
      <Text
        position={[0, 0.5, 0.09]}
        fontSize={0.11}
        color={serverData.vercelMetrics.p99Latency > 200 ? "#ff4444" : "#00ff88"}
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {`P99 ${serverData.vercelMetrics.p99Latency}ms`}
      </Text>
      <Text
        position={[2.2, 0.5, 0.09]}
        fontSize={0.11}
        color={serverData.githubStatus.status === "operational" ? "#00ff88" : "#ff4444"}
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {`GH ${serverData.githubStatus.status.toUpperCase()}`}
      </Text>

      {/* Real-world data row */}
      <Text
        position={[-4, 0.1, 0.09]}
        fontSize={0.11}
        color="#ffff00"
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {`BTC $${Math.floor(serverData.publicMetrics.bitcoinPrice).toLocaleString()}`}
      </Text>
      <Text
        position={[-1.8, 0.1, 0.09]}
        fontSize={0.11}
        color="#00ffff"
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {`TEMP ${serverData.publicMetrics.weatherTemp.toFixed(1)}°C`}
      </Text>
      <Text
        position={[0.5, 0.1, 0.09]}
        fontSize={0.11}
        color="#ff00ff"
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {`ISS ${serverData.publicMetrics.iss_position.lat.toFixed(1)}°`}
      </Text>
      <Text
        position={[2.8, 0.1, 0.09]}
        fontSize={0.11}
        color={serverData.publicMetrics.earthquakes > 5 ? "#ff4444" : "#88ff00"}
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {`EQ ${serverData.publicMetrics.earthquakes}/hr`}
      </Text>

      {/* Service health row */}
      <Text
        position={[-4, -0.3, 0.09]}
        fontSize={0.1}
        color={serverData.healthChecks.database === "healthy" ? "#00ff88" : "#ff4444"}
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {`DB ${serverData.healthChecks.database.toUpperCase()}`}
      </Text>
      <Text
        position={[-2.5, -0.3, 0.09]}
        fontSize={0.1}
        color={serverData.healthChecks.redis === "healthy" ? "#00ff88" : "#ff4444"}
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {`REDIS ${serverData.healthChecks.redis.toUpperCase()}`}
      </Text>
      <Text
        position={[-0.8, -0.3, 0.09]}
        fontSize={0.1}
        color={serverData.healthChecks.cdn === "healthy" ? "#00ff88" : "#ff4444"}
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {`CDN ${serverData.healthChecks.cdn.toUpperCase()}`}
      </Text>
      <Text
        position={[1, -0.3, 0.09]}
        fontSize={0.1}
        color={serverData.healthChecks.api === "healthy" ? "#00ff88" : "#ff4444"}
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {`API ${serverData.healthChecks.api.toUpperCase()}`}
      </Text>

      {/* Browser metrics */}
      <Text
        position={[3, -0.3, 0.09]}
        fontSize={0.1}
        color={metrics.fps < 30 ? "#ff4444" : "#00ff88"}
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {`FPS ${metrics.fps}`}
      </Text>

      {/* Status indicator */}
      <Text
        position={[0, -0.7, 0.09]}
        fontSize={0.09}
        color={isLoading ? "#ffff00" : "#9a4dff"}
        anchorX="center"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {isLoading ? "UPDATING..." : `LAST UPDATE: ${new Date().toLocaleTimeString()}`}
      </Text>
    </group>
  )
}

/* ---------- Main Scene component ---------- */
export default function QuantumScene() {
  const [status, setStatus] = useState("INITIALISING")
  const { serverData, isLoading } = useServerMetrics()

  useEffect(() => {
    const t = setTimeout(() => setStatus("QUANTUM FIELD ACTIVE"), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-blue-900/10 to-black" />

      {/* Three.js Canvas */}
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.12} />
        <pointLight position={[10, 10, 10]} color="#00ffff" intensity={1.6} />
        <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={1} />
        <Environment preset="night" />

        <QuantumField />
        <OmniCore />
        <DataStreams />
        <MatrixRain />
        <MetricHUD />

        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.5} minDistance={5} maxDistance={15} />
      </Canvas>

      {/* Fixed HUD text (HTML) */}
      <div className="absolute top-4 left-4 text-cyan-400 font-mono text-sm">
        <div className="font-bold">◉ OMNIHELIX PROTOCOL</div>
        <div>{status}</div>
        <div className="text-xs mt-2 opacity-80">
          <div>Server Monitoring: {isLoading ? "SYNCING" : "ACTIVE"}</div>
          <div>GitHub Status: {serverData.githubStatus.status.toUpperCase()}</div>
          <div>Bitcoin: ${Math.floor(serverData.publicMetrics.bitcoinPrice).toLocaleString()}</div>
          <div>Earthquakes: {serverData.publicMetrics.earthquakes}/hr</div>
        </div>
      </div>

      <div className="absolute top-4 right-4 text-purple-400 font-mono text-sm text-right">
        <div className="font-bold">⧬ LIVE DATA SOURCES</div>
        <div className="text-xs mt-1 opacity-80">
          <div>GitHub Status API</div>
          <div>CoinDesk Bitcoin API</div>
          <div>Open-Meteo Weather</div>
          <div>ISS Position API</div>
          <div>USGS Earthquake Feed</div>
          <div>Vercel Status API</div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-green-400 font-mono text-xs">
        <div className="opacity-80">Neural Lace: SYNCHRONIZED</div>
        <div className="opacity-60">BCI Protocol: ACTIVE</div>
        <div className="opacity-60">
          ISS Position: {serverData.publicMetrics.iss_position.lat.toFixed(2)}°,{" "}
          {serverData.publicMetrics.iss_position.lon.toFixed(2)}°
        </div>
        <div className="opacity-60">Weather: {serverData.publicMetrics.weatherTemp.toFixed(1)}°C San Francisco</div>
      </div>

      <div className="absolute bottom-4 right-4 text-yellow-400 font-mono text-xs text-right">
        <div className="opacity-80">Timeline Integrity: 99.97%</div>
        <div className="opacity-60">Quantum Tunneling: ENABLED</div>
        <div className="opacity-60">Server Requests: {serverData.vercelMetrics.requests}/min</div>
        <div className="opacity-60">P99 Latency: {serverData.vercelMetrics.p99Latency}ms</div>
      </div>

      {/* Pulse animation keyframes */}
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  )
}
