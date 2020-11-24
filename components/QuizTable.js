import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import Form from 'antd/lib/form';
import { useState } from "react";
import QuizModal from "./QuizModal";

export default function QuizTable({quizzes}) {

	// MODAL
	const [modalVisible, setModalVisible] = useState(false);
	const [quizForm] = Form.useForm()
	const [id, setId] = useState({})

	// TABLE
	const columns = [
		{
			title: "No",
			dataIndex: "no",
			key: "no",
		},
		{
			title: "Question",
			dataIndex: "pertanyaan",
			key: "pertanyaan",
		},
		{
			title: "Answer",
			dataIndex: "jawaban_benar",
			key: "jawaban_benar",
		},
		{
			title: "Action",
			dataIndex: "id_pertanyaan",
			key: "id_pertanyaan",
			render: (text, record) => (
				//text refer to data id
				<Space size="middle">
					<EditFilled
						onClick={() => {
							quizForm.setFieldsValue(record);
							setModalVisible(true);
							setId({
								id_konten: record.id_konten,
								id_pertanyaan: record.id_pertanyaan
							})
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
									deleteData()
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
			<Table columns={columns} dataSource={quizzes} footer={footer} />
			<QuizModal
				quizForm={quizForm}
				visible={modalVisible}
				setVisible={setModalVisible}
				id={id}
			/>
		</>
	);
}
