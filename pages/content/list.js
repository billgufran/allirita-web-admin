import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import ContentTable from "../../components/ContentTable";
import Sidebar from "../../components/SidebarLayout";
import api from "../../services/api";

//path: /content/list

export default function ContentList() {
	const [content, setContent] = useState(null)

	const getKonten = async () => {
		try {
			const result = await api.get("/konten")
			setContent(result.data.getKonten)
		} catch (error) {
			console.log(error)
		}
	}

	//on page load
	useEffect(() => {
		getKonten()
	},[])

	return (
		<>
			<Sidebar>
				<ContentTable content={content} getContent={getKonten} />
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
