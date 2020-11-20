import App from "next/app";
import Head from "next/head";
import React from "react";
import AuthProvider from "../components/AuthContext";
import ContentProvider from "../components/ContentDataContext";
import QuizProvider from "../components/QuizDataContext";
import "../styles/antd.less";

class MyApp extends App {
	render() {
		const {Component, pageProps} = this.props;

		return (
			<AuthProvider>
				<ContentProvider>
					<QuizProvider>
						<Head>
							<title>Allirita Admin</title>
							<link rel="icon" href="/favicon.ico" />
						</Head>
						<Component {...pageProps} />
					</QuizProvider>
				</ContentProvider>
			</AuthProvider>
		);
	}
}

export default MyApp;
