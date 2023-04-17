/**
 * @name refreshToken
 * @description 判断accessToken是否失效,
 * @description 如果失效会带着refreshToken请求一个新的accessToken
 */

import api from '@/api';
import { AxiosError } from 'axios';
import { refreshApi } from '../modules';

// 最大重发次数
const MAX_ERROR_COUNT = 5;
// 当前重发次数
let currentCount = 0;
// 缓存请求队列
const queue: ((t: string) => any)[] = [];
// 当前是否刷新状态
let isRefresh = false;

const refresh = async (error: AxiosError<Response>) => {
	// 清除方法
	const clearAuth = () => {
		console.log('身份过期，请重新登录');
		window.location.replace('/login');
		// 清空数据
		localStorage.clear();
		return Promise.reject(error);
	};

	// accessToken失效
	// 判断本地是否有缓存有refreshToken
	const refreshToken = localStorage.get('refreshToken') ?? null;
	if (!refreshToken) {
		clearAuth();
	}
	// 提取请求的配置
	const { config } = error;
	// 判断是否refresh失败且状态码401，再次进入错误拦截器
	if (config!.url?.includes('refresh')) {
		clearAuth();
	}
	// 判断当前是否为刷新状态中（防止多个请求导致多次调refresh接口）
	if (!isRefresh) {
		// 设置当前状态为刷新中
		isRefresh = true;
		// 如果重发次数超过，直接退出登录
		if (currentCount > MAX_ERROR_COUNT) {
			clearAuth();
		}
		// 增加重试次数
		currentCount += 1;

		try {
			const {
				data: { accessToken }
			} = await refreshApi(refreshToken);
			// 请求成功，缓存新的accessToken
			localStorage.set('accessToken', accessToken);
			// 重置重发次数
			currentCount = 0;
			// 遍历队列，重新发起请求
			queue.forEach(cb => cb(accessToken));
			// 返回请求数据
			return api.request(error.config);
		} catch {
			// 刷新token失败，直接退出登录
			console.log('请重新登录');
			localStorage.clear();
			window.location.replace('/login');
			return Promise.reject(error);
		} finally {
			// 重置状态
			isRefresh = false;
		}
	} else {
		// 当前正在尝试刷新token，先返回一个promise阻塞请求并推进请求列表中
		return new Promise(resolve => {
			// 缓存网络请求，等token刷新后直接执行
			queue.push((newToken: string) => {
				Reflect.set(config!.headers.common!, 'Authorization', `Bearer ${newToken}`);
				resolve(api.request<Response>(config));
			});
		});
	}
};

export default refresh;
