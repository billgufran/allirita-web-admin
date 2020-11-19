import { Button, Card } from 'antd';
import { useContext, useEffect } from "react";
import { ContentDataContext } from '../../components/ContentDataContext';
import ContentForm from '../../components/ContentForm';
import { QuizDataContext } from '../../components/QuizDataContext';
import QuizTable from '../../components/QuizTable';
import Sidebar from "../../components/SidebarLayout";

//path: /content/create

export default function Edit() {

	const { contentForm } = useContext(ContentDataContext)
	const { quizForm, setData } = useContext(QuizDataContext)

	useEffect(() => {
		contentForm.resetFields()
		quizForm.resetFields()
		setData([])
	}, [])

	return (
		<>
			<Sidebar>
				<Card bordered={ false } style={ { width: "100%" } } bodyStyle={ { padding: 0 } }>
					<ContentForm />
					<Card title="Quiz details" bordered={ false } style={{width: "100%"}}>
						<QuizTable />
						<Button
							onClick={ () => contentForm.submit()}
							type="primary"
							style={{alignSelf: "flex-end", marginTop: 20}}
							extra={<Switch defaultChecked/>}
						>
							Save
						</Button>
					</Card>
				</Card>
			</Sidebar>
		</>
	);
}