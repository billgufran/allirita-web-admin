import { Table } from "antd";

export default function UserTable({users, isLoading}) {

	const columns = [
		{
			title: "No",
			dataIndex: "no",
			key: "no",
			render: (text, record, index) => index + 1
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
	];

	return (
		<>
			<Table columns={columns} dataSource={users} loading={isLoading} />
		</>
	);
}