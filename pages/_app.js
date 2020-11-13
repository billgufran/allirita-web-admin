import App from "next/app";
import Head from "next/head";
import React from "react";
import ContentProvider from "../components/ContentDataContext";
import QuizProvider from "../components/QuizDataContext";
import "../styles/antd.less";

class MyApp extends App {
	render() {
		const {Component, pageProps} = this.props;

		return (
			<ContentProvider>
				<QuizProvider>
					<Head>
						<title>Allirita Admin</title>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<Component {...pageProps} />
				</QuizProvider>
			</ContentProvider>
		);
	}
}

export default MyApp;
