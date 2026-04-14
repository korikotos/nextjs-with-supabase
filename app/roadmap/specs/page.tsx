"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Database, Server, Shield, Zap, Globe, FileText, Settings, Lock, Activity } from "lucide-react"

interface TechnicalSpec {
  id: string
  title: string
  category: "core" | "ai" | "collaboration" | "infrastructure" | "legacy"
  status: "completed" | "in-progress" | "planned" | "research"
  architecture: {
    frontend: string[]
    backend: string[]
    database: string[]
    external: string[]
  }
  apis: {
    endpoints: ApiEndpoint[]
    authentication: string
    rateLimit: string
  }
  database: {
    schema: DatabaseTable[]
    relationships: string[]
  }
  performance: {
    responseTime: string
    throughput: string
    scalability: string
  }
  security: {
    authentication: string[]
    authorization: string[]
    dataProtection: string[]
  }
  testing: {
    unit: string
    integration: string
    e2e: string
    performance: string
  }
  deployment: {
    environment: string
    cicd: string
    monitoring: string
  }
  resources: {
    development: string
    infrastructure: string
    maintenance: string
  }
}

interface ApiEndpoint {
  method: string
  path: string
  description: string
  parameters?: string[]
  response: string
}

interface DatabaseTable {
  name: string
  fields: string[]
  indexes: string[]
}

