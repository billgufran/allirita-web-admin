import App from "next/app";
import Head from "next/head";
import React from "react";
import AuthProvider from "../components/AuthContext";
import "../styles/antd.less";


class MyApp extends App {
	render() {
		const {Component, pageProps} = this.props;

		return (
			<AuthProvider>
				<Head>
					<title>Allirita Admin</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Component {...pageProps} />
			</AuthProvider>
		);
	}
}

export default MyApp;
