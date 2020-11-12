import { Button, Card } from 'antd';
import { useContext } from "react";
import ContentForm from '../../components/ContentForm';
import { DataContext } from '../../components/DataContext';
import QuizTable from '../../components/QuizTable';
import Sidebar from "../../components/SidebarLayout";

//path: /content/create

export default function Edit() {

	const { contentForm } = useContext(DataContext)

	return (
		<>
			<Sidebar>
				<Card bordered={ false } style={ { width: "100%" } } bodyStyle={ { padding: 0 } }>
					<ContentForm />
					<Card title="Quiz details" bordered={ false } style={ { width: "100%" } }>
						<QuizTable />
						<Button style={{textAlign: "right"}} onClick={ () => contentForm.submit() }>Save</Button>
					</Card>
				</Card>
			</Sidebar>
		</>
	);
}