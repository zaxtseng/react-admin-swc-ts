import { ILoginUser } from '@/api/interface';
import { login } from '@/api/modules';
import { StateCreator } from 'zustand';

export interface AuthSlice {
	accessToken: string | null;
	refreshToken: string | null;
	resetToken: () => void;
	login: (formData: ILoginUser) => Promise<boolean>;
}

export const initToken = {
	accessToken: null,
	refreshToken: null
};

export const createAuthSlice: StateCreator<
	AuthSlice,
	[['zustand/devtools', never], ['zustand/immer', never]],
	[],
	AuthSlice
> = set => ({
	accessToken: null,
	refreshToken: null,
	// 重置token
	resetToken: () => set({ ...initToken }),
	login: async (formData: ILoginUser) => {
		const { data: userInfo } = await login(formData);
		if (!userInfo) return false;
		// 保存token
		localStorage.setItem('accessToken', userInfo.accessToken);
		localStorage.setItem('refreshToken', userInfo.refreshToken);
		set({ ...userInfo });
		return true;
	}
});