const technicalSpecs: TechnicalSpec[] = [
  {
    id: "react-generator",
    title: "React Component Generator",
    category: "core",
    status: "completed",
    architecture: {
      frontend: [
        "Next.js 15 with App Router",
        "TypeScript for type safety",
        "Tailwind CSS for styling",
        "shadcn/ui component library",
        "Monaco Editor for code editing",
        "React Hook Form for form management",
      ],
      backend: [
        "Next.js API Routes",
        "OpenAI GPT-4 integration",
        "Template engine for code generation",
        "AST parsing for code validation",
        "Prettier for code formatting",
      ],
      database: ["Local Storage (browser)", "IndexedDB for large data", "Future: PostgreSQL migration"],
      external: ["OpenAI API", "GitHub API (future)", "NPM Registry API"],
    },
    apis: {
      endpoints: [
        {
          method: "POST",
          path: "/api/generate/component",
          description: "Generate React component from text prompt",
          parameters: ["prompt: string", "componentType: string", "stylePreferences: object"],
          response: "{ code: string, preview: string, metadata: object }",
        },
        {
          method: "GET",
          path: "/api/templates",
          description: "Retrieve available component templates",
          response: "{ templates: Template[] }",
        },
        {
          method: "POST",
          path: "/api/validate/code",
          description: "Validate generated React code",
          parameters: ["code: string"],
          response: "{ valid: boolean, errors: string[], suggestions: string[] }",
        },
      ],
      authentication: "API Key based (development), JWT tokens (production)",
      rateLimit: "100 requests/hour per user (free tier), 1000/hour (premium)",
    },
    database: {
      schema: [
        {
          name: "components",
          fields: [
            "id: UUID PRIMARY KEY",
            "user_id: UUID FOREIGN KEY",
            "prompt: TEXT",
            "generated_code: TEXT",
            "component_type: VARCHAR(50)",
            "metadata: JSONB",
            "created_at: TIMESTAMP",
            "updated_at: TIMESTAMP",
          ],
          indexes: ["user_id", "component_type", "created_at"],
        },
        {
          name: "templates",
          fields: [
            "id: UUID PRIMARY KEY",
            "name: VARCHAR(100)",
            "category: VARCHAR(50)",
            "template_code: TEXT",
            "variables: JSONB",
            "is_active: BOOLEAN",
          ],
          indexes: ["category", "is_active"],
        },
      ],
      relationships: ["components.user_id -> users.id", "component_usage -> components.id"],
    },
    performance: {
      responseTime: "< 3 seconds for component generation",
      throughput: "50 concurrent generations",
      scalability: "Horizontal scaling with load balancers",
    },
    security: {
      authentication: ["JWT tokens", "API key validation", "Rate limiting"],
      authorization: ["Role-based access control", "User-specific data isolation"],
      dataProtection: ["Input sanitization", "Code injection prevention", "XSS protection"],
    },
    testing: {
      unit: "Jest + React Testing Library (90% coverage)",
      integration: "API endpoint testing with Supertest",
      e2e: "Playwright for user journey testing",
      performance: "Artillery.js for load testing",
    },
    deployment: {
      environment: "Vercel (production), Docker containers (development)",
      cicd: "GitHub Actions with automated testing and deployment",
      monitoring: "Vercel Analytics + custom metrics dashboard",
    },
    resources: {
      development: "2 senior developers, 1 UI/UX designer (3 months)",
      infrastructure: "$200/month (Vercel Pro + OpenAI API)",
      maintenance: "1 developer (20% time) for updates and bug fixes",
    },
  },

  {
    id: "real-ai-images",
    title: "Real AI Image Generation",
    category: "ai",
    status: "in-progress",
    architecture: {
      frontend: [
        "React with TypeScript",
        "Canvas API for image manipulation",
        "WebGL for real-time effects",
        "Progressive Web App features",
        "Image optimization and caching",
      ],
      backend: [
        "Node.js with Express",
        "Multiple AI service integrations",
        "Image processing pipeline",
        "Queue system for batch processing",
        "CDN integration for image delivery",
      ],
      database: [
        "PostgreSQL for metadata",
        "Redis for caching and queues",
        "AWS S3 for image storage",
        "Elasticsearch for image search",
      ],
      external: [
        "OpenAI DALL-E 3 API",
        "Stability AI API",
        "Midjourney API (when available)",
        "Replicate API for open-source models",
      ],
    },
    apis: {
      endpoints: [
        {
          method: "POST",
          path: "/api/images/generate",
          description: "Generate image from text prompt",
          parameters: ["prompt: string", "model: string", "style: string", "dimensions: object", "quality: string"],
          response: "{ imageUrl: string, metadata: object, generationId: string }",
        },
        {
          method: "GET",
          path: "/api/images/status/:id",
          description: "Check generation status",
          response: "{ status: string, progress: number, estimatedTime: number }",
        },
        {
          method: "POST",
          path: "/api/images/enhance",
          description: "Enhance existing image",
          parameters: ["imageUrl: string", "enhancements: string[]"],
          response: "{ enhancedImageUrl: string, metadata: object }",
        },
      ],
      authentication: "OAuth 2.0 + JWT tokens",
      rateLimit: "10 images/hour (free), 100/hour (premium), 1000/hour (enterprise)",
    },
    database: {
      schema: [
        {
          name: "image_generations",
          fields: [
            "id: UUID PRIMARY KEY",
            "user_id: UUID FOREIGN KEY",
            "prompt: TEXT",
            "model_used: VARCHAR(50)",
            "parameters: JSONB",
            "image_url: TEXT",
            "thumbnail_url: TEXT",
            "status: VARCHAR(20)",
            "generation_time: INTEGER",
            "cost: DECIMAL(10,4)",
            "created_at: TIMESTAMP",
          ],
          indexes: ["user_id", "status", "created_at", "model_used"],
        },
        {
          name: "ai_models",
          fields: [
            "id: UUID PRIMARY KEY",
            "name: VARCHAR(100)",
            "provider: VARCHAR(50)",
            "api_endpoint: TEXT",
            "cost_per_image: DECIMAL(10,4)",
            "max_resolution: VARCHAR(20)",
            "capabilities: JSONB",
            "is_active: BOOLEAN",
          ],
          indexes: ["provider", "is_active"],
        },
      ],
      relationships: [
        "image_generations.user_id -> users.id",
        "image_generations.model_id -> ai_models.id",
        "image_collections -> image_generations.id",
      ],
    },
    performance: {
      responseTime: "5-30 seconds depending on model and complexity",
      throughput: "200 concurrent generations across all models",
      scalability: "Auto-scaling with Kubernetes, queue-based processing",
    },
    security: {
      authentication: ["OAuth 2.0 with multiple providers", "API key management", "Session management"],
      authorization: ["Usage quotas per user tier", "Content filtering", "NSFW detection"],
      dataProtection: ["Image watermarking", "Encrypted storage", "GDPR compliance"],
    },
    testing: {
      unit: "Jest with 85% coverage for business logic",
      integration: "API testing with multiple AI providers",
      e2e: "Automated image generation workflows",
      performance: "Load testing with realistic image generation patterns",
    },
    deployment: {
      environment: "AWS EKS with auto-scaling groups",
      cicd: "GitLab CI/CD with staging and production environments",
      monitoring: "Prometheus + Grafana + custom AI model performance metrics",
    },
    resources: {
      development: "3 senior developers, 1 ML engineer, 1 DevOps (6 months)",
      infrastructure: "$1,500/month (AWS + AI API costs)",
      maintenance: "2 developers (40% time) for model updates and optimization",
    },
  },

  {
    id: "cloud-storage",
    title: "Cloud Storage & Sync",
    category: "infrastructure",
    status: "planned",
    architecture: {
      frontend: [
        "Progressive sync indicators",
        "Offline-first architecture",
        "Conflict resolution UI",
        "Real-time sync status",
        "Bandwidth optimization",
      ],
      backend: [
        "Microservices architecture",
        "Event-driven sync system",
        "Conflict resolution algorithms",
        "Data deduplication",
        "Multi-region replication",
      ],
      database: [
        "PostgreSQL for metadata",
        "Redis for real-time sync",
        "AWS S3 for file storage",
        "DynamoDB for sync logs",
      ],
      external: ["AWS CloudFront CDN", "WebSocket connections", "Push notification services"],
    },
    apis: {
      endpoints: [
        {
          method: "POST",
          path: "/api/sync/upload",
          description: "Upload file with sync metadata",
          parameters: ["file: multipart", "metadata: object", "syncVersion: number"],
          response: "{ fileId: string, syncStatus: string, conflicts: object[] }",
        },
        {
          method: "GET",
          path: "/api/sync/status",
          description: "Get sync status for user",
          response: "{ pendingUploads: number, pendingDownloads: number, conflicts: object[] }",
        },
        {
          method: "POST",
          path: "/api/sync/resolve-conflict",
          description: "Resolve sync conflict",
          parameters: ["conflictId: string", "resolution: string"],
          response: "{ resolved: boolean, newVersion: object }",
        },
      ],
      authentication: "JWT with refresh tokens + device fingerprinting",
      rateLimit: "1GB/day upload (free), 10GB/day (premium), unlimited (enterprise)",
    },
    database: {
      schema: [
        {
          name: "user_files",
          fields: [
            "id: UUID PRIMARY KEY",
            "user_id: UUID FOREIGN KEY",
            "file_path: TEXT",
            "file_hash: VARCHAR(64)",
            "file_size: BIGINT",
            "mime_type: VARCHAR(100)",
            "sync_version: INTEGER",
            "device_id: UUID",
            "last_modified: TIMESTAMP",
            "is_deleted: BOOLEAN",
          ],
          indexes: ["user_id", "file_hash", "sync_version", "last_modified"],
        },
        {
          name: "sync_conflicts",
          fields: [
            "id: UUID PRIMARY KEY",
            "file_id: UUID FOREIGN KEY",
            "conflict_type: VARCHAR(50)",
            "local_version: JSONB",
            "remote_version: JSONB",
            "resolution_status: VARCHAR(20)",
            "created_at: TIMESTAMP",
          ],
          indexes: ["file_id", "resolution_status", "created_at"],
        },
      ],
      relationships: [
        "user_files.user_id -> users.id",
        "sync_conflicts.file_id -> user_files.id",
        "sync_logs -> user_files.id",
      ],
    },
    performance: {
      responseTime: "< 100ms for sync status, < 5s for file operations",
      throughput: "10,000 concurrent sync operations",
      scalability: "Multi-region deployment with eventual consistency",
    },
    security: {
      authentication: ["Multi-device authentication", "Device trust management", "Session invalidation"],
      authorization: ["File-level permissions", "Sharing controls", "Access audit logs"],
      dataProtection: ["End-to-end encryption", "Zero-knowledge architecture", "Secure key management"],
    },
    testing: {
      unit: "Jest with 90% coverage for sync logic",
      integration: "Multi-device sync testing",
      e2e: "Cross-platform sync scenarios",
      performance: "Large file and concurrent user testing",
    },
    deployment: {
      environment: "AWS multi-region with auto-failover",
      cicd: "Blue-green deployment with rollback capabilities",
      monitoring: "Real-time sync metrics + user experience monitoring",
    },
    resources: {
      development: "4 senior developers, 2 DevOps engineers (8 months)",
      infrastructure: "$3,000/month (AWS multi-region + CDN)",
      maintenance: "2 developers (60% time) for sync optimization and support",
    },
  },

  {
    id: "ai-dyes",
    title: "Personal AI Dyes",
    category: "legacy",
    status: "research",
    architecture: {
      frontend: [
        "AI personality visualization",
        "Behavioral pattern displays",
        "Interactive AI conversations",
        "Learning progress indicators",
        "Privacy controls interface",
      ],
      backend: [
        "Machine learning pipeline",
        "Behavioral analysis engine",
        "Natural language processing",
        "Personality modeling system",
        "Ethical AI frameworks",
      ],
      database: [
        "Vector database for embeddings",
        "Time-series database for behavior",
        "Graph database for relationships",
        "Encrypted personal data store",
      ],
      external: [
        "Advanced language models",
        "Behavioral analysis APIs",
        "Privacy-preserving ML services",
        "Federated learning networks",
      ],
    },
    apis: {
      endpoints: [
        {
          method: "POST",
          path: "/api/ai-dye/interact",
          description: "Interact with personal AI",
          parameters: ["message: string", "context: object", "learningMode: boolean"],
          response: "{ response: string, personalityUpdate: object, learningInsights: object }",
        },
        {
          method: "GET",
          path: "/api/ai-dye/personality",
          description: "Get current AI personality profile",
          response: "{ traits: object, preferences: object, evolutionHistory: object[] }",
        },
        {
          method: "POST",
          path: "/api/ai-dye/train",
          description: "Train AI with new behavioral data",
          parameters: ["behaviorData: object", "feedback: object"],
          response: "{ trainingStatus: string, modelVersion: string }",
        },
      ],
      authentication: "Biometric + multi-factor authentication",
      rateLimit: "Unlimited interactions, rate-limited training updates",
    },
    database: {
      schema: [
        {
          name: "ai_personalities",
          fields: [
            "id: UUID PRIMARY KEY",
            "user_id: UUID FOREIGN KEY",
            "personality_vector: VECTOR(1536)",
            "traits: JSONB",
            "preferences: JSONB",
            "learning_history: JSONB",
            "model_version: VARCHAR(50)",
            "last_interaction: TIMESTAMP",
            "evolution_stage: INTEGER",
          ],
          indexes: ["user_id", "model_version", "evolution_stage"],
        },
        {
          name: "behavioral_patterns",
          fields: [
            "id: UUID PRIMARY KEY",
            "ai_personality_id: UUID FOREIGN KEY",
            "pattern_type: VARCHAR(100)",
            "pattern_data: JSONB",
            "confidence_score: FLOAT",
            "detected_at: TIMESTAMP",
            "validated: BOOLEAN",
          ],
          indexes: ["ai_personality_id", "pattern_type", "confidence_score"],
        },
      ],
      relationships: [
        "ai_personalities.user_id -> users.id",
        "behavioral_patterns.ai_personality_id -> ai_personalities.id",
        "interaction_logs -> ai_personalities.id",
      ],
    },
    performance: {
      responseTime: "< 2 seconds for AI responses, < 30 seconds for personality updates",
      throughput: "1,000 concurrent AI interactions",
      scalability: "Distributed AI inference with model sharding",
    },
    security: {
      authentication: ["Biometric verification", "Behavioral authentication", "Zero-trust architecture"],
      authorization: ["Granular privacy controls", "Data sovereignty", "Consent management"],
      dataProtection: ["Homomorphic encryption", "Differential privacy", "Secure multi-party computation"],
    },
    testing: {
      unit: "Specialized ML testing frameworks with bias detection",
      integration: "AI behavior consistency testing",
      e2e: "Long-term personality evolution validation",
      performance: "AI inference optimization and scaling tests",
    },
    deployment: {
      environment: "Hybrid cloud with edge computing for privacy",
      cicd: "ML-specific CI/CD with model versioning and A/B testing",
      monitoring: "AI ethics monitoring + personality drift detection",
    },
    resources: {
      development: "6 ML engineers, 2 AI ethics specialists, 3 backend developers (18 months)",
      infrastructure: "$10,000/month (specialized ML hardware + privacy infrastructure)",
      maintenance: "4 specialists (80% time) for continuous learning and ethical oversight",
    },
  },

  {
    id: "blockchain-legacy",
    title: "Blockchain Legacy System",
    category: "legacy",
    status: "research",
    architecture: {
      frontend: [
        "Web3 wallet integration",
        "Blockchain transaction UI",
        "Legacy verification interface",
        "Decentralized storage browser",
        "Smart contract interaction",
      ],
      backend: [
        "Blockchain node infrastructure",
        "Smart contract development",
        "IPFS integration",
        "Cross-chain compatibility",
        "Legacy preservation protocols",
      ],
      database: [
        "Distributed ledger",
        "IPFS for large files",
        "Arweave for permanent storage",
        "Traditional backup systems",
      ],
      external: ["Ethereum/Polygon networks", "IPFS network", "Arweave permaweb", "Cross-chain bridges"],
    },
    apis: {
      endpoints: [
        {
          method: "POST",
          path: "/api/legacy/create",
          description: "Create new legacy record on blockchain",
          parameters: ["legacyData: object", "preservationLevel: string", "accessRules: object"],
          response: "{ transactionHash: string, legacyId: string, storageProof: object }",
        },
        {
          method: "GET",
          path: "/api/legacy/verify/:id",
          description: "Verify legacy record integrity",
          response: "{ verified: boolean, blockchainProof: object, storageStatus: object }",
        },
        {
          method: "POST",
          path: "/api/legacy/access-request",
          description: "Request access to legacy data",
          parameters: ["legacyId: string", "requestorId: string", "purpose: string"],
          response: "{ requestId: string, status: string, estimatedApproval: string }",
        },
      ],
      authentication: "Blockchain wallet signatures + multi-sig verification",
      rateLimit: "Based on gas costs and network congestion",
    },
    database: {
      schema: [
        {
          name: "legacy_records",
          fields: [
            "id: UUID PRIMARY KEY",
            "blockchain_hash: VARCHAR(66)",
            "ipfs_hash: VARCHAR(59)",
            "owner_address: VARCHAR(42)",
            "access_rules: JSONB",
            "preservation_level: VARCHAR(50)",
            "creation_block: BIGINT",
            "last_verified: TIMESTAMP",
            "storage_redundancy: INTEGER",
          ],
          indexes: ["blockchain_hash", "owner_address", "creation_block"],
        },
        {
          name: "access_grants",
          fields: [
            "id: UUID PRIMARY KEY",
            "legacy_record_id: UUID FOREIGN KEY",
            "grantee_address: VARCHAR(42)",
            "access_level: VARCHAR(50)",
            "granted_at: TIMESTAMP",
            "expires_at: TIMESTAMP",
            "smart_contract_address: VARCHAR(42)",
          ],
          indexes: ["legacy_record_id", "grantee_address", "expires_at"],
        },
      ],
      relationships: [
        "legacy_records.owner_id -> users.id",
        "access_grants.legacy_record_id -> legacy_records.id",
        "verification_logs -> legacy_records.id",
      ],
    },
    performance: {
      responseTime: "15-60 seconds for blockchain transactions",
      throughput: "Limited by blockchain network capacity",
      scalability: "Layer 2 solutions for improved throughput",
    },
    security: {
      authentication: ["Multi-signature wallets", "Hardware security modules", "Biometric backup"],
      authorization: ["Smart contract access controls", "Time-locked permissions", "Multi-generational keys"],
      dataProtection: ["Immutable storage", "Cryptographic proofs", "Quantum-resistant encryption"],
    },
    testing: {
      unit: "Smart contract testing with Hardhat/Foundry",
      integration: "Cross-chain functionality testing",
      e2e: "Long-term preservation simulation",
      performance: "Blockchain network stress testing",
    },
    deployment: {
      environment: "Multi-blockchain deployment with redundancy",
      cicd: "Smart contract deployment automation with security audits",
      monitoring: "Blockchain health monitoring + legacy integrity checks",
    },
    resources: {
      development: "4 blockchain developers, 2 security auditors, 1 legal specialist (24 months)",
      infrastructure: "$5,000/month (node infrastructure + gas costs)",
      maintenance: "3 specialists (60% time) for network maintenance and security updates",
    },
  },
]

