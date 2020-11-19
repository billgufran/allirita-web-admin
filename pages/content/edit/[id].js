import { Button, Card, Switch } from 'antd';
import { useRouter } from "next/router";
import { useContext } from "react";
import { ContentDataContext } from '../../../components/ContentDataContext';
import ContentForm from '../../../components/ContentForm';
import QuizTable from '../../../components/QuizTable';
import Sidebar from "../../../components/SidebarLayout";

//path: /content/edit/[id]

export default function Edit() {
	//get the data id from query
	const router = useRouter();
	const { id } = router.query;

	const { contentForm } = useContext(ContentDataContext)


	return (
		<>
			<Sidebar>
				<Card bordered={ false } style={ { width: "100%" } } bodyStyle={ { padding: 0 } }>
					<ContentForm id={ id } />
					<Card
						title="Quiz details"
						bordered={ false }
						style={{ width: "100%" }}
						bodyStyle={{display: "flex", flexDirection: "column"}}
						extra={<Switch defaultChecked/>}
					>
						<QuizTable />
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