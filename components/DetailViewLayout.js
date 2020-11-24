import { Button, Card, Switch } from 'antd';
import Form from 'antd/lib/form';
import { useEffect, useState } from "react";
import api from '../services/api';
import ContentForm from './ContentForm';
import QuizTable from './QuizTable';
import Sidebar from "./SidebarLayout";

export default function DetailViewLayout({id_konten, isCreate}) {

   // form instance
   const [contentForm] = Form.useForm()

   const [hasQuiz, setHasQuiz] = useState(true)
	const [quizzes, setQuizzes ] = useState([])


   const toggleQuiz = () => {
		setHasQuiz(prevState => !prevState);
   };

   const getSelectedContent = async (id_konten) => {
		try {
			// API: GET edit konten/video
			const res = await api.get(`/konten/${id_konten}/edit`)
			contentForm.setFieldsValue(res.data.data.getKonten)
			setQuizzes(res.data.data.pertanyaan)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
      if (isCreate) {
         contentForm.resetFields()
      } else {
         getSelectedContent(id_konten)
      }
	}, [])

	return (
		<>
			<Sidebar>
				<Card bordered={false} style={{ width: "100%" }} bodyStyle={{ padding: 0 }}>
					<ContentForm id_konten={id_konten} contentForm={contentForm} />
					<Card
						title="Quiz details"
						bordered={ false }
						style={{ width: "100%" }}
						bodyStyle={{display: "flex", flexDirection: "column"}}
						extra={<Switch defaultChecked onChange={toggleQuiz}/>}
					>
                  {hasQuiz && <QuizTable quizzes={quizzes} /> }
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