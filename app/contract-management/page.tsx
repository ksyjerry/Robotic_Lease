"use client"

import Image from "next/image"
import { SidebarNav } from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import { HomeIcon, FileText, HelpCircle, Settings, Database, Menu } from 'lucide-react'
import { useSidebar, SidebarProvider } from "@/components/sidebar-provider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { dummyContracts } from "@/data/dummy-contracts"
import { formatCurrency, formatDate, formatPercent } from "@/utils/format"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLeaseContracts, LeaseContractProvider } from "@/contexts/LeaseContractContext"
import { LeaseContract } from "@/types/contract"

// const sidebarNavItems = [
//   {
//     title: "홈",
//     href: "/",
//     icon: <HomeIcon className="h-5 w-5" />,
//   },
//   {
//     title: "리스계약 AI 분석",
//     href: "/lease-ai-analysis",
//     icon: <FileText className="h-5 w-5" />,
//   },
//   {
//     title: "계약 관리",
//     href: "/contract-management",
//     icon: <Database className="h-5 w-5" />,
//   },
//   {
//     title: "리스회계",
//     href: "/lease-accounting",
//     icon: <Settings className="h-5 w-5" />,
//   },
//   {
//     title: "고객 지원",
//     href: "/support",
//     icon: <HelpCircle className="h-5 w-5" />,
//   },
// ]

// function ContractManagementContent() {
//   const { isOpen, toggle } = useSidebar()
//   const { leaseContracts } = useLeaseContracts()
//   const defaultContract: LeaseContract = {
//     id: 0,
//     refNo: "",
//     name: "",
//     description: "",
//     counterparty: "",
//     assetType: "",
//     costType: "",
//     isInternalTransaction: false,
//     noteType: "",
//     leaseStartDate: "",
//     contractEndDate: "",
//     leaseEndDate: "",
//     modificationDate: null,
//     periodMonths: 0,
//     monthlyFixedPayment: 0,
//     paymentType: "균등",
//     increaseRate: null,
//     increaseCycle: null,
//     paymentTiming: "후급",
//     leaseStartStandard: "월말",
//     purchaseOptionPrice: null,
//     depreciationPeriodMonths: 0,
//     deposit: 0,
//     capitalExpenditure: 0,
//     recoveryCost: 0,
//     impairmentDate: null,
//     annualDiscountRate: 0,
//     depositDiscountRate: 0,
//     recoveryDiscountRate: 0,
//     rangeChange: null
//   }

//   const [selectedContract, setSelectedContract] = useState<LeaseContract>(() =>
//     leaseContracts[0] ? { ...leaseContracts[0] as LeaseContract } : { ...defaultContract }
//   )
//   const [currentPage, setCurrentPage] = useState(1)
//   const contractsPerPage = 5

//   const indexOfLastContract = currentPage * contractsPerPage
//   const indexOfFirstContract = indexOfLastContract - contractsPerPage
//   const currentContracts = [...leaseContracts, ...dummyContracts].slice(indexOfFirstContract, indexOfLastContract).map(contract => contract as LeaseContract)

//   const handleContractSelect = (contract: LeaseContract) => {
//     setSelectedContract(contract)
//   }

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
//         <div className="h-16 flex items-center px-6 bg-gray-900 text-white">
//           {isOpen ? (
//             <div className="flex items-center">
//               <Image
//                 src="/images/pwc_logo_trans.png"
//                 alt="Robotic Lease Logo"
//                 width={195}
//                 height={52}
//                 className="h-10 w-auto"
//               />
//               <span className="ml-2 text-sm font-semibold">Digital Platform</span>
//             </div>
//           ) : (
//             <Image
//               src="/images/pwc_logo_trans.png"
//               alt="Robotic Lease Logo"
//               width={58}
//               height={58}
//               className="h-10 w-10"
//             />
//           )}
//         </div>
//         <SidebarNav items={sidebarNavItems} />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-hidden">
//         <header className="h-16 flex items-center px-6 bg-white border-b">
//           <Button variant="ghost" size="icon" onClick={toggle} className="mr-4">
//             <Menu className="h-6 w-6" />
//           </Button>
//           <h1 className="text-xl font-semibold">계약 관리</h1>
//         </header>

