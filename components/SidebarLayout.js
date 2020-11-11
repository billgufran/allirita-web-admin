import {
	AppstoreOutlined,
	ImportOutlined,
	TeamOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const {Content, Sider} = Layout;

export default function Sidebar({children}) {
	return (
		<>
			<Layout style={{minHeight: "100vh"}}>
				<Sider width={200} className="site-layout-background">
					<Menu
						defaultSelectedKeys={["1"]}
						mode="inline"
						style={{height: "100%", borderRight: "1px solid lightgrey"}}
					>
						<Image
							src="/logo.png"
							alt="Allirita logo"
							height={79}
							width={200}
						/>
						<Menu.Item key="1" icon={<AppstoreOutlined />}>
							<Link href="/content/list">Content</Link>
						</Menu.Item>
						<Menu.Item key="2" icon={<TeamOutlined />}>
							<Link href="/content/list">Users</Link>
						</Menu.Item>
						<Menu.Item key="3" icon={<ImportOutlined />}>
							Logout
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout style={{padding: 24}}>
					{/* <Breadcrumb style={{margin: "16px 0"}}>
						<Breadcrumb.Item>Content</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
					</Breadcrumb> */}
					<Content
						className="site-layout-background"
						style={{
							margin: 0,
							minHeight: 280,
						}}
					>
						{children}
					</Content>
				</Layout>
			</Layout>
		</>
	);
}