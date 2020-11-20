import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Modal, Space, Table, Tag } from "antd";
import Link from "next/link";
import React, { useContext } from "react";
import api from "../services/api";
import { ContentDataContext } from "./ContentDataContext";

export default function ContentTable({data, getData}) {
	const {contentForm, setData} = useContext(ContentDataContext);

	const deleteData = async (id) => {
		try {
			await api.delete(`/konten/${id}`)
			getData()
		} catch (error) {
			console.log(error)
		}
	}

	const columns = [
		{
			title: "No",
			dataIndex: "no",
			key: "no",
		},
		{
			title: "Title",
			dataIndex: "judul",
			key: "judul",
		},
		{
			title: "Description",
			dataIndex: "deskripsi",
			key: "deskripsi",
		},
		{
			title: "Category",
			dataIndex: "kategori",
			key: "kategori",
			render: tags => (
				<>
					{tags.map(tag => (
						<Tag key={tag}>
							{tag.toUpperCase()}
						</Tag>
					))}
				</>
			),
		},
		{
			title: "Action",
			dataIndex: "id_konten",
			key: "id_konten",
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
									// let filteredData = data.filter(
									// 	content => content.id !== text
									// );
									// setData(filteredData.map((el, index) => ({...el, no: index + 1,})));
									deleteData(text)
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