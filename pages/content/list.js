import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import ContentTable from "../../components/ContentTable";
import Sidebar from "../../components/SidebarLayout";

//path: /content/list

export default function ContentList() {
	const [content, setContent] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const getContent = async () => {
		try {
			// API: GET get konten/video
			setIsLoading(true)
			// const res = await api.get("/konten")
			const res = await axios.get("https://run.mocky.io/v3/cc50a597-7c5a-482a-b88a-1e2bd8505b24")
			const data = res.data.data.getKonten.map((el, i) => ({...el, no: i + 1}))
			setContent(data)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	//on page load
	useEffect(() => {
		getContent()
	},[])

	return (
		<>
			<Sidebar>
				<ContentTable content={content} getContent={getContent} isLoading={isLoading}/>
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
