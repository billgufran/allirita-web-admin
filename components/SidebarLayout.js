import {
	AppstoreOutlined,
	ImportOutlined,
	TeamOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const {Content, Sider} = Layout;

export default function Sidebar({children, select}) {
	const {logout, user} = useContext(AuthContext);

	const [role, setRole] = useState(0)

	useEffect(() => {
		setRole(user?.id_role)
	}, [user])

	return (
		<Layout>
			<Sider
				width={200}
				style={{
					overflow: "hide",
					height: "100vh",
					position: "fixed",
					left: 0,
					backgroundColor: "#fff",
					borderRight: "1px solid lightgrey",
				}}
			>
				<Menu defaultSelectedKeys={[select]} mode="inline">
					<img
						src="/logo.png"
						alt="Allirita logo"
						height={79}
						width={200}
					/>
					<Menu.Item key="1" icon={<AppstoreOutlined />}>
						<Link href="/content/list">Content</Link>
					</Menu.Item>
					{role === 1 && (
						<Menu.Item key="2" icon={<TeamOutlined />}>
							<Link href="/users/list">Users</Link>
						</Menu.Item>
					)}
					<Menu.Item key="3" icon={<ImportOutlined />} onClick={logout}>
						<Link href="/login">Logout</Link>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout style={{marginLeft: 200}}>
				<Content
					style={{
						padding: "24px 16px",
						overflow: "initial",
						minHeight: "100vh",
						width: "100%",
						display: "flex",
						flexDirection: "column",
						placeItems: "center start",
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
}
