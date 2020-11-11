import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Modal, Space, Table, Tag } from "antd";
import Link from "next/link";
import React, { useContext } from "react";
import { DataContext } from "./DataContext";

export default function ContentTables() {
	const {contentForm, data, setData} = useContext(DataContext);

	const columns = [
		{
			title: "No",
			dataIndex: "no",
			key: "no",
		},
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
			render: tags => (
				<>
					{tags.map(tag => (
						<Tag color="grey" key={tag}>
							{tag.toUpperCase()}
						</Tag>
					))}
				</>
			),
		},
		{
			title: "Action",
			dataIndex: "id",
			key: "id",
			render: (text, record) => (
				//text refer to data id
				<Space size="middle">
					<Link href={`/content/edit/${text}`}>
						<EditFilled onClick={() => contentForm.setFieldsValue(record)} />
					</Link>
					<DeleteFilled
						onClick={() =>
							Modal.confirm({
								title: "Delete content",
								content: "Are you sure?",
								centered: true,
								// DELETE
								onOk: () => {
									let filteredData = data.filter(
										content => content.id !== text
									);
									setData(filteredData.map((el, index) => ({...el, no: index + 1,})));
								},
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
