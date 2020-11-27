import Head from "next/head";
import { useRouter } from 'next/router';
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import styles from "../styles/Home.module.css";

//path: /

export default function Home() {
	const router = useRouter()

	const {user} = useContext(AuthContext)

	useEffect(() => {
		user ? router.push("/content/list") : router.push("/login")
	}, [])

	return (
		<div className={styles.container}>
			<Head>
				<title>Allirita Admin</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
		</div>
	);
}
