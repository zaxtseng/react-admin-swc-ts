import { Result } from 'antd';
import { FC, ReactNode } from 'react';

type Props = {
	extra: ReactNode;
};

const NoAccess: FC<Props> = ({ extra }) => {
	return <Result status="403" subTitle="NoAccess" extra={extra} />;
};

export default NoAccess;
