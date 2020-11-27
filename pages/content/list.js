import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
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
			const data = res.data.data.konten.map((el, i) => ({
				...el,
				no: i + 1,
			}));
			setContent(data);
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
		<Sidebar>
			<ContentTable
				content={content}
				getContent={getContent}
				isLoading={isLoading}
			/>
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
	);
}
