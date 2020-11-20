import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Layout } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const {Content} = Layout;

export default function Login() {
	const onFinish = values => {
		console.log("Received values of form: ", values);
	};

	const router = useRouter();

	console.log(router.pathname);

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
						<Form.Item>
							<Link href="/content/list">
								<Button
									type="primary"
									htmlType="submit"
									style={{width: "100%"}}
								>
									Log in
								</Button>
							</Link>
							{/* Or <a href="">Create account</a> */}
						</Form.Item>
					</Form>
				</Card>
			</Content>
		</Layout>
	);
}
