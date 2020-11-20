import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Modal, Space, Table } from "antd";
import Link from "next/link";
import React, { useContext } from "react";
import { ContentDataContext } from "./ContentDataContext";

export default function ContentTable() {
	const {contentForm, data, setData} = useContext(ContentDataContext);

	const columns = [
		{
			title: "No",
			dataIndex: "no",
			key: "no",
		},
		{
			title: "Username",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "Email Address",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Action",
			dataIndex: "id",
			key: "id",
			render: (text, record) => (
				//text refer to data id
				<Space size="middle">
					<Link href={`/content/edit/${text}`}>
                  <EditFilled
                     // onClick={() => contentForm.setFieldsValue(record)}
                  />
					</Link>
					<DeleteFilled
						onClick={() =>
							Modal.confirm({
								title: "Delete content",
								content: "Are you sure?",
								centered: true,
								// DELETE
								// onOk: () => {
								// 	let filteredData = data.filter(
								// 		content => content.id !== text
								// 	);
								// 	setData(filteredData.map((el, index) => ({...el, no: index + 1,})));
								// },
							})
						}
					/>
				</Space>
			),
		},
	];

	return (
		<>
			<Table columns={columns} dataSource={data} />
		</>
	);
}