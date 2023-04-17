import { Response } from '@/types';
import { message } from 'antd';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import refresh from './helpers/refreshToken';
import { ApiStatus } from './interface';

const baseUrl = import.meta.env.VITE_API_URL;

// axios基础配置
const config: AxiosRequestConfig = {
	// 基础路径
	baseURL: baseUrl,
	// 超时时间
	timeout: 10000,
	// 跨域携带凭证
	withCredentials: true,
	// params序列化
	paramsSerializer: {
		serialize: (params: any) => {
			return qs.stringify(params, { arrayFormat: 'repeat' });
		}
	}
};

// 声明请求类
class Request {
	// 单例模式
	private instance: AxiosInstance;
	constructor(config: AxiosRequestConfig) {
		this.instance = axios.create(config);

		//* 请求拦截器
		this.instance.interceptors.request.use(
			config => {
				//* token
				const accessToken = localStorage.getItem('accessToken');
				config.headers['Authorization'] = accessToken ? `Bearer ${accessToken}` : null;

				return config;
			},
			error => {
				Promise.reject(error);
			}
		);

		//* 响应拦截器
		this.instance.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data } = response;
				//* 成功
				return data;
			},
			error => {
				console.log(error);

				const { data } = error.response;
				// 按照状态码划分
				//* 401
				if (data.code === ApiStatus.UNAUTHORIZED) {
					message.error(data.msg);
					// 启用refresh
					refresh(error);
					return Promise.reject(data);
				}
				//* 所有错误情况
				if (data.code && data.code !== ApiStatus.OK) {
					message.error(data.msg);
					return Promise.reject(data);
				}
				// message.error(error.toString());
				return Promise.reject(error);
			}
		);
	}

	request<T, R = any>(config: AxiosRequestConfig<R> = {}): Promise<Response<T>> {
		return this.instance.request<Response<T>, Response<T>, R>(config);
	}
	get<T>(url: string, params?: object | string, config: AxiosRequestConfig = {}): Promise<Response<T>> {
		return this.instance.get(url, { params, ...config });
	}
	post<T>(url: string, data?: object, config: AxiosRequestConfig = {}): Promise<Response<T>> {
		return this.instance.post(url, data, config);
	}
	put<T>(url: string, data?: object, config: AxiosRequestConfig = {}): Promise<Response<T>> {
		return this.instance.put(url, data, config);
	}
	delete<T>(url: string, params?: object | string, config: AxiosRequestConfig = {}): Promise<Response<T>> {
		return this.instance.get(url, { params, ...config });
	}
}

export default new Request(config);
