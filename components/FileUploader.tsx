import React from "react";
import { useDropzone } from "react-dropzone";
import { useFilesStore } from "../store/main";
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react";

const MAX_FILE_SIZE_MB = 5; // 파일 크기 제한 (5MB)

export function FileUploader() {
  const { file, setFile } = useFilesStore();


  const onDrop = (acceptedFiles: File[]) => {
    console.log("onDrop triggered", acceptedFiles);

    const file = acceptedFiles[0]; // 단일 파일만 사용
    if (!file) return;

    console.log("File details:", file);

    // 파일 타입 검사
    if (acceptedFiles.length === 0) {
        alert("지원되지 않는 파일 형식입니다.");
        return;
      }

    // 파일 크기 검사
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      alert(`파일 크기는 ${MAX_FILE_SIZE_MB}MB를 초과할 수 없습니다.`);
      return;
    }

    // 파일 저장
    setFile(file); // useFilesStore의 파일 상태 업데이트
    console.log("Current files:", file);
    alert(`파일 ${file.name}이(가) 업로드되었습니다.`);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"], // PDF 파일만 허용
    },
    multiple: false, // 단일 파일만 허용
  });

  return (
    <div className="flex items-center space-x-4">
      {/* 파일 업로더 */}
      <Button {...getRootProps()} className="flex items-center">
        <Upload className="w-4 h-4 mr-2" />
        파일 선택
        <input 
            {...getInputProps({
                onClick: (event) => {
                    event.currentTarget.value = "";
                },
            })} 
        className="hidden" />
      </Button>

      {/* 파일 이름 표시 */}
      <span className="text-sm text-gray-500">
        {file ? file.name : "선택된 파일 없음"}
      </span>
    </div>
  );
}
