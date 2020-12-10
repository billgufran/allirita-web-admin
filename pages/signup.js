import { Button, Card, Form, Input, Layout } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";

const {Content} = Layout;

export default function SignUp() {

	const {signUp} = useContext(AuthContext);

	const router = useRouter()

	useEffect(() => {
		process.env.NODE_ENV !== "development" && router.push("/")
	}, [])

	const onFinish = values => {
		const {name, email, password} = values
		signUp(name, email, password)
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
				<Card style={{minWidth: 350}}>
					<Form
						name="signup"
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
					>
						<Form.Item
							name="name"
							rules={[
								{
									required: true,
									message: "Please input your Name!",
								},
							]}
						>
							<Input placeholder="Name" />
						</Form.Item>
						<Form.Item
							name="email"
							rules={[
								{
									required: true,
									message: "Please input your Email!",
								},
							]}
						>
							<Input placeholder="Email" />
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
							<Input.Password placeholder="Password" />
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{width: "100%", marginBottom: 7}}
							>
								Sign Up
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Content>
		</Layout>
	);
}
