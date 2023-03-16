/**
 * @description 将 vite 的原始环境变量转成正确的类型
 * @param env 原始的 vite 环境变量
 * @returns 转换成正确类型的 vite 环境变量
 */
export const useEnv = (env: Recordable): ImportMetaEnv => {
	const ret: any = {};

	for (const envKey of Object.keys(env)) {
		let envValue = env[envKey];

		// 转成正确的布尔类型
		envValue = envValue === 'true' ? true : envValue === 'false' ? false : envValue;

		// VITE_PORT 转成 number
		if (envKey === 'VITE_PORT') {
			envValue = parseInt(envValue);
		}

		ret[envKey] = envValue;
	}

	return ret;
};
