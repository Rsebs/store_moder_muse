import axios, { AxiosError } from 'axios';
import { SessionStorage } from 'quasar';

export default class AxiosService {
  static axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API,
    params: {
      lang: 'es',
    },
  });

  static async get(
    url: string,
    params?: Record<string, unknown>
  ): Promise<any> {
    try {
      const response = await this.axiosInstance.get(url, {
        params: {
          ...params,
        },
        headers: {
          Authorization: `Bearer ${SessionStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw error.response?.data;
      throw new Error(`Error fetching data from ${url}: ${error}`);
    }
  }

  static async post(
    url: string,
    body: Record<string, unknown>,
    params?: Record<string, unknown>
  ): Promise<any> {
    try {
      const response = await this.axiosInstance.post(url, body, {
        params: {
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw error.response?.data;
      throw new Error(`Error fetching data from ${url}: ${error}`);
    }
  }

  static async put(
    url: string,
    body: Record<string, unknown>,
    params?: Record<string, unknown>
  ): Promise<any> {
    try {
      const response = await this.axiosInstance.put(url, body, {
        params: {
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw error.response?.data;
      throw new Error(`Error fetching data from ${url}: ${error}`);
    }
  }

  static async delete(
    url: string,
    params?: Record<string, unknown>
  ): Promise<any> {
    try {
      const response = await this.axiosInstance.delete(url, {
        params: {
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw error.response?.data;
      throw new Error(`Error fetching data from ${url}: ${error}`);
    }
  }
}
