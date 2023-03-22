import { HOME_URL } from '@/config';
import { Button } from 'antd';
import { useNavigate, useRouteError } from 'react-router-dom';
import NoAccess from './403';
import NotFound from './404';
import SystemError from './500';

const ErrorPage = () => {
	const navigate = useNavigate();
	const error: any = useRouteError();

	const Extra = () => (
		<Button type="primary" onClick={() => navigate(HOME_URL)}>
			Back Home
		</Button>
	);

	const ErrorResult = () => {
		switch (error.status) {
			case 403:
				return <NoAccess extra={<Extra />} />;
			case 404:
				return <NotFound />;
			default:
				return <SystemError error={error} extra={<Extra />} />;
		}
	};

	return (
		<div>
			<ErrorResult />
		</div>
	);
};

export default ErrorPage;
