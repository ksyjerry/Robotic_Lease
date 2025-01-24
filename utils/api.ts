import axios, { AxiosError, ResponseType } from "axios";

export const axiosClient = (
  header: "form" | "text",
  responseType: ResponseType = "json"
) => {
  const contentType =
    header === "form" ? "multipart/form-data" : "text/html; charset=utf-8";
  return axios.create({
    baseURL: `http://127.0.0.1:8000/`,
    // baseURL: `http://10.137.150.164:8080/`,
    headers: {
      "Content-Type": contentType,
    },
    responseType,
  });
};

export const runAI= async (value: any) => {
    const apiClient = await axiosClient("form");
    const res = await apiClient.post("ask/", value);  // 엔드포인트를 'test/'로 변경
  
    return res;
  };

  // 새로 추가된 부분 저장
  export const saveLeaseContract = async (leaseData: any) => {
    const apiClient = await axiosClient("text");
    const res = await apiClient.post("/save/", leaseData);
    return res;
  };