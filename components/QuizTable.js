import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import Form from "antd/lib/form";
import { useContext, useState } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";
import QuizModal from "./QuizModal";

export default function QuizTable({quizzes, isLoading, id_konten, getSelectedContent}) {

	// MODAL
	const [modalVisible, setModalVisible] = useState(false);
	const [quizForm] = Form.useForm();
	const [id, setId] = useState({});

	const {user} = useContext(AuthContext)

	const deleteData = async (id_konten, id_pertanyaan) => {
		try {
			// API: delete konten/video
			await api.delete(
				`konten/${id_konten}/pertanyaan/${id_pertanyaan}`,
				{headers: {Authorization: `Bearer ${user.token}`}}
			)
			getSelectedContent(id_konten)
		} catch (error) {
			console.log(error)
		}
	}

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
			render: (id_pertanyaan, record) => (
					<Space size="middle">
						<EditFilled
							onClick={() => {
								quizForm.setFieldsValue(record);
								setId({id_konten, id_pertanyaan});
								setModalVisible(true);
							}}
						/>
						<DeleteFilled
							onClick={() =>
								Modal.confirm({
									title: "Delete question",
									content: "Are you sure?",
									centered: true,
									onOk: () => {
										deleteData(id_konten, id_pertanyaan);
									},
								})
							}
						/>
					</Space>
				)
		},
	];

	const footer = () => (
		<Button
			type="link"
			onClick={() => {
				quizForm.resetFields();
				setId({id_konten});
				setModalVisible(true);
			}}>
			Add Question
		</Button>
	);

	return (
		<>
			<Table
				columns={columns}
				dataSource={quizzes}
				footer={footer}
				loading={isLoading}
			/>
			<QuizModal
				quizForm={quizForm}
				visible={modalVisible}
				setVisible={setModalVisible}
				getSelectedContent={getSelectedContent}
				id={id}
			/>
		</>
	);
}
