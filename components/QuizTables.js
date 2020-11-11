import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Form, Modal, Space, Table } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import QuizModal from "./QuizModal";

export default function QuizTables() {
	const [quizForm] = Form.useForm();


	// TABLE
	const dataSource = [
		{
			id: "1",
			question: "How many people have died throughout the show?",
			answer: "Too much",
			wrong: ["55", "781", "None"],
		},
		{
			id: "2",
			question: "Really",
			answer: "Yes",
			wrong: ["Perhaps", "No", "Maybe"],
		},
	];

	const [data, setData] = useState(
		dataSource.map((el, index) => ({no: index + 1, ...el}))
	);

	const columns = [
		{
			title: "No",
			dataIndex: "no",
			key: "no",
		},
		{
			title: "Question",
			dataIndex: "question",
			key: "question",
		},
		{
			title: "Answer",
			dataIndex: "answer",
			key: "answer",
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
							onClick={() => {
								quizForm.setFieldsValue(record);
								setModalVisible(true);
							}}
						/>
					</Link>
					<DeleteFilled
						onClick={() =>
							Modal.confirm({
								title: "Delete question",
								content: "Are you sure?",
								centered: true,
								// QUIZ DELETE
								onOk: () => {
									let filteredData = data.filter(
										content => content.id !== text
									);
									setData(
										filteredData.map((el, index) => ({
											...el,
											no: index + 1,
										}))
									);
								},
							})
						}
					/>
				</Space>
			),
		},
	];

	// MODAL
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<>
			<Table columns={columns} dataSource={data} />
			<QuizModal
				quizForm={quizForm}
				visible={modalVisible}
				setVisible={setModalVisible}
			/>
		</>
	);
}
