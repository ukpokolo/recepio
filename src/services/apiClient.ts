import axios, { type AxiosRequestConfig } from "axios";

const apiClient = axios.create({
     baseURL : import.meta.env.VITE_API_BASE_URL,  
     headers: {
    "Content-Type": "application/json",
  },
});



const Request = {
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await apiClient.get(url, config);
    return res.data;
  },

  async post<T = any>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const res = await apiClient.post(url, data, config);
    return res.data;
  },

  async put<T = any>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const res = await apiClient.put(url, data, config);
    return res.data;
  },

  async patch<T = any>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const res = await apiClient.patch(url, data, config);
    return res.data;
  },

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await apiClient.delete(url, config);
    return res.data;
  }
};

export default Request;
