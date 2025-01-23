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
    timeout: 30000,
    headers: {
      "Content-Type": contentType,
    },
    responseType,
  });
};

export const runAI = async (value: any) => {
  try {
    const apiClient = await axiosClient("form");
    const res = await apiClient.post("ask/", value);
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 500) {
        throw new Error("서버 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
    throw error;
  }
};