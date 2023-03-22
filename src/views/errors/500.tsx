import { Result } from 'antd';
import { FC, ReactNode } from 'react';

type Props = {
	error: any;
	extra: ReactNode;
};

const SystemError: FC<Props> = ({ error, extra }) => {
	return (
		<div>
			<Result
				status="500"
				subTitle={
					<div>
						<span>error</span>
						<span>
							<i>{error.statusText || error.message || error.msg}</i>
						</span>
					</div>
				}
				extra={extra}
			/>
		</div>
	);
};

export default SystemError;
