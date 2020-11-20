import { Button, Card, Switch } from "antd";
import { useContext, useEffect, useState } from "react";
import { ContentDataContext } from "../../components/ContentDataContext";
import ContentForm from "../../components/ContentForm";
import { QuizDataContext } from "../../components/QuizDataContext";
import QuizTable from "../../components/QuizTable";
import Sidebar from "../../components/SidebarLayout";

//path: /content/create

export default function Edit() {
	const {contentForm} = useContext(ContentDataContext);
	const {quizForm, setData} = useContext(QuizDataContext);

	useEffect(() => {
		contentForm.resetFields();
		quizForm.resetFields();
		setData([]);
	}, []);

	const [hasQuiz, setHasQuiz] = useState(true);

	const toggleQuiz = () => {
		setHasQuiz(prevState => !prevState);
		console.log(hasQuiz);
	};

	return (
		<>
			<Sidebar>
				<Card
					bordered={false}
					style={{width: "100%"}}
					bodyStyle={{padding: 0}}
				>
					<ContentForm />
					<Card
						title="Quiz details"
						bordered={false}
						style={{width: "100%"}}
						extra={<Switch defaultChecked onChange={toggleQuiz} />}
					>
						{hasQuiz && <QuizTable />}
						<Button
							onClick={() => contentForm.submit()}
							type="primary"
							style={{alignSelf: "flex-end", marginTop: 20}}
						>
							Save
						</Button>
					</Card>
				</Card>
			</Sidebar>
		</>
	);
}
