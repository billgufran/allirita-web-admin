import { Card } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/AuthContext";
import Sidebar from "../../components/SidebarLayout";
import UserTable from "../../components/UserTable";
import api from "../../services/api";

//path: /users/list

export default function UsersList() {
	const [users, setUsers] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const {user} = useContext(AuthContext);

	const getUsers = async () => {
		try {
			setIsLoading(true);

			// API: GET get user
			const res = await api.get("/akun/semua/index", {
				headers: {Authorization: `Bearer ${user.token}`},
			});
			setUsers(res.data.data.getUser);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<Sidebar select="2">
			<Card
				title="User list"
				style={{maxWidth: "70vw"}}>
			<UserTable users={users} isLoading={isLoading} />
			</Card>
		</Sidebar>
	);
}
