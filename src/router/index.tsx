import { PageBaseUrl } from '@/config';
import Layout from '@/layout';
import { useBoundStore } from '@/store';
import ErrorPage from '@/views/errors';
import NotFound from '@/views/errors/404';
import Login from '@/views/Login';
import { lazy, memo, useEffect, useMemo, useState } from 'react';
import { createBrowserRouter, redirect, RouteObject, RouterProvider } from 'react-router-dom';
import { IRouteObject } from './interface';
import Lazy from './utils/Lazy';

const modules = import.meta.glob('@/views/**/index.tsx', { eager: false }) as Record<string, any>;

// 动态加载路由
const getRoutes = async (router?: IRouteObject[], parent: string = '', arr: any = []) => {
	if (!router) return [];
	for (const route of router) {
		const item: RouteObject = {
			index: route.index ?? false,
			path: parent + (route.path ?? ''),
			errorElement: <ErrorPage />,
			// 加载路由JSON中携带的数据
			loader: () => route.data || {}
		};

		// 如果有element 就加载组件
		if (route.elementPath) {
			item.element = <Lazy Comp={lazy(modules[`${PageBaseUrl + route.elementPath}.tsx`])} />;
		}

		// 如果有children 子路由就递归加载
		if (route.children) {
			item.children = [...(await getRoutes(route.children ?? undefined, item.path))];
		}
		arr.push(item);
	}
	return arr;
};

const Router = () => {
	const routesJson = useBoundStore(state => state.routes);
	const [children, setChildren] = useState([]);

	useEffect(() => {
		// 加载json中路由
		if (routesJson.length) {
			getRoutes(routesJson).then(res => {
				setChildren(res);
			});
		}
	}, [routesJson]);

	// 基础路由
	const rootRoutes: IRouteObject[] = [
		{
			path: '/',
			element: <Layout />,
			errorElement: <ErrorPage />,
			children: [{ errorElement: <ErrorPage />, children }],
			loader() {
				const token = localStorage.getItem('token');
				if (!token) {
					return redirect('/login');
				}
				return {};
			}
		},
		{
			path: '/login',
			element: <Login />,
			errorElement: <ErrorPage />
		},
		{
			path: '*',
			element: <NotFound />
		}
	];
	const router = useMemo(() => {
		return createBrowserRouter(rootRoutes);
	}, [children, rootRoutes]);

	return <RouterProvider router={router} />;
};

export default memo(Router);
