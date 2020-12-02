import { Button, Card } from "antd";
import Form from "antd/lib/form";
import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";
import ContentForm from "./ContentForm";
import QuizTable from "./QuizTable";
import Sidebar from "./SidebarLayout";

export default function DetailViewLayout({id_konten}) {
	const [contentForm] = Form.useForm();

	const [quizzes, setQuizzes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [disableQuiz, setDisableQuiz] = useState(false);

	const [imageName, setImageName] = useState("")

	const {user} = useContext(AuthContext);

	// === API Call
	const getSelectedContent = async id_konten => {
		try {
			setIsLoading(true);

			// API: GET edit konten/video
			const res = await api.get(`/konten/${id_konten}`, {
				headers: {Authorization: `Bearer ${user.token}`},
			});
			// set value for content form
			const content = res.data.data.getKonten;

			setImageName(content.image)

			content["kategori"] = content.kategori.map(item => item.nama_kategori);
			content["image"] = null
			contentForm.setFieldsValue(content);


			console.log("GET CONTENT RESPONSE")
			console.log(content)

			// set data for quiz table
			const quizData = res.data.data.pertanyaan.map((el, i) => ({
				...el,
				no: i + 1,
			}));
			setQuizzes(quizData);
			setDisableQuiz(content.question_is_disabled);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	// === Effect
	useEffect(() => {
		// id_konten only presents when editing data
		if (id_konten) {
			getSelectedContent(id_konten);
		} else {
			contentForm.resetFields();
		}
	}, []);

	return (
		<Sidebar select="1">
			<Card
				bordered={false}
				style={{width: "100%"}}
				bodyStyle={{
					padding: 0,
					display: "flex",
					flexDirection: "column",
				}}
			>
				<ContentForm
					id_konten={id_konten}
					contentForm={contentForm}
					isLoading={isLoading}
					imageName={imageName}
					setDisableQuiz={setDisableQuiz}
				/>
				{(!!id_konten && !disableQuiz) && (
					<Card
						title="Quiz details"
						bordered={false}
						style={{width: "100%"}}
					>
						<QuizTable
							quizzes={quizzes}
							isLoading={isLoading}
							getSelectedContent={getSelectedContent}
							id_konten={id_konten}
						/>
					</Card>
				)}

				<Button
					onClick={() => contentForm.submit()}
					type="primary"
					style={{alignSelf: "flex-end", margin: 24}}
				>
					Save
				</Button>
			</Card>
		</Sidebar>
	);
}
