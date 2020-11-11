import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import ContentTables from "../../components/ContentTables";
import Sidebar from "../../components/SidebarLayout";

//path: /content/list

export default function ContentList() {
	return (
		<>
			<Sidebar>
				<ContentTables />
				<Link href="/content/create">
					<Button
						type="primary"
						shape="round"
						icon={<PlusOutlined />}
						size="large"
					>
						New Item
					</Button>
				</Link>
			</Sidebar>
		</>
	);
}
