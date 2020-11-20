import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Layout } from "antd";
import React from "react";

const {Content, Header} = Layout;

export default function Login() {
	const onFinish = values => {
		console.log("Received values of form: ", values);
	};

	return (
		<Layout style={{minHeight: "100vh"}}>
			<Header style={{
				backgroundColor: "#F0F2F5",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}>
				<img src="/logo.png" alt="Allirita logo" width={300} />
			</Header>
			<Content
				style={{
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Card style={{minWidth: 350}}>
					<Form
						name="normal_login"
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
					>
						<Form.Item
							name="username"
							rules={[
								{
									required: true,
									message: "Please input your Username!",
								},
							]}
						>
							<Input
								prefix={
									<UserOutlined className="site-form-item-icon" />
								}
								placeholder="Username"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: "Please input your Password!",
								},
							]}
						>
							<Input
								prefix={
									<LockOutlined className="site-form-item-icon" />
								}
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
						{/* <Form.Item>
					<Form.Item name="remember" valuePropName="checked" noStyle>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>
					<a className="login-form-forgot" href="">
                  Forgot password
               </a>
				</Form.Item> */}

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{width: "100%"}}
							>
								Log in
							</Button>
							{/* Or <a href="">register now!</a> */}
						</Form.Item>
					</Form>
				</Card>
			</Content>
		</Layout>
	);
}
