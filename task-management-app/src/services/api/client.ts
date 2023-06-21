import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiClient {
    private client: AxiosInstance;

    constructor(baseURL: string, token?: string) {
        this.client = axios.create({
            baseURL,
            headers: {'Authorization': `Bearer ${token}`},
            withCredentials: true,
        });
    }

    async get<T>(path: string): Promise<AxiosResponse<T>> {
        return await this.client.get<T>(path);
    }

    async post<T>(path: string, payload: any): Promise<AxiosResponse<T>> {
        return await this.client.post<T>(path, payload);
    }

    async put<T>(path: string, payload: any): Promise<AxiosResponse<T>> {
        return await this.client.put<T>(path, payload);
    }

    async patch<T>(path: string, payload: any): Promise<AxiosResponse<T>> {
        return await this.client.patch<T>(path, payload);
    }

    async delete<T>(path: string): Promise<AxiosResponse<T>> {
        return await this.client.delete<T>(path);
    }
}

export default ApiClient;
