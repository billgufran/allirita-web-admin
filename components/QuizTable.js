import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import React, { useContext, useState } from "react";
import { QuizDataContext } from "./QuizDataContext";
import QuizModal from "./QuizModal";

export default function QuizTable() {
	const {quizForm, data, setData} = useContext(QuizDataContext);

	// MODAL
	const [modalVisible, setModalVisible] = useState(false);

	// TABLE
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
					<EditFilled
						onClick={() => {
							quizForm.setFieldsValue(record);
							setModalVisible(true);
						}}
					/>
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

	const footer = () => (
		<Button type="link" onClick={() => setModalVisible(true)}>
			Add Question
		</Button>
	);

	return (
		<>
			<Table columns={columns} dataSource={data} footer={footer} />
			<QuizModal
				quizForm={quizForm}
				visible={modalVisible}
				setVisible={setModalVisible}
			/>
		</>
	);
}
