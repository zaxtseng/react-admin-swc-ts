// import useAuth from '@/api/hooks/useAuth';
import { useBoundStore } from '@/store';
import { styled } from '@linaria/react';
import { Button, Checkbox, Form, FormProps, Input, Typography, message } from 'antd';
import { useState } from 'react';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const MainBox = styled.div`
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	`;

	const LoginBox = styled.div`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 582px;
		height: 360px;
		padding: 20px 40px;
		margin: auto;
	`;

	const navigate = useNavigate();
	// 登录按钮loading
	const [loading, setLoading] = useState(false);
	// store中获取login
	const login = useBoundStore(state => state.login);

	const onFinished: FormProps['onFinish'] = async values => {
		setLoading(true);
		console.log(values);
		// 登录操作
		const result = await login(values);
		// 请求另一个接口,获取左侧菜单的路由
		// initRoutes(user.routes);
		setLoading(false);
		if (result) {
			message.success('登录成功');
			navigate('/');
		} else {
			message.error('登录失败');
		}
	};
	return (
		<MainBox>
			<LoginBox>
				<div style={{ textAlign: 'center' }}>
					<Typography.Title level={2}>React-Admin-SWC</Typography.Title>
				</div>
				<Form onFinish={onFinished}>
					<Form.Item rules={[{ required: true, message: '输入用户名' }]} name="account">
						<Input prefix={<AiOutlineUser />} size="large" placeholder="admin" />
					</Form.Item>
					<Form.Item rules={[{ required: true, message: '请输入密码' }]} name="password">
						<Input.Password prefix={<AiOutlineLock />} size="large" placeholder="password" />
					</Form.Item>
					<Form.Item>
						<Checkbox>自动登录</Checkbox>
						<Typography.Link>忘记密码</Typography.Link>
					</Form.Item>
					<Form.Item>
						<Button block type="primary" htmlType="submit" size="large" loading={loading}>
							登录
						</Button>
					</Form.Item>
				</Form>
			</LoginBox>
		</MainBox>
	);
};

export default Login;
