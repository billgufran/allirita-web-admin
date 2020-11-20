import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import ContentTable from "../../components/ContentTable";
import Sidebar from "../../components/SidebarLayout";

//path: /content/list

export default function UsersList() {
	return (
		<>
			<Sidebar>
				<ContentTable />
				<Link href="/content/create">
					<Button
						type="primary"
						shape="round"
						icon={<PlusOutlined />}
						size="large"
						style={{alignSelf: "flex-end"}}
					>
						New Item
					</Button>
				</Link>
			</Sidebar>
		</>
	);
}
