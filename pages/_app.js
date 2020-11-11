import App from "next/app";
import React from "react";
import "../styles/antd.less";


class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default MyApp;