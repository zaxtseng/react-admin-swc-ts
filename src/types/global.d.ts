// * Vite

declare type Recordable<T = any> = Record<string, T>;

declare interface ImportMetaEnv {
	VITE_API_URL: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_GLOB_APP_TITLE: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_PROXY_URL: string;
	VITE_BUILD_GZIP: boolean;
	VITE_REPORT: boolean;
	VITE_PUBLIC_PATH: string;
	VITE_API_BASE_URL: string;
	VITE_MOCK_ENABLED: boolean;
	VITE_MOCK_URL: string;
}
