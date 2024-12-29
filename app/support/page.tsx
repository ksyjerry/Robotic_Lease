"use client"

import { useState } from "react"
import Image from "next/image"
import { SidebarProvider, useSidebar } from "@/components/sidebar-provider"
import { SidebarNav } from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { HomeIcon, FileText, HelpCircle, Settings, Database, FileSpreadsheet, Menu, PlusCircle } from 'lucide-react'

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

type Post = {
  id: number
  title: string
  author: string
  date: string
  views: number
  content: string
}

const SupportContent = () => {
  const { isOpen, toggle } = useSidebar()
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5
  const [posts, setPosts] = useState<Post[]>([
    { id: 10, title: "시스템 업데이트 일정 안내", author: "관리자", date: "2023-06-10", views: 250, content: "다음 주 화요일 오전 2시부터 4시까지 시스템 업데이트가 진행될 예정입니다. 이 시간 동안 서비스 이용이 제한될 수 있습니다." },
    { id: 9, title: "계정 정보 변경 절차", author: "오미영", date: "2023-06-09", views: 130, content: "계정 정보 변경은 '설정 > 계정 관리'에서 가능합니다. 보안을 위해 변경 시 이메일 인증이 필요합니다." },
    { id: 8, title: "사용자 매뉴얼 다운로드 링크 요청", author: "임성훈", date: "2023-06-08", views: 75, content: "사용자 매뉴얼은 홈페이지 하단의 '고객지원 > 다운로드' 섹션에서 찾으실 수 있습니다." },
    { id: 7, title: "데이터 백업 주기 문의", author: "강다혜", date: "2023-06-07", views: 110, content: "데이터는 매일 밤 자동으로 백업됩니다. 수동 백업도 '설정 > 데이터 관리'에서 언제든 가능합니다." },
    { id: 6, title: "로그인 문제 해결 방법", author: "홍길동", date: "2023-06-06", views: 180, content: "로그인 문제 발생 시 먼저 브라우저 캐시를 삭제해보세요. 문제가 지속되면 비밀번호 재설정을 시도해보세요." },
    { id: 5, title: "새로운 기능 제안", author: "송지원", date: "2023-06-05", views: 95, content: "리스 계약 만료일 알림 기능을 추가해주시면 좋겠습니다. 만료 한 달 전부터 알림을 받을 수 있으면 유용할 것 같습니다." },
    { id: 4, title: "리스회계 보고서 생성 오류", author: "정민준", date: "2023-06-04", views: 150, content: "리스회계 보고서 생성 시 '오류 코드 1234'가 발생합니다. 어떻게 해결할 수 있을까요?" },
    { id: 3, title: "계약 관리 페이지 사용 팁", author: "박지성", date: "2023-06-03", views: 200, content: "계약 관리 페이지에서 '태그' 기능을 활용하면 계약을 쉽게 분류하고 검색할 수 있습니다." },
    { id: 2, title: "AI 분석 결과 해석 도움 요청", author: "이영희", date: "2023-06-02", views: 85, content: "AI 분석 결과 중 '리스크 지수'가 무엇을 의미하는지 이해하기 어렵습니다. 자세한 설명 부탁드립니다." },
    { id: 1, title: "리스 계약 작성 방법 문의", author: "김철수", date: "2023-06-01", views: 120, content: "리스 계약 작성 시 필수 입력 항목들을 한 눈에 볼 수 있는 체크리스트가 있으면 좋겠습니다." },
  ])

  const [newPost, setNewPost] = useState({ title: "", content: "", author: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewPost(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = Math.max(...posts.map(post => post.id)) + 1
    const currentDate = new Date().toISOString().split('T')[0]
    const newPostData = {
      id: newId,
      title: newPost.title,
      author: newPost.author,
      date: currentDate,
      views: 0,
      content: newPost.content
    }
    setPosts(prev => [newPostData, ...prev])
    setNewPost({ title: "", content: "", author: "" })
    setIsDialogOpen(false)
  }

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
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
      <div className="flex-1 overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggle} className="mr-4">
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">고객 지원</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                게시글 작성
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>새 게시글 작성</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-lg">제목</Label>
                  <Input
                    id="title"
                    name="title"
                    value={newPost.title}
                    onChange={handleInputChange}
                    required
                    className="text-lg p-3"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="author" className="text-lg">작성자</Label>
                  <Input
                    id="author"
                    name="author"
                    value={newPost.author}
                    onChange={handleInputChange}
                    required
                    className="text-lg p-3"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="content" className="text-lg">내용</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={newPost.content}
                    onChange={handleInputChange}
                    required
                    className="min-h-[200px] text-lg p-3"
                  />
                </div>
                <Button type="submit" className="w-full text-lg py-6">게시글 등록</Button>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        <main className="p-6 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">고객 지원 게시판</h2>

            <div className="overflow-x-auto w-full">
              <Table>
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="w-[80px]">번호</TableHead>
                    <TableHead className="w-[40%]">제목</TableHead>
                    <TableHead className="w-[15%]">작성자</TableHead>
                    <TableHead className="w-[15%]">작성일</TableHead>
                    <TableHead className="w-[10%]">조회수</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>{post.id}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handlePostClick(post)}
                          className="text-blue-600 hover:underline text-left"
                        >
                          {post.title}
                        </button>
                      </TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{post.date}</TableCell>
                      <TableCell>{post.views}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
              {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  className="mx-1"
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </div>

          {/* Post Detail Section */}
          {selectedPost && (
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{selectedPost.title}</h3>
              <div className="mb-4 text-sm text-gray-500">
                <span>작성자: {selectedPost.author}</span>
                <span className="mx-2">|</span>
                <span>작성일: {selectedPost.date}</span>
                <span className="mx-2">|</span>
                <span>조회수: {selectedPost.views}</span>
              </div>
              <p className="text-lg whitespace-pre-wrap">{selectedPost.content}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function Support() {
  return (
    <SidebarProvider>
      <SupportContent />
    </SidebarProvider>
  )
}

