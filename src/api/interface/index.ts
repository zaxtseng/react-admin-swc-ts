// 登录
export interface ILoginUser {
	username: string;
	password: string;
}

// 注册
export interface IRegisterUser extends ILoginUser {
	email: string;
	confirmPassword: string;
}

// export interface ILoginRes {
// 	token: string;
// }

// 用户信息
export interface IUser {
	userInfo: {
		userId: number | undefined;
		nickName: string;
		userName: string;
		portraitUrl?: string;
		favoriteCatCategory: number | undefined;
	};
	resetUser: () => void;
}

type UserType = Omit<IUser, 'resetUser'>;

// 登录用户信息
export interface IUserInfo extends UserType {
	accessToken: string;
	refreshToken: string;
}

// useAuth
export interface IAuth {
	user?: IUser;
	login: (formData: ILoginUser) => Promise<void>;
	register: (formData: IRegisterUser) => Promise<void>;
	logout: () => Promise<void>;
}

// 状态码
export enum ApiStatus {
	OK = 200,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	ERROR = 500
}
