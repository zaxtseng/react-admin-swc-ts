import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createSystemSlice, SystemSlice } from './modules';

/**
 * @name useBoundStore
 * @description RootStore
 * @description 根store,其中中间件devtools开发调试用,
 * @description persist持久化存储用
 */
export const useBoundStore = create<SystemSlice>()(
	devtools(
		persist(
			(...a) => ({
				...createSystemSlice(...a)
			}),
			{ name: 'RootStore' }
		),
		{ name: 'RootStore' }
	)
);

/**
 * @name useShallowBoundStore
 * @description 浅比较 useBoundStore
 */

export const useShallowBoundStore = (f: (state: ShallowBoundStoreState) => any) => {
	return useBoundStore(f, shallow);
};

//* 定义传入 state 的类型
type ShallowBoundStoreState = ReturnType<(typeof useBoundStore)['getState']>;
