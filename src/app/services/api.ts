import axios, { Axios, AxiosError } from "axios";
import { ResponseApi } from "./types";

class Api {
  api: Axios;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
    });
    this.setAuthHeader(JSON.parse(localStorage.getItem("user_id") || "[]"));
  }

  setAuthHeader(user_id?: string) {
    this.api.defaults.headers.common["authorization"] =
      user_id || JSON.parse(localStorage.getItem("user_id") || "");
  }

  async doPost(url: string, data: any, params?: string): Promise<ResponseApi> {
    try {
      const response = await this.api.post(url, data, { params });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async doGet(url: string, params?: any): Promise<ResponseApi> {
    try {
      const response = await this.api.get(url, { params });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async doPut(url: string, data: any, params?: any): Promise<ResponseApi> {
    try {
      const response = await this.api.put(url, data, { params });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async doDelete(url: string): Promise<ResponseApi> {
    try {
      const response = await this.api.delete(url);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async doDeleteMultipleTasks(url: string, data: any): Promise<ResponseApi> {
    try {
      const response = await this.api.post(url, data);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}

export default new Api();
