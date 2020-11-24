import {
	AppstoreOutlined,
	ImportOutlined,
	TeamOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const {Content, Sider} = Layout;

export default function Sidebar({children}) {

	const {logout} = useContext(AuthContext);

	return (
		<>
			<Layout style={{minHeight: "100vh"}}>
				<Sider width={200}>
					<Menu
						defaultSelectedKeys={["1"]}
						mode="inline"
						style={{height: "100%", borderRight: "1px solid lightgrey"}}
					>
						<img
							src="/logo.png"
							alt="Allirita logo"
							height={79}
							width={200}
						/>
						<Menu.Item key="1" icon={<AppstoreOutlined />}>
							<Link href="/content/list">Content</Link>
						</Menu.Item>
						<Menu.Item key="2" icon={<TeamOutlined />}>
							<Link href="/users/list">Users</Link>
						</Menu.Item>
						<Menu.Item key="3" icon={<ImportOutlined />} onClick={logout}>
							<Link href="/login">Logout</Link>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout style={{padding: 24}}>
					<Content
						style={{
							margin: 0,
							height: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
						}}
					>
						{children}
					</Content>
				</Layout>
			</Layout>
		</>
	);
}
