import { Button, Card } from 'antd';
import { useRouter } from "next/router";
import { useContext } from "react";
import ContentForm from '../../../components/ContentForm';
import { DataContext } from '../../../components/DataContext';
import QuizTables from '../../../components/QuizTables';
import Sidebar from "../../../components/SidebarLayout";

//path: /content/edit/[id]

export default function Edit() {
	//get the data id from query
	const router = useRouter();
	const { id } = router.query;

	const { contentForm } = useContext(DataContext)


	return (
		<>
			<Sidebar>
				<Card bordered={ false } style={ { width: "100%" } } bodyStyle={ { padding: 0 } }>
					<ContentForm id={ id } />
					<Card title="Quiz details" bordered={ false } style={ { width: "100%" } }>
						<QuizTables />
						<Button style={{textAlign: "right"}} onClick={ () => contentForm.submit() }>Save</Button>
					</Card>
				</Card>
			</Sidebar>
		</>
	);
}