//         <main className="p-6 h-[calc(100vh-4rem)] overflow-y-auto">
//           <div className="flex gap-6">
//             {/* Left Section: Contract List */}
//             <div className="w-1/2 bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-2xl font-bold mb-6 text-gray-900">리스 계약 목록</h2>
//               <div className="overflow-x-auto">
//                 <Table>
//                   <TableHeader className="bg-gray-100">
//                     <TableRow>
//                       <TableHead className="w-[80px]">번호</TableHead>
//                       <TableHead>계약명</TableHead>
//                       <TableHead>리스기간</TableHead>
//                       <TableHead>리스 금액</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {currentContracts.map((contract: LeaseContract) => (
//                       <TableRow 
//                         key={contract.id} 
//                         className={`cursor-pointer ${selectedContract.id === contract.id ? 'bg-blue-100' : ''}`}
//                         onClick={() => handleContractSelect(contract)}
//                       >
//                         <TableCell>{contract.id}</TableCell>
//                         <TableCell>{contract.name}</TableCell>
//                         <TableCell>{formatDate(contract.leaseStartDate)} ~ {formatDate(contract.leaseEndDate)}</TableCell>
//                         <TableCell>{formatCurrency(contract.monthlyFixedPayment)}원/월</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//               <div className="mt-4 flex justify-center">
//                 {Array.from({ length: Math.ceil((leaseContracts.length + dummyContracts.length) / contractsPerPage) }, (_, i) => (
//                   <Button
//                     key={i}
//                     onClick={() => paginate(i + 1)}
//                     variant={currentPage === i + 1 ? "default" : "outline"}
//                     className="mx-1"
//                   >
//                     {i + 1}
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             {/* Right Section: Contract Details */}
//             <div className="w-1/2 bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-2xl font-bold mb-6 text-gray-900">계약 상세 정보</h2>
//               <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-xl font-bold">{selectedContract.name}</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     {/* 기본 정보 */}
//                     <div>
//                       <h3 className="text-lg font-semibold mb-3">기본 정보</h3>
//                       <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
//                         <div>
//                           <Label className="font-semibold text-gray-600">계약번호</Label>
//                           <p className="text-lg">{selectedContract.refNo}</p>
//                         </div>
//                         <div>
//                           <Label className="font-semibold text-gray-600">거래처</Label>
//                           <p className="text-lg">{selectedContract.counterparty}</p>
//                         </div>
//                         <div>
//                           <Label className="font-semibold text-gray-600">자산구분</Label>
//                           <p className="text-lg">{selectedContract.assetType}</p>
//                         </div>
//                         <div>
//                           <Label className="font-semibold text-gray-600">비용구분</Label>
//                           <p className="text-lg">{selectedContract.costType}</p>
//                         </div>
//                       </div>
//                     </div>

//                     <Separator />

//                     {/* 계약 기간 정보 */}
//                     <div>
//                       <h3 className="text-lg font-semibold mb-3">계약 기간 정보</h3>
//                       <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <Label className="font-semibold text-gray-600">리스개시일</Label>
//                             <p className="text-lg">{formatDate(selectedContract.leaseStartDate)}</p>
//                           </div>
//                           <div>
//                             <Label className="font-semibold text-gray-600">리스종료일</Label>
//                             <p className="text-lg">{formatDate(selectedContract.leaseEndDate)}</p>
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <Label className="font-semibold text-gray-600">리스변경일</Label>
//                             <p className="text-lg">{formatDate(selectedContract.modificationDate)}</p>
//                           </div>
//                           <div>
//                             <Label className="font-semibold text-gray-600">기간(월)</Label>
//                             <p className="text-lg">{selectedContract.periodMonths}개월</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <Separator />

//                     {/* 리스료 정보 */}
//                     <div>
//                       <h3 className="text-lg font-semibold mb-3">리스료 정보</h3>
//                       <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <Label className="font-semibold text-gray-600">고정리스료(월)</Label>
//                             <p className="text-lg">{formatCurrency(selectedContract.monthlyFixedPayment)}원</p>
//                           </div>
//                           <div>
//                             <Label className="font-semibold text-gray-600">균등/비균등</Label>
//                             <p className="text-lg">{selectedContract.paymentType}</p>
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <Label className="font-semibold text-gray-600">선급/후급</Label>
//                             <p className="text-lg">{selectedContract.paymentTiming}</p>
//                           </div>
//                           <div>
//                             <Label className="font-semibold text-gray-600">리스개시기준</Label>
//                             <p className="text-lg">{selectedContract.leaseStartStandard}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <Separator />

