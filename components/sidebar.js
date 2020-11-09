import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import { MdDashboard, MdExitToApp, MdPeople } from "react-icons/md";

const {Content, Sider} = Layout;

export default function Sidebar({children}) {
	return (
		<>
			<Layout style={{minHeight: "100vh"}}>
				<Sider width={200} className="site-layout-background">
					<Menu
						defaultSelectedKeys={["1"]}
						mode="inline"
						style={{height: "100%", borderRight: 1}}
					>
						<Menu.Item key="1" icon={<MdDashboard />}>
							Content
						</Menu.Item>
						<Menu.Item key="2" icon={<MdPeople />}>
							Users
						</Menu.Item>
						<Menu.Item key="3" icon={<MdExitToApp />}>
							Logout
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout style={{padding: "0 24px 24px"}}>
					<Breadcrumb style={{margin: "16px 0"}}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<Content
						className="site-layout-background"
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
						}}
					>
						Content
						{children}
					</Content>
				</Layout>
			</Layout>
		</>
	);
}
