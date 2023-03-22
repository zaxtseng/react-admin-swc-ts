import { Routes } from '@/types';
import { StateCreator } from 'zustand';

export interface SystemSlice {
	routes: Routes;
	initRoutes: (payload: any) => void;
}

export const createSystemSlice: StateCreator<SystemSlice, [['zustand/devtools', never]], [], SystemSlice> = set => ({
	routes: [],
	initRoutes: payload => set(() => ({ routes: payload }), false, 'systemSlice/initRoutes')
});
