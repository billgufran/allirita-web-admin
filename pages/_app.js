import App from "next/app";
import React from "react";
import DataProvider from "../components/DataContext";
import "../styles/antd.less";

class MyApp extends App {
	render() {
		const {Component, pageProps} = this.props;

		return (
			<DataProvider>
				<Component {...pageProps} />
			</DataProvider>
		);
	}
}

export default MyApp;
