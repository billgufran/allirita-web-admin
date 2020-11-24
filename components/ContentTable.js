import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Modal, Space, Table, Tag } from "antd";
import Link from "next/link";
import React from "react";
import api from "../services/api";

export default function ContentTable({content, getContent, isLoading}) {

	const deleteData = async (id) => {
		try {
			await api.delete(`/konten/${id}`)
			getContent()
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
		// {
		// 	title: "Category",
		// 	dataIndex: "kategori",
		// 	key: "kategori",
		// 	render: tags => (
		// 		<>
		// 			{tags.map(tag => (
		// 				<Tag key={tag}>
		// 					{tag.toUpperCase()}
		// 				</Tag>
		// 			))}
		// 		</>
		// 	),
		// },
		{
			title: "Category",
			dataIndex: "kategori",
			key: "kategori",
			render: categories => {
				let arr = categories.split(",")
				return (
					<>
						{
							arr.map(category => (
								<Tag key={category}>
									{category.trim().toUpperCase()}
								</Tag>
							))
						}
					</>
				)
			}
		},
		{
			title: "Action",
			dataIndex: "id_konten",
			key: "id_konten",
			render: (text, record) => (
				//"text" refer to data id
				<Space size="middle">
					<Link href={`/content/edit/${text}`}>
						<EditFilled />
					</Link>
					<DeleteFilled
						onClick={() =>
							Modal.confirm({
								title: "Delete content",
								content: "Are you sure?",
								centered: true,
								// DELETE
								onOk: () => {
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
			<Table columns={columns} dataSource={content} loading={isLoading}/>
		</>
	);
}