export default function TechnicalSpecsPage() {
  const [selectedSpec, setSelectedSpec] = useState<string>(technicalSpecs[0].id)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["architecture"]))

  const currentSpec = technicalSpecs.find((spec) => spec.id === selectedSpec)!

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const categoryColors = {
    core: "bg-blue-500",
    ai: "bg-purple-500",
    collaboration: "bg-green-500",
    infrastructure: "bg-orange-500",
    legacy: "bg-pink-500",
  }

  const statusColors = {
    completed: "border-green-500 text-green-400",
    "in-progress": "border-blue-500 text-blue-400",
    planned: "border-yellow-500 text-yellow-400",
    research: "border-purple-500 text-purple-400",
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <FileText className="mr-3 h-8 w-8 text-blue-400" />
            Technical Specifications
          </h1>
          <p className="text-gray-300">Detailed technical architecture and implementation details</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar - Feature List */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm sticky top-4">
              <CardHeader>
                <CardTitle className="text-white text-lg">Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {technicalSpecs.map((spec) => (
                    <Button
                      key={spec.id}
                      variant={selectedSpec === spec.id ? "default" : "ghost"}
                      className={`w-full justify-start text-left ${
                        selectedSpec === spec.id
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "text-gray-300 hover:text-white hover:bg-gray-700"
                      }`}
                      onClick={() => setSelectedSpec(spec.id)}
                    >
                      <div className="flex items-center w-full">
                        <div className={`w-3 h-3 rounded-full ${categoryColors[spec.category]} mr-3`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{spec.title}</div>
                          <Badge variant="outline" className={`${statusColors[spec.status]} text-xs mt-1`} size="sm">
                            {spec.status.replace("-", " ")}
                          </Badge>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Feature Header */}
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-2xl">{currentSpec.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className={statusColors[currentSpec.status]}>
                          {currentSpec.status.replace("-", " ")}
                        </Badge>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {currentSpec.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Technical Details */}
              <Tabs defaultValue="architecture" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
                  <TabsTrigger value="architecture" className="data-[state=active]:bg-purple-600">
                    <Server className="h-4 w-4 mr-2" />
                    Architecture
                  </TabsTrigger>
                  <TabsTrigger value="apis" className="data-[state=active]:bg-purple-600">
                    <Code className="h-4 w-4 mr-2" />
                    APIs
                  </TabsTrigger>
                  <TabsTrigger value="database" className="data-[state=active]:bg-purple-600">
                    <Database className="h-4 w-4 mr-2" />
                    Database
                  </TabsTrigger>
                  <TabsTrigger value="operations" className="data-[state=active]:bg-purple-600">
                    <Settings className="h-4 w-4 mr-2" />
                    Operations
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="architecture" className="space-y-4">
                  {/* Frontend Architecture */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center">
                        <Globe className="mr-2 h-5 w-5 text-blue-400" />
                        Frontend Architecture
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {currentSpec.architecture.frontend.map((item, index) => (
                          <li key={index} className="flex items-center text-gray-300">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Backend Architecture */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center">
                        <Server className="mr-2 h-5 w-5 text-green-400" />
                        Backend Architecture
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {currentSpec.architecture.backend.map((item, index) => (
                          <li key={index} className="flex items-center text-gray-300">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Database & External */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center">
                          <Database className="mr-2 h-5 w-5 text-purple-400" />
                          Database
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {currentSpec.architecture.database.map((item, index) => (
                            <li key={index} className="flex items-center text-gray-300">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center">
                          <Globe className="mr-2 h-5 w-5 text-orange-400" />
                          External Services
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {currentSpec.architecture.external.map((item, index) => (
                            <li key={index} className="flex items-center text-gray-300">
                              <div className="w-2 h-2 bg-orange-400 rounded-full mr-3" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="apis" className="space-y-4">
                  {/* API Endpoints */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">API Endpoints</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {currentSpec.apis.endpoints.map((endpoint, index) => (
                          <div key={index} className="border border-gray-600 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge
                                variant="outline"
                                className={`${
                                  endpoint.method === "GET"
                                    ? "border-green-500 text-green-400"
                                    : endpoint.method === "POST"
                                      ? "border-blue-500 text-blue-400"
                                      : "border-orange-500 text-orange-400"
                                }`}
                              >
                                {endpoint.method}
                              </Badge>
                              <code className="text-purple-400 font-mono">{endpoint.path}</code>
                            </div>
                            <p className="text-gray-300 mb-3">{endpoint.description}</p>
                            {endpoint.parameters && (
                              <div className="mb-3">
                                <h4 className="text-white font-semibold mb-2">Parameters:</h4>
                                <ul className="space-y-1">
                                  {endpoint.parameters.map((param, paramIndex) => (
                                    <li key={paramIndex} className="text-gray-400 font-mono text-sm">
                                      • {param}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            <div>
                              <h4 className="text-white font-semibold mb-2">Response:</h4>
                              <code className="text-green-400 font-mono text-sm bg-gray-900 p-2 rounded block">
                                {endpoint.response}
                              </code>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Authentication & Rate Limiting */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center">
                          <Lock className="mr-2 h-5 w-5 text-yellow-400" />
                          Authentication
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">{currentSpec.apis.authentication}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center">
                          <Activity className="mr-2 h-5 w-5 text-red-400" />
                          Rate Limiting
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">{currentSpec.apis.rateLimit}</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="database" className="space-y-4">
                  {/* Database Schema */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Database Schema</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {currentSpec.database.schema.map((table, index) => (
                          <div key={index} className="border border-gray-600 rounded-lg p-4">
                            <h3 className="text-white font-semibold text-lg mb-3">{table.name}</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-gray-300 font-semibold mb-2">Fields:</h4>
                                <ul className="space-y-1">
                                  {table.fields.map((field, fieldIndex) => (
                                    <li key={fieldIndex} className="text-gray-400 font-mono text-sm">
                                      {field}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-gray-300 font-semibold mb-2">Indexes:</h4>
                                <ul className="space-y-1">
                                  {table.indexes.map((index, indexIndex) => (
                                    <li key={indexIndex} className="text-gray-400 font-mono text-sm">
                                      {index}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Relationships */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Relationships</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {currentSpec.database.relationships.map((relationship, index) => (
                          <li key={index} className="flex items-center text-gray-300">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                            <code className="font-mono text-sm">{relationship}</code>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="operations" className="space-y-4">
                  {/* Performance */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center">
                        <Zap className="mr-2 h-5 w-5 text-yellow-400" />
                        Performance Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-white font-semibold mb-2">Response Time</h4>
                          <p className="text-gray-300">{currentSpec.performance.responseTime}</p>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">Throughput</h4>
                          <p className="text-gray-300">{currentSpec.performance.throughput}</p>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">Scalability</h4>
                          <p className="text-gray-300">{currentSpec.performance.scalability}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Security */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center">
                        <Shield className="mr-2 h-5 w-5 text-green-400" />
                        Security Measures
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-white font-semibold mb-2">Authentication</h4>
                          <ul className="space-y-1">
                            {currentSpec.security.authentication.map((item, index) => (
                              <li key={index} className="text-gray-300 text-sm">
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">Authorization</h4>
                          <ul className="space-y-1">
                            {currentSpec.security.authorization.map((item, index) => (
                              <li key={index} className="text-gray-300 text-sm">
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">Data Protection</h4>
                          <ul className="space-y-1">
                            {currentSpec.security.dataProtection.map((item, index) => (
                              <li key={index} className="text-gray-300 text-sm">
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Testing & Deployment */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Testing Strategy</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-white font-semibold">Unit Testing</h4>
                            <p className="text-gray-300 text-sm">{currentSpec.testing.unit}</p>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">Integration</h4>
                            <p className="text-gray-300 text-sm">{currentSpec.testing.integration}</p>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">End-to-End</h4>
                            <p className="text-gray-300 text-sm">{currentSpec.testing.e2e}</p>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">Performance</h4>
                            <p className="text-gray-300 text-sm">{currentSpec.testing.performance}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Deployment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-white font-semibold">Environment</h4>
                            <p className="text-gray-300 text-sm">{currentSpec.deployment.environment}</p>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">CI/CD</h4>
                            <p className="text-gray-300 text-sm">{currentSpec.deployment.cicd}</p>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">Monitoring</h4>
                            <p className="text-gray-300 text-sm">{currentSpec.deployment.monitoring}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Resource Requirements */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Resource Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-white font-semibold mb-2">Development</h4>
                          <p className="text-gray-300">{currentSpec.resources.development}</p>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">Infrastructure</h4>
                          <p className="text-gray-300">{currentSpec.resources.infrastructure}</p>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">Maintenance</h4>
                          <p className="text-gray-300">{currentSpec.resources.maintenance}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
