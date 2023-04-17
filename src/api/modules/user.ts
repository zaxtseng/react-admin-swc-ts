import api from '@/api';
import { useNavigate } from 'react-router-dom';
import fetcher from '../helpers/fetcher';
import { ILoginUser, IRegisterUser, IUserInfo } from '../interface';

//* 登录
export const login = (formData: ILoginUser) => {
	return api.post<IUserInfo>('/login', formData);
};
//* 注册
export const register = async (formData: IRegisterUser) => {
	await api.post('register', formData);
};

//* 注销
export const logout = async () => {
	const navigate = useNavigate();

	await fetcher('/logout');

	// 重定位到login
	navigate('/login');
};

//* 无感刷新
export const refreshApi = async (refresh: string) => api.post<{ accessToken: string }>('refresh', { refresh });
