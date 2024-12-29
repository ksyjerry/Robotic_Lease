"use client"

import { useState } from "react"
import Image from "next/image"
import { SidebarProvider, useSidebar } from "@/components/sidebar-provider"
import { SidebarNav } from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { HomeIcon, FileText, HelpCircle, Settings, Database, Menu, Download } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { dummyContracts } from "@/data/dummy-contracts"
import { useLeaseContracts, LeaseContractProvider } from "@/contexts/LeaseContractContext"

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

const formatDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString();
}

const LeaseAccountingContent = () => {
  const { isOpen, toggle } = useSidebar()
  const [date, setDate] = useState<Date>(new Date())
  const [selectedLeases, setSelectedLeases] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const leasesPerPage = 5
  const { leaseContracts } = useLeaseContracts()

  const indexOfLastLease = currentPage * leasesPerPage
  const indexOfFirstLease = indexOfLastLease - leasesPerPage
  const currentLeases = [...leaseContracts, ...dummyContracts].slice(indexOfFirstLease, indexOfLastLease)

  const handleLeaseToggle = (leaseId: number) => {
    setSelectedLeases(prevSelected =>
      prevSelected.includes(leaseId)
        ? prevSelected.filter(id => id !== leaseId)
        : [...prevSelected, leaseId]
    )
  }

  const handleSelectAll = () => {
    if (selectedLeases.length === dummyContracts.length + leaseContracts.length) {
      setSelectedLeases([])
    } else {
      setSelectedLeases([...leaseContracts, ...dummyContracts].map(contract => contract.id))
    }
  }

  const handleGenerateAccounting = () => {
    setIsConfirmDialogOpen(true)
  }

  const confirmGenerateAccounting = () => {
    console.log("Generating accounting for leases:", selectedLeases)
    console.log("As of date:", date)
    setIsConfirmDialogOpen(false)
    // Implement the download functionality here
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
        <div className="h-16 flex items-center px-6 bg-gray-900 text-white">
          {isOpen ? (
            <div className="flex items-center">
              <Image
                src="/images/pwc_logo_trans.png"
                alt="Robotic Lease Logo"
                width={195}
                height={52}
                className="h-10 w-auto"
              />
              <span className="ml-2 text-sm font-semibold">Digital Platform</span>
            </div>
          ) : (
            <Image
              src="/images/pwc_logo_trans.png"
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
      <div className="flex-1 overflow-hidden">
        <header className="h-16 flex items-center px-6 bg-white border-b">
          <Button variant="ghost" size="icon" onClick={toggle} className="mr-4">
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">리스회계</h1>
        </header>

        <main className="p-6 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">리스회계 생성</h2>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Date Selection */}
              <div className="md:w-1/4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">기준일 선택</h3>
                <p className="mb-2 text-lg font-medium">{formatDate(date)}</p>
                <div className="w-full max-w-[280px]">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    className="rounded-md border"
                  />
                </div>
              </div>

              {/* Lease List */}
              <div className="md:w-3/4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">리스 목록</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-100">
                      <TableRow>
                        <TableHead className="w-[50px]">선택</TableHead>
                        <TableHead>리스번호</TableHead>
                        <TableHead>계약명</TableHead>
                        <TableHead>자산구분</TableHead>
                        <TableHead>비용구분</TableHead>
                        <TableHead>리스기간</TableHead>
                        <TableHead>리스금액</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentLeases.map((contract) => (
                        <TableRow key={contract.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedLeases.includes(contract.id)}
                              onCheckedChange={() => handleLeaseToggle(contract.id)}
                            />
                          </TableCell>
                          <TableCell>{contract.refNo}</TableCell>
                          <TableCell>{contract.name}</TableCell>
                          <TableCell>{contract.assetType}</TableCell>
                          <TableCell>{contract.costType}</TableCell>
                          <TableCell>{`${formatDate(contract.leaseStartDate)} ~ ${formatDate(contract.leaseEndDate)}`}</TableCell>
                          <TableCell>{formatCurrency(contract.monthlyFixedPayment)}원/월</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Button onClick={handleSelectAll}>
                    {selectedLeases.length === dummyContracts.length + leaseContracts.length ? '전체 해제' : '전체 선택'}
                  </Button>
                  <div className="flex">
                    {Array.from({ length: Math.ceil((leaseContracts.length + dummyContracts.length) / leasesPerPage) }, (_, i) => (
                      <Button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        className="mx-1"
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Accounting Button */}
            <div className="flex justify-end mt-6">
              <Button onClick={handleGenerateAccounting}>
                <Download className="mr-2 h-4 w-4" />
                리스 회계 생성
              </Button>
            </div>
          </div>
          <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>리스 회계 생성 확인</DialogTitle>
                <DialogDescription>
                  기준일 {formatDate(date)}을 기준으로 리스 회계처리를 생성하시겠습니까?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>취소</Button>
                <Button onClick={confirmGenerateAccounting}>확인</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}

export default function LeaseAccounting() {
  return (
    <LeaseContractProvider>
      <SidebarProvider>
        <LeaseAccountingContent />
      </SidebarProvider>
    </LeaseContractProvider>
  )
}

