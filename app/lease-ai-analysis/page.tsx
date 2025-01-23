"use client"

import { useState, useContext } from "react"
import Image from "next/image"
import { SidebarNav } from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HomeIcon, FileText, HelpCircle, Settings, Database, Cog, Menu, ArrowRight, Upload, Loader2 } from 'lucide-react'
import { useSidebar, SidebarProvider } from "@/components/sidebar-provider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import { useLeaseContracts, LeaseContract, LeaseContractProvider } from "@/contexts/LeaseContractContext"

import { FileUploader } from "@/components/FileUploader";
import { useFilesStore } from "../../store/main";
import { runAI } from "@/utils/api"

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

// ContractInfo 인터페이스 정의
interface ContractInfo {
  [key: string]: string;  // 문자열 인덱스 시그니처 추가
  계약번호: string;
  리스명: string;
  자산구분: string;
  비용구분: string;
  리스개시일: string;
  리스종료일: string;
  기간: string;
  "선급/후급": string;
  리스개시기준: string;
  감가상각기간: string;
  할인율: string;
  거래상대방A: string;
  거래상대방B: string;
  내부거래여부: string;
  주석구분: string;
  계약종료일: string;
  리스변경일: string;
  고정리스료: string;
  "균등/비균등": string;
  증가율: string;
  증가주기: string;
  매수선택권행사가격: string;
  임차보증금: string;
  자본적지출: string;
  복구원가: string;
  손상차손발생일자: string;
  임차보증금할인율: string;
  복구충당부채할인율: string;
  범위변동: string;
}