//                     {/* 금액 정보 */}
//                     <div>
//                       <h3 className="text-lg font-semibold mb-3">금액 정보</h3>
//                       <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <Label className="font-semibold text-gray-600">임차보증금</Label>
//                             <p className="text-lg">{formatCurrency(selectedContract.deposit)}원</p>
//                           </div>
//                           <div>
//                             <Label className="font-semibold text-gray-600">자본적지출</Label>
//                             <p className="text-lg">{formatCurrency(selectedContract.capitalExpenditure)}원</p>
//                           </div>
//                         </div>
//                         <div>
//                           <Label className="font-semibold text-gray-600">복구원가</Label>
//                           <p className="text-lg">{formatCurrency(selectedContract.recoveryCost)}원</p>
//                         </div>
//                       </div>
//                     </div>

//                     <Separator />

//                     {/* 할인율 정보 */}
//                     <div>
//                       <h3 className="text-lg font-semibold mb-3">할인율 정보</h3>
//                       <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <Label className="font-semibold text-gray-600">할인율(연)</Label>
//                             <p className="text-lg">{formatPercent(selectedContract.annualDiscountRate)}</p>
//                           </div>
//                           <div>
//                             <Label className="font-semibold text-gray-600">임차보증금할인율(연)</Label>
//                             <p className="text-lg">{formatPercent(selectedContract.depositDiscountRate)}</p>
//                           </div>
//                         </div>
//                         <div>
//                           <Label className="font-semibold text-gray-600">복구충당부채할인율(연)</Label>
//                           <p className="text-lg">{formatPercent(selectedContract.recoveryDiscountRate)}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </ScrollArea>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// export default function ContractManagement() {
//   return (
//     <LeaseContractProvider>
//       <SidebarProvider>
//         <ContractManagementContent />
//       </SidebarProvider>
//     </LeaseContractProvider>
//   )
// }



// "use client";

// import Image from "next/image"
// import { SidebarNav } from "@/components/sidebar-nav"
// import axios from "axios";
import { useEffect, useState } from "react";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { formatCurrency, formatDate, formatPercent } from "@/utils/format";
// import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { axiosClient } from "@/utils/api";



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



// 계약 리스트 데이터 타입
interface Contract {
  id: number;
  name: string;
  leaseStartDate: string;
  leaseEndDate: string;
  monthlyFixedPayment: number;
}

// 계약 상세 데이터 타입
interface ContractDetail {
  id: number;
  refNo: string;
  name: string;
  description: string;
  counterparty: string;
  assetType: string;
  costType: string;
  isInternalTransaction: boolean;
  noteType: string;
  leaseStartDate: string;
  contractEndDate: string;
  leaseEndDate: string;
  modificationDate: string | null;
  periodMonths: number;
  monthlyFixedPayment: number;
  paymentType: string;
  increaseRate: number | null;
  increaseCycle: number | null;
  paymentTiming: string;
  leaseStartStandard: string;
  purchaseOptionPrice: number | null;
  depreciationPeriodMonths: number;
  deposit: number;
  capitalExpenditure: number;
  recoveryCost: number;
  impairmentDate: string | null;
  annualDiscountRate: number;
  depositDiscountRate: number;
  recoveryDiscountRate: number;
  rangeChange: string | null;
}

// **테스트용 초기 selectedContract 값 설정**
const initialSelectedContract: ContractDetail = {
  id: 0,
  refNo: "-",
  name: "테스트 계약",
  description: "-",
  counterparty: "-",
  assetType: "-",
  costType: "-",
  isInternalTransaction: false,
  noteType: "-",
  leaseStartDate: "2024-01-01",
  contractEndDate: "2024-12-31",
  leaseEndDate: "2024-12-31",
  modificationDate: null,
  periodMonths: 0,
  monthlyFixedPayment: 0,
  paymentType: "-",
  increaseRate: null,
  increaseCycle: null,
  paymentTiming: "-",
  leaseStartStandard: "-",
  purchaseOptionPrice: null,
  depreciationPeriodMonths: 0,
  deposit: 0,
  capitalExpenditure: 0,
  recoveryCost: 0,
  impairmentDate: null,
  annualDiscountRate: 0,
  depositDiscountRate: 0,
  recoveryDiscountRate: 0,
  rangeChange: null
};

