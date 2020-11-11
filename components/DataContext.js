import Form from 'antd/lib/form';
import React, { createContext, useState } from "react";

export const DataContext = createContext();

export default function DataProvider({children}) {
   const dataSource = [
		{
			id: "1",
			title: "Game of Thrones",
			description:
				"Daenerys died in the season finale. Many people also died, and dragon. King's Landing is destroyed too.",
			category: ["war", "action"],
			Questions: 15,
			url:""
		},
		{
			id: "2",
			title: "The Queen's Gambit",
			description: "Elizabeth likes to play chess",
			category: ["chess", "drama"],
			Questions: 8,
			url:""
		},
	];

   const [contentForm] = Form.useForm();
	const [data, setData] = useState(dataSource.map((el, index) => ({no: index + 1, ...el})))

	const postData = newData => {
		newData.id = Math.floor(Math.random() * Math.floor(100))
		setData([...data, newData])
		setData(prevState => prevState.map((el, index) => ({no: index + 1, ...el})))
	}

	const value = {
      contentForm,
      data,
		setData,
		postData,
	};

	return (
		<DataContext.Provider value={value}>
			{children}
		</DataContext.Provider>
	);
}