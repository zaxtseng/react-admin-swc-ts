import { Routes } from '@/types';
import { StateCreator } from 'zustand';

export interface RouteSlice {
	routes: Routes;
	current: Routes[0] | undefined;
	setCurrent: (payload: any) => void;
	initRoutes: (payload: any) => void;
}

export const createRouteSlice: StateCreator<RouteSlice, [['zustand/devtools', never]], [], RouteSlice> = set => {
	return {
		routes: [],
		current: undefined,
		setCurrent: payload => set(() => ({ current: payload }), false, 'routeCurrentChange'),
		initRoutes: payload => set(() => ({ routes: payload }), false, 'initRoutes')
	};
};
