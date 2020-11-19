import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

//path: /

export default function Home() {
	const router = useRouter()

	useEffect(() => {

		//logged in? router.push("/content/list") : router.push("/login")
		router.push("/login")
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
