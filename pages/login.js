import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Layout } from "antd";
import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const {Content} = Layout;

export default function Login() {

	const {login, isLoading} = useContext(AuthContext);

	const onFinish = values => {
		const {email, password} = values
		login(email, password)
	};

	return (
		<Layout style={{minHeight: "100vh"}}>
			<Content
				style={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<img src="/logo.png" alt="Allirita logo" width={300} />
				<Card style={{minWidth: 350}}>
					<Form
						name="login"
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
					>
						<Form.Item
							name="email"
							rules={[
								{
									required: true,
									message: "Please input your Email!",
								},
							]}
						>
							<Input
								prefix={
									<UserOutlined className="site-form-item-icon" />
								}
								placeholder="Email"
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
							<Input.Password
								prefix={
									<LockOutlined className="site-form-item-icon" />
								}
								placeholder="Password"
							/>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{width: "100%", marginBottom: 7}}
								loading={isLoading}
							>
								Log in
							</Button>
							Or&nbsp;
							<Link href="/signup">Sign Up</Link>
						</Form.Item>
					</Form>
				</Card>
			</Content>
		</Layout>
	);
}
