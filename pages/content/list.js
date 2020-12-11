import { PlusOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/AuthContext";
import ContentTable from "../../components/ContentTable";
import Sidebar from "../../components/SidebarLayout";
import api from "../../services/api";

//path: /content/list

export default function ContentList() {
	const [content, setContent] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const {user} = useContext(AuthContext);

	const getContent = async () => {
		try {
			setIsLoading(true);

			// API: GET get konten/video
			const res = await api.get("/konten", {
				headers: {Authorization: `Bearer ${user.token}`},
			});
			setContent(res.data.data.konten);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getContent();
	}, []);

	return (
		<Sidebar select="1">
			<Card
				title="Content list"
				extra={
					<Link href="/content/create">
						<Button
							type="primary"
							shape="round"
							icon={<PlusOutlined />}
							size="medium"
						>
							New Item
						</Button>
					</Link>
				}
			>
				<ContentTable
					content={content}
					getContent={getContent}
					isLoading={isLoading}
				/>
			</Card>
		</Sidebar>
	);
}
