import { HOME_URL } from '@/config';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div>
			<Result
				status="404"
				subTitle={<span>NotFound</span>}
				extra={
					<Button type="primary" onClick={() => navigate(HOME_URL)}>
						Back Home
					</Button>
				}
			/>
		</div>
	);
};

export default NotFound;
