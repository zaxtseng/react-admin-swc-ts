import { Spin } from 'antd';
import { LazyExoticComponent, Suspense } from 'react';

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */

const Lazy = ({ Comp }: { Comp: LazyExoticComponent<any> }) => {
	return (
		<Suspense
			fallback={
				<div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Spin size="large" />
				</div>
			}
		>
			<Comp />
		</Suspense>
	);
};

export default Lazy;
