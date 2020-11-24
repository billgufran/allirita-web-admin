import { Button, Card, Switch } from 'antd';
import Form from 'antd/lib/form';
import { useContext, useEffect, useState } from "react";
import api from '../services/api';
import { AuthContext } from './AuthContext';
import ContentForm from './ContentForm';
import QuizTable from './QuizTable';
import Sidebar from "./SidebarLayout";

export default function DetailViewLayout({id_konten}) {

   const [contentForm] = Form.useForm()

   const [hasQuiz, setHasQuiz] = useState(true)
	const [quizzes, setQuizzes ] = useState([])
	const [isLoading, setIsLoading] = useState(true);

	const {user} = useContext(AuthContext)

   const getSelectedContent = async (id_konten) => {
		try {
			setIsLoading(true);

			// API: GET edit konten/video
			const res = await api.get(
				`/konten/${id_konten}`,
				{headers: {Authorization: `Bearer ${user.token}`}}
			)
			// set value for content form
			contentForm.setFieldsValue(res.data.data.getKonten)

			// set data for quiz table
			const quizData = res.data.data.pertanyaan.map((el, i) => ({...el, no: i + 1}))
			setQuizzes(quizData)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		// id_konten only presents when editing data
      if (id_konten) {
			getSelectedContent(id_konten)
      } else {
         contentForm.resetFields()
      }
	}, [])

	const toggleQuiz = () => {
		setHasQuiz(prevState => !prevState);
   };

	return (
		<>
			<Sidebar>
				<Card bordered={false} style={{ width: "100%" }} bodyStyle={{ padding: 0 }}>
					<ContentForm id_konten={id_konten} contentForm={contentForm} isLoading={isLoading} />
					<Card
						title="Quiz details"
						bordered={ false }
						style={{ width: "100%" }}
						bodyStyle={{display: "flex", flexDirection: "column"}}
						extra={<Switch defaultChecked onChange={toggleQuiz}/>}
					>
                  {hasQuiz &&
							<QuizTable
								quizzes={quizzes}
								isLoading={isLoading}
								getSelectedContent={getSelectedContent}
								id_konten={id_konten}
							/>
						}
						<Button
							onClick={ () => contentForm.submit()}
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