function LeaseAIAnalysisContent() {
  const { isOpen, toggle } = useSidebar()
  const { file } = useFilesStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [showAnalysisResult, setShowAnalysisResult] = useState(false)
  const [contractInfo, setContractInfo] = useState<ContractInfo>({
    계약번호: "",
    리스명: "",
    거래상대방A: "",
    거래상대방B: "",
    자산구분: "",
    비용구분: "",
    내부거래여부: "",
    주석구분: "",
    리스개시일: "",
    계약종료일: "",
    리스종료일: "",
    리스변경일: "",
    기간: "",
    고정리스료: "",
    "균등/비균등": "",
    증가율: "",
    증가주기: "",
    "선급/후급": "",
    리스개시기준: "",
    매수선택권행사가격: "",
    감가상각기간: "",
    임차보증금: "",
    자본적지출: "",
    복구원가: "",
    손상차손발생일자: "",
    할인율: "",
    임차보증금할인율: "",
    복구충당부채할인율: "",
    범위변동: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContractInfo(prev => ({ ...prev, [name]: value === '' ? '' : value }));
  };

  const handleAnalysis = async () => {
    if (!file) {
      alert("분석할 파일을 선택해주세요.");
      return;
    }
  
    setIsAnalyzing(true); // 로딩 상태 활성화
  
    try {
      const formData = new FormData();
      formData.append("file", file); // 파일 첨부
  
      const res = await runAI(formData); // API 호출
      const contractData = res.data.data[0]
      
      console.log("Contract Data:", contractData);
      // response -> res로 변경
      console.log("Full API Response:", JSON.stringify(res, null, 2));
      console.log("Contract Data from Response:", res.data?.data?.[0]);

      if (res.status === 200 && res.data) {
        // 백엔드에서 받은 리스 계약 데이터를 `contractInfo` 상태에 반영
        setContractInfo({
          계약번호: contractData.계약번호 || "",
          리스명: contractData.리스명 || "",
          거래상대방A: contractData.거래상대방A || "",
          거래상대방B: contractData.거래상대방B || "",
          자산구분: contractData.자산구분 || "",
          비용구분: contractData.비용구분 || "",
          내부거래여부: contractData.내부거래여부 || "",
          주석구분: contractData.주석구분 || "",
          리스개시일: contractData.리스개시일 || "",
          계약종료일: contractData.계약종료일 || "",
          리스종료일: contractData.리스종료일 || "",
          리스변경일: contractData.리스변경일 || "",
          기간: contractData.기간 || "",
          고정리스료: contractData.고정리스료 || "",
          "균등/비균등": contractData["균등/비균등"] || "",
          증가율: contractData.증가율 || "",
          증가주기: contractData.증가주기 || "",
          "선급/후급": contractData["선급/후급"] || "",
          리스개시기준: contractData.리스개시기준 || "",
          매수선택권행사가격: contractData.매수선택권행사가격 || "",
          감가상각기간: contractData.감가상각기간 || "",
          임차보증금: contractData.임차보증금 || "",
          자본적지출: contractData.자본적지출 || "",
          복구원가: contractData.복구원가 || "",
          손상차손발생일자:contractData.손상차손발생일자 || "",
          할인율: contractData.할인율 || "",
          임차보증금할인율: contractData.임차보증금할인율 || "",
          복구충당부채할인율: contractData.복구충당부채할인율 || "",
          범위변동: contractData.범위변동 || "",
        });
        
        setAnalysisComplete(true); 
        
        alert("분석이 완료되었습니다!");
      } else {
        alert("분석에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("분석 중 오류 발생:", error);
      alert("분석 중 문제가 발생했습니다.");
    } finally {
      setIsAnalyzing(false); // 로딩 상태 비활성화
  }
  }

  const router = useRouter()
  const { addLeaseContract } = useLeaseContracts()

  const handleLeaseRegistration = () => {
    const requiredFields = ['계약번호', '리스명', '자산구분', '비용구분', '리스개시일', '리스종료일', '기간', '선급/후급', '리스개시기준', '감가상각기간', '할인율'];
    const missingFields = requiredFields.filter(field => !contractInfo[field]);
    
    if (missingFields.length > 0) {
      alert(`다음 필수 항목을 입력해주세요: ${missingFields.join(', ')}`);
      return;
    }

    if (analysisComplete) {
      const newContract: LeaseContract = {
        id: Date.now(),
        refNo: `L${Date.now()}`, // Generate a unique reference number
        name: contractInfo.리스명,
        description: "",
        counterparty: contractInfo.거래상대방A,
        assetType: contractInfo.자산구분,
        costType: contractInfo.비용구분,
        isInternalTransaction: contractInfo.내부거래여부 === "내부거래",
        noteType: contractInfo.주석구분,
        leaseStartDate: contractInfo.리스개시일,
        contractEndDate: contractInfo.계약종료일,
        leaseEndDate: contractInfo.리스종료일,
        modificationDate: contractInfo.리스변경일,
        periodMonths: parseInt(contractInfo.기간, 10) || 0,
        monthlyFixedPayment: parseInt(contractInfo.고정리스료, 10) || 0,
        paymentType: contractInfo["균등/비균등"] as "균등" | "비균등",
        increaseRate: parseFloat(contractInfo.증가율) || 0,
        increaseCycle: null, // Add this information to contractInfo if available
        paymentTiming: contractInfo["선급/후급"] as "선급" | "후급",
        leaseStartStandard: contractInfo.리스개시기준 as "월초" | "월말",
        purchaseOptionPrice: null, // Add this information to contractInfo if available
        depreciationPeriodMonths: parseInt(contractInfo.감가상각기간, 10) || 0,
        deposit: parseInt(contractInfo.임차보증금, 10) || 0,
        capitalExpenditure: parseInt(contractInfo.자본적지출, 10) || 0,
        recoveryCost: parseInt(contractInfo.복구원가, 10) || 0,
        impairmentDate: contractInfo.손상차손발생일자,
        annualDiscountRate: parseFloat(contractInfo.할인율) || 0,
        depositDiscountRate: parseFloat(contractInfo.임차보증금할인율) || 0,
        recoveryDiscountRate: parseFloat(contractInfo.복구충당부채할인율) || 0,
        rangeChange: parseFloat(contractInfo.범위변동) || 0,
      }
      addLeaseContract(newContract)
      router.push('/contract-management')
    } else {
      alert('AI 분석을 완료한 후 리스를 등록해 주세요.')
    }
  }

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
      <div className="flex-1">
        <header className="h-16 flex items-center px-6 bg-white border-b">
          <Button variant="ghost" size="icon" onClick={toggle} className="mr-4">
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">리스계약 AI 분석</h1>
        </header>

        <main className="p-6 space-y-12">
          {/* Flow Diagram Section */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">리스계약 AI 분석 프로세스</h2>
            <div className="flex justify-center items-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-center">1. 리스계약서 업로드</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <Cog className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm font-medium text-center">2. AI 계약 분석</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-sm font-medium text-center">3. 리스 계약정보 추출</p>
              </div>
            </div>
          </section>

          {/* Contract Upload Section */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">계약서 업로드 및 AI 분석</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="contract-upload" className="block text-sm font-medium text-gray-700 mb-2">
                  계약서 업로드
                </Label>
                <div className="flex items-center space-x-4">
                <FileUploader />
                  <Button onClick={handleAnalysis} disabled={isAnalyzing || !file}>
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        AI 분석중
                      </>
                    ) : (
                      '분석 시작'
                    )}
                  </Button>
                  {analysisComplete && (
                    <Button onClick={() => setShowAnalysisResult(true)}>
                      분석 내용 보기
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Lease Contract Information Section */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">리스 계약 정보</h2>
            <div className="space-y-8">
              {/* 기본 정보 섹션 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">기본 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="계약번호" className="flex items-center">
                      계약 번호 <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="계약번호"
                      name="계약번호"
                      value={contractInfo.계약번호 || ""}
                      onChange={handleInputChange}
                      placeholder="계약 번호를 입력하세요"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="리스명" className="flex items-center">
                      리스명 <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="리스명"
                      name="리스명"
                      value={contractInfo.리스명 || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="party-a">거래상대방 A</Label>
                    <Input
                      id="party-a"
                      name="거래상대방A"
                      value={contractInfo.거래상대방A || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="party-b">거래상대방 B</Label>
                    <Input
                      id="party-b"
                      name="거래상대방B"
                      value={contractInfo.거래상대방B || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="자산구분" className="flex items-center">
                      자산구분 <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="자산구분"
                      name="자산구분"
                      value={contractInfo.자산구분 || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="비용구분" className="flex items-center">
                      비용구분 <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="비용구분"
                      name="비용구분"
                      value={contractInfo.비용구분 || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="internal-transaction">내부거래여부</Label>
                    <Input
                      id="internal-transaction"
                      name="내부거래여부"
                      value={contractInfo.내부거래여부 || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="note-type">주석구분</Label>
                    <Input
                      id="note-type"
                      name="주석구분"
                      value={contractInfo.주석구분 || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* 계약 기간 정보 섹션 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">계약 기간 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="리스개시일" className="flex items-center">
                      리스개시일 <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="리스개시일"
                      name="리스개시일"
                      // type="date"
                      value={contractInfo.리스개시일 || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contract-end-date">계약종료일</Label>
                    <Input
                      id="contract-end-date"
                      name="계약종료일"
                      // type="date"
                      value={contractInfo.계약종료일 || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="리스종료일" className="flex items-center">
                      리스종료일 <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="리스종료일"
                      name="리스종료일"
                      // type="date"
                      value={contractInfo.리스종료일 || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="modification-date">리스변경일</Label>
                    <Input
                      id="modification-date"
                      name="리스변경일"
                      // type="date"
                      value={contractInfo.리스변경일 || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="기간" className="flex items-center">
                      기간(월) <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="기간"
                      name="기간"
                      // type="number"
                      value={contractInfo.기간 || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 리스료 정보 섹션 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">리스료 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="monthly-fixed-payment">고정리스료(월)</Label>
                    <Input
                      id="monthly-fixed-payment"
                      name="고정리스료"
                      // type="number"
                      value={contractInfo.고정리스료 || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="payment-type">균등/비균등</Label>
                    <Input
                      id="payment-type"
                      name="균등/비균등"
                      value={contractInfo["균등/비균등"] || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="increase-rate">증가율</Label>
                    <Input
                      id="increase-rate"
                      name="증가율"
                      // type="number"
                      step="0.01"
                      value={contractInfo.증가율 || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="increase-cycle">증가주기</Label>
                    <Input
                      id="increase-cycle"
                      name="증가주기"
                      value={contractInfo.증가주기 || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="선급/후급" className="flex items-center">
                      선급/후급 <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <select
                      id="선급/후급"
                      name="선급/후급"
                      value={contractInfo["선급/후급"] || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded"
                    >
                      <option value="">선택하세요</option>
                      <option value="선급">선급</option>
                      <option value="후급">후급</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="리스개시기준" className="flex items-center">
                      리스개시기준 <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <select
                      id="리스개시기준"
                      name="리스개시기준"
                      value={contractInfo.리스개시기준 || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded"
                    >
                      <option value="">선택하세요</option>
                      <option value="월초">월초</option>
                      <option value="월말">월말</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 금액 정보 섹션 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">금액 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="purchase-option-price">매수선택권 행사가격</Label>
                    <Input
                      id="purchase-option-price"
                      name="매수선택권행사가격"
                      value={contractInfo.매수선택권행사가격 || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="감가상각기간" className="flex items-center">
                      감가상각기간(월) <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="감가상각기간"
                      name="감가상각기간"
                      // type="number"
                      value={contractInfo.감가상각기간 || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="deposit">임차보증금</Label>
                    <Input
                      id="deposit"
                      name="임차보증금"
                      // type="number"
                      value={contractInfo.임차보증금 || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="capital-expenditure">자본적지출</Label>
                    <Input
                      id="capital-expenditure"
                      name="자본적지출"
                      // type="number"
                      value={contractInfo.자본적지출 || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="recovery-cost">복구원가</Label>
                    <Input
                      id="recovery-cost"
                      name="복구원가"
                      // type="number"
                      value={contractInfo.복구원가 || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="impairment-date">손상차손발생일자</Label>
                    <Input
                      id="impairment-date"
                      name="손상차손발생일자"
                      // type="date"
                      value={contractInfo.손상차손발생일자 || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* 할인율 정보 섹션 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">할인율 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="할인율" className="flex items-center">
                      할인율(연) <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="할인율"
                      name="할인율"
                      // type="number"
                      step="0.01"
                      value={contractInfo.할인율 || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="deposit-discount-rate">임차보증금할인율(연)</Label>
                    <Input
                      id="deposit-discount-rate"
                      name="임차보증금할인율"
                      // type="number"
                      step="0.01"
                      value={contractInfo.임차보증금할인율 || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="recovery-discount-rate">복구충당부채할인율(연)</Label>
                    <Input
                      id="recovery-discount-rate"
                      name="복구충당부채할인율"
                      // type="number"
                      step="0.01"
                      value={contractInfo.복구충당부채할인율 || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="range-change">범위변동(%)</Label>
                    <Input
                      id="range-change"
                      name="범위변동"
                      // type="number"
                      step="0.01"
                      value={contractInfo.범위변동 || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <Button className="w-full mt-8" onClick={handleLeaseRegistration}>리스 등록</Button>
            </div>
          </section>
        </main>
      </div>

      {/* Analysis Result Dialog */}
      <Dialog open={showAnalysisResult} onOpenChange={setShowAnalysisResult}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">AI 분석 결과</DialogTitle>
          </DialogHeader>
          <div className="mt-6 space-y-8">
            <section>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">계약서 분석 결과</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-700">리스 해당 여부 분석:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li><span className="font-medium text-gray-700">식별된 자산:</span> 서울특별시 강남구 테헤란로 108길 42에 위치한 엠디엔타워 지상 2층</li>
                    <li><span className="font-medium text-gray-700">사용통제권:</span> 계약서 제1조에 따라 전차인은 해당 목적물을 전용으로 사용할 권리가 있음</li>
                    <li><span className="font-medium text-gray-700">대가:</span> 보증금과 월 임대료가 명시되어 있음</li>
                    <li><span className="font-medium text-gray-700">기간:</span> 명확한 리스기간이 설정되어 있음 (2022.8.1 ~ 2023.9.30)</li>
                  </ul>
                  <p className="mt-3 font-semibold text-green-600">→ IFRS 16의 리스 정의 요건을 충족하므로 리스에 해당함</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">주요 계약 정보</h3>
              <div className="space-y-4 text-gray-600">
                <p><span className="font-medium text-gray-700">리스명:</span> 엠디엔타워 사무실 임대차계약</p>
                <div>
                  <p className="font-medium text-gray-700 mb-2">리스기간:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>최초계약: 2022.8.1 ~ 2023.9.30 (14개월)</li>
                    <li>자동연장옵션: 계약만료 30일 전까지 별도 의사표시 없으면 1년씩 자동연장</li>
                    <li>최대 가능 연장기간: 2028.9.30까지</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-2">리스금액:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>보증금: ￦635,069,587</li>
                    <li>월 임대료: ￦97,858,933</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">사용자(리스이용자) 주의사항</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-700">계약 관련:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>전대차 금지 조항: 임대인의 사전 동의 없이 제3자 사용 금지</li>
                    <li>용도제한: 계약서상 정해진 용도로만 사용해야 함</li>
                    <li>원상복구 의무: 계약 종료/해지 시 원상복구 필요</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-700">비용 관련:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>관리비 정산: 실제 사용량에 따른 추가정산 가능성</li>
                    <li>연체료: 지연손해금 부과 가능성</li>
                    <li>공과금 및 제세공과금 부담 책임</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-700">계약 해지 관련:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>계약해지 사유 숙지 필요</li>
                    <li>해지 시 위약금 및 손해배상 책임 발생 가능</li>
                  </ul>
                </div>
              </div>
            </section>

            <p className="mt-6 text-gray-700 font-medium bg-yellow-100 p-4 rounded-md">
              이러한 조항들은 재무적, 운영적으로 중요한 영향을 미칠 수 있으므로 특별한 주의가 필요합니다.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function LeaseAIAnalysis() {
  return (
    <LeaseContractProvider>
      <SidebarProvider>
        <LeaseAIAnalysisContent />
      </SidebarProvider>
    </LeaseContractProvider>
  )
}

