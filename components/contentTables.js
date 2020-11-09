import { Space, Table, Tag } from "antd";
import React from "react";

export default function ContentTables() {
	const columns = [
		{
			title: "No",
			dataIndex: "key",
			key: "key",
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
					{tags.map(tag => {
						let color = tag.length > 5 ? "geekblue" : "green";
						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						);
					})}
				</>
			),
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<Space size="middle">
					<a>Invite {record.name}</a>
					<a>Delete</a>
				</Space>
			),
		},
	];

	const data = [
		{
			key: "1",
			title: "Game of Thrones",
			description: "Daenrys die in the season finale",
         category: ["war", "action"],
         Questions: 15,
		},
		{
			key: "2",
			title: "The Queen's Gambit",
			description: "Elizabeth likes to play chess",
         category: ["chess", "drama"],
         Questions: 8,
		},
	];

	return (
		<>
			<Table columns={columns} dataSource={data} />
		</>
	);
}
