import useSWR from 'swr';
import fetcher from '../helpers/fetcher';
import { IUser } from '../interface';

export const useAuth = () => {
	//* 用户信息
	const { data: user } = useSWR<IUser>('/user', fetcher);

	// 导出方法
	return {
		user
	};
};
