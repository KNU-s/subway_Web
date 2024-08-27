import { AxiosRequestConfig } from "axios";
import axiosInstance from "../utils/axiosInstance";

interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<APIResponse<T>> => {
  try {
    const response = await axiosInstance.get(url, config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error(error);
    return {
      data: {} as T,
      status: 500,
      message: "Error",
    };
  }
};

export default getData;
