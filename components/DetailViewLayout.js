import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Carousel } from "antd";
import { useRef } from "react";
import ContentForm from "./ContentForm";
import QuizTable from "./QuizTable";
import Sidebar from "./SidebarLayout";

export default function DetailViewLayout({
	contentId,
	contentForm,
	isLoading,
	imageName,
	quizzes,
	getSelectedContent,
}) {
	const carouselRef = useRef();

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
			<Carousel dots={false} ref={carouselRef} style={{width: "70vw", maxWidth: 700}}>
				{/* Content Card */}
				<ContentForm
					contentId={contentId}
					contentForm={contentForm}
					isLoading={isLoading}
					imageName={imageName}
					carouselRef={carouselRef}
				/>

				{/* Quiz Card */}
				<Card
					title={cardHeader}
					bordered={false}
					bodyStyle={{
						padding: 0,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<QuizTable
						quizzes={quizzes}
						isLoading={isLoading}
						contentId={contentId}
						carouselRef={carouselRef}
						getSelectedContent={getSelectedContent}
					/>
				</Card>
			</Carousel>
		</Sidebar>
	);
}
