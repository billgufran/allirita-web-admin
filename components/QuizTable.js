import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import Form from "antd/lib/form";
import Link from "next/link";
import { useContext, useState } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";
import QuizModal from "./QuizModal";

export default function QuizTable({quizzes, isLoading, contentId, getSelectedContent}) {

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
			render: (text, record, index) => index + 1,
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
			render: (text) => text.toUpperCase(),
		},
		{
			title: "Action",
			dataIndex: "id_pertanyaan",
			key: "id_pertanyaan",
			align: "center",
			render: (id_pertanyaan, record) => (
					<Space size="middle">
						<Button
							onClick={() => {
								quizForm.setFieldsValue(record);
								setId({id_konten: contentId, id_pertanyaan});
								setModalVisible(true);
							}}
							icon={<EditFilled/>}
						>
							Edit
						</Button>
						<Button
							onClick={() =>
								Modal.confirm({
									title: "Delete question",
									content: "Are you sure?",
									centered: true,
									onOk: () => {
										deleteData(contentId, id_pertanyaan);
									},
								})
							}
							icon={<DeleteFilled/>}
						>
							Delete
						</Button>
					</Space>
				)
		},
	];

	const footer = () => (
		<Button
			type="link"
			onClick={() => {
				quizForm.resetFields();
				setId({id_konten: contentId});
				setModalVisible(true);
			}}>
			Add Question
		</Button>
	);

	return (
		<>
			<QuizModal
				quizForm={quizForm}
				visible={modalVisible}
				setVisible={setModalVisible}
				getSelectedContent={getSelectedContent}
				id={id}
			/>
			<Table
				columns={columns}
				dataSource={quizzes}
				footer={footer}
				loading={isLoading}
			/>
			<Link href="/content/list" >
				<Button style={{alignSelf: "flex-end", margin: 22}}>Save</Button>
			</Link>
		</>
	);
}