function ContractManagementContent() {
  const { isOpen, toggle } = useSidebar()
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<ContractDetail>(initialSelectedContract);

  // ✅ 계약 목록 가져오기
  useEffect(() => {
    axiosClient("text")
      .get("/requests/", {
        params: { email: "jaedong.kim@pwc.com" } // ✅ email을 쿼리 파라미터로 추가
      })
      .then((response) => {
        const formattedData = response.data.map((req: any) => ({
          id: req.request_id,
          name: req.file_name,
          leaseStartDate: req.leaseStartDate,
          leaseEndDate: req.leaseEndDate,
          monthlyFixedPayment: req.monthlyFixedPayment
        }));
        setContracts(formattedData);
      })
      .catch((error) => console.error("Failed to fetch contracts:", error));
  }, []);

  // ✅ 특정 계약의 상세 정보 가져오기
  const fetchContractDetail = (requestId: number) => {
    axiosClient("text")
      .get(`/requests/detail/`, {
        params: { request_id: requestId }
      })
      .then((response) => {
        const data = response.data;

        console.log(data)

        setSelectedContract({
          id: data.request_id,
          refNo: data.refNo || "",
          name: data.name || "",
          description: data.description || "",
          counterparty: data.counterparty || "",
          assetType: data.assetType || "",
          costType: data.costType || "",
          isInternalTransaction: data.isInternalTransaction ?? false,
          noteType: data.noteType || "",
          leaseStartDate: data.leaseStartDate || "",
          contractEndDate: data.contractEndDate || "",
          leaseEndDate: data.leaseEndDate || "",
          modificationDate: data.modificationDate || null,
          periodMonths: data.periodMonths || 0,
          monthlyFixedPayment: data.monthlyFixedPayment || 0,
          paymentType: data.paymentType || "균등",
          increaseRate: data.increaseRate || null,
          increaseCycle: data.increaseCycle || null,
          paymentTiming: data.paymentTiming || "후급",
          leaseStartStandard: data.leaseStartStandard || "월말",
          purchaseOptionPrice: data.purchaseOptionPrice || null,
          depreciationPeriodMonths: data.depreciationPeriodMonths || 0,
          deposit: data.deposit || 0,
          capitalExpenditure: data.capitalExpenditure || 0,
          recoveryCost: data.recoveryCost || 0,
          impairmentDate: data.impairmentDate || null,
          annualDiscountRate: data.annualDiscountRate || 0,
          depositDiscountRate: data.depositDiscountRate || 0,
          recoveryDiscountRate: data.recoveryDiscountRate || 0,
          rangeChange: data.rangeChange || null
        });

      })
      .catch((error) => console.error("Failed to fetch contract details:", error));
  };

  // ✅ 계약 클릭 시 `selectedContract` 업데이트 및 상세 정보 요청
  const handleContractSelect = (contract: Contract) => {
    fetchContractDetail(contract.id);
  };

    const [currentPage, setCurrentPage] = useState(1)
    const contractsPerPage = 5

    const indexOfLastContract = currentPage * contractsPerPage
    const indexOfFirstContract = indexOfLastContract - contractsPerPage
    const currentContracts = contracts.slice(indexOfFirstContract, indexOfLastContract).map(contract => contract as LeaseContract)

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
          <h1 className="text-xl font-semibold">계약 관리</h1>
        </header>

        <main className="p-6 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex gap-6">
            {/* Left Section: Contract List */}
            <div className="w-1/2 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">리스 계약 목록</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-100">
                    <TableRow>
                      <TableHead className="w-[80px]">번호</TableHead>
                      <TableHead>계약명</TableHead>
                      <TableHead>리스기간</TableHead>
                      <TableHead>리스 금액</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentContracts.map((contract: LeaseContract) => (
                      <TableRow 
                        key={contract.id} 
                        className={`cursor-pointer ${selectedContract.id === contract.id ? 'bg-blue-100' : ''}`}
                        onClick={() => handleContractSelect(contract)}
                      >
                        <TableCell>{contract.id}</TableCell>
                        <TableCell>{contract.name}</TableCell>
                        <TableCell>{formatDate(contract.leaseStartDate)} ~ {formatDate(contract.leaseEndDate)}</TableCell>
                        <TableCell>{formatCurrency(contract.monthlyFixedPayment)}원/월</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-center">
                {Array.from({ length: Math.ceil((contracts.length) / contractsPerPage) }, (_, i) => (
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

            {/* Right Section: Contract Details */}
            <div className="w-1/2 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">계약 상세 정보</h2>
              <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{selectedContract.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* 기본 정보 */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">기본 정보</h3>
                      <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
                        <div>
                          <Label className="font-semibold text-gray-600">계약번호</Label>
                          <p className="text-lg">{selectedContract.refNo}</p>
                        </div>
                        <div>
                          <Label className="font-semibold text-gray-600">거래처</Label>
                          <p className="text-lg">{selectedContract.counterparty}</p>
                        </div>
                        <div>
                          <Label className="font-semibold text-gray-600">자산구분</Label>
                          <p className="text-lg">{selectedContract.assetType}</p>
                        </div>
                        <div>
                          <Label className="font-semibold text-gray-600">비용구분</Label>
                          <p className="text-lg">{selectedContract.costType}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* 계약 기간 정보 */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">계약 기간 정보</h3>
                      <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="font-semibold text-gray-600">리스개시일</Label>
                            <p className="text-lg">{formatDate(selectedContract.leaseStartDate)}</p>
                          </div>
                          <div>
                            <Label className="font-semibold text-gray-600">리스종료일</Label>
                            <p className="text-lg">{formatDate(selectedContract.leaseEndDate)}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="font-semibold text-gray-600">리스변경일</Label>
                            <p className="text-lg">{formatDate(selectedContract.modificationDate)}</p>
                          </div>
                          <div>
                            <Label className="font-semibold text-gray-600">기간(월)</Label>
                            <p className="text-lg">{selectedContract.periodMonths}개월</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* 리스료 정보 */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">리스료 정보</h3>
                      <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="font-semibold text-gray-600">고정리스료(월)</Label>
                            <p className="text-lg">{formatCurrency(selectedContract.monthlyFixedPayment)}원</p>
                          </div>
                          <div>
                            <Label className="font-semibold text-gray-600">균등/비균등</Label>
                            <p className="text-lg">{selectedContract.paymentType}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="font-semibold text-gray-600">선급/후급</Label>
                            <p className="text-lg">{selectedContract.paymentTiming}</p>
                          </div>
                          <div>
                            <Label className="font-semibold text-gray-600">리스개시기준</Label>
                            <p className="text-lg">{selectedContract.leaseStartStandard}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* 금액 정보 */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">금액 정보</h3>
                      <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="font-semibold text-gray-600">임차보증금</Label>
                            <p className="text-lg">{formatCurrency(selectedContract.deposit)}원</p>
                          </div>
                          <div>
                            <Label className="font-semibold text-gray-600">자본적지출</Label>
                            <p className="text-lg">{formatCurrency(selectedContract.capitalExpenditure)}원</p>
                          </div>
                        </div>
                        <div>
                          <Label className="font-semibold text-gray-600">복구원가</Label>
                          <p className="text-lg">{formatCurrency(selectedContract.recoveryCost)}원</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* 할인율 정보 */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">할인율 정보</h3>
                      <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="font-semibold text-gray-600">할인율(연)</Label>
                            <p className="text-lg">{formatPercent(selectedContract.annualDiscountRate)}</p>
                          </div>
                          <div>
                            <Label className="font-semibold text-gray-600">임차보증금할인율(연)</Label>
                            <p className="text-lg">{formatPercent(selectedContract.depositDiscountRate)}</p>
                          </div>
                        </div>
                        <div>
                          <Label className="font-semibold text-gray-600">복구충당부채할인율(연)</Label>
                          <p className="text-lg">{formatPercent(selectedContract.recoveryDiscountRate)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollArea>
            </div>
          </div>
        </main>
      </div>
    </div>

  );
}

export default ContractManagementContent;

