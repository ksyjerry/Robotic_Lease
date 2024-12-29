"use client"

import Image from "next/image"
import { SidebarNav } from "@/components/sidebar-nav"
import { FeatureCard } from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { HomeIcon, FileText, HelpCircle, Settings, Database, Cog, FileSpreadsheet, Menu } from 'lucide-react'
import { useSidebar } from "@/components/sidebar-provider"
import Link from 'next/link'

const sidebarNavItems = [
  {
    title: "홈",
    href: "/",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    title: "리스계약 AI 분석",
    href: "/lease-ai-analysis",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "계약 관리",
    href: "/contract-management",
    icon: <Database className="h-5 w-5" />,
  },
  {
    title: "리스회계",
    href: "/lease-accounting",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "고객 지원",
    href: "/support",
    icon: <HelpCircle className="h-5 w-5" />,
  },
]

export default function Home() {
  const { isOpen, toggle } = useSidebar()

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
        <div className="h-16 flex items-center px-6 bg-gray-900 text-white">
          {isOpen ? (
            <div className="flex items-center">
              <Image
                src = "/images/pwc_logo_trans.png"
                alt="Robotic Lease Logo"
                width={195}
                height={52}
                className="h-10 w-auto"
              />
              <span className="ml-2 text-sm font-semibold">Digital Platform</span>
            </div>
          ) : (
            <Image
              src = "/images/pwc_logo_trans.png"
              alt="Robotic Lease Logo"
              width={58}
              height={58}
              className="h-10 w-10"
            />
          )}
        </div>
        <SidebarNav items={sidebarNavItems} />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="h-16 flex items-center px-6 bg-white border-b">
          <Button variant="ghost" size="icon" onClick={toggle} className="mr-4">
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Robotic Lease</h1>
        </header>

        <main className="p-6 space-y-12">
          {/* Welcome Section */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  Robotic Lease에 오신 것을 환영합니다
                </h2>
                <p className="text-gray-600 mb-6">
                  Robotic Lease는 AI기반의 리스 자산 관리와 회계처리를 위한 삼일회계법인 Digital Solution입니다.
                </p>
                <p className="text-gray-600">
                  AI를 활용하여 복잡한 리스 계약을 식별하고 정보를 추출하며, 리스 자산을 체계적으로 관리할 수 있는 플랫폼을 제공합니다. 또한 K-IFRS에 따른 회계처리를 이해와 검증 가능한 형태로 제공하여 사용자의 편의를 극대화하고 있습니다. 
                </p>
                <Link href="/lease-ai-analysis">
                  <Button className="mt-6">시작하기</Button>
                </Link>
              </div>
              <div className="relative h-64">
                <Image
                  // src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BIs.jpg-A5Gq6OrGr6PODk2535T2U7uRzZk7SP.jpeg"
                  src = "/images/BIs.jpg"
                  alt="Robotic Lease 대시보드 인터페이스 모음"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section>
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
              Robotic Lease의 주요 기능
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                title="리스계약 AI 분석"
                icon={<Cog className="w-12 h-12 text-blue-600" />}
                description="리스에 특화된 AI가 리스계약서를 이해하고 필요한 계약정보 추출 및 회계처리에 필요한 정보를 수집합니다."
              />
              <FeatureCard
                title="리스 계약 관리"
                icon={<Database className="w-12 h-12 text-green-600" />}
                description="모든 리스 계약의 상태를 실시간으로 추적하고 관리할 수 있습니."
              />
              <FeatureCard
                title="리스회계"
                icon={<FileText className="w-12 h-12 text-purple-600" />}
                description="리스 계약의 속성정보에 따라 사용자가 이해하고 검증할 수 있는 회계처리 보고서를 산출할 수 있습니다."
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

