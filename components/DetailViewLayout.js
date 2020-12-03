import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Carousel } from "antd";
import Form from "antd/lib/form";
import { useContext, useEffect, useRef, useState } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";
import ContentForm from "./ContentForm";
import QuizTable from "./QuizTable";
import Sidebar from "./SidebarLayout";

export default function DetailViewLayout({id_konten}) {
	const carouselRef = useRef();

	const [contentForm] = Form.useForm();

	const [quizzes, setQuizzes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [disableQuiz, setDisableQuiz] = useState(false);

	const [imageName, setImageName] = useState("");

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

			setImageName(content.image);

			content["kategori"] = content.kategori.map(item => item.nama_kategori);
			content["image"] = null;
			contentForm.setFieldsValue(content);

			console.log("GET CONTENT RESPONSE");
			console.log(content);

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

	const cardHeader = (
		<>
			<Button
				type="text"
				icon={<ArrowLeftOutlined />}
				style={{marginRight: 8}}
				onClick={() => carouselRef.current.prev()}
			/>
			Quiz details
		</>
	);

	return (
		<Sidebar select="1">
			<Carousel dots={false} ref={carouselRef}>
				{/* Content Card */}
				<ContentForm
					id_konten={id_konten}
					contentForm={contentForm}
					isLoading={isLoading}
					imageName={imageName}
					setDisableQuiz={setDisableQuiz}
					carouselRef={carouselRef}
				/>

				{/* Quiz Card */}
				<Card title={cardHeader} bordered={false} style={{width: "100%"}}>
					<QuizTable
						quizzes={quizzes}
						isLoading={isLoading}
						getSelectedContent={getSelectedContent}
						id_konten={id_konten}
						carouselRef={carouselRef}
					/>
				</Card>
			</Carousel>
		</Sidebar>
	);
}
