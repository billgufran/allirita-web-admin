import Form from 'antd/lib/form';
import React, { createContext, useState } from "react";

export const QuizDataContext = createContext();

export default function QuizProvider({children}) {
   const [quizForm] = Form.useForm();

	// TABLE
	const dataSource = [
		{
			id: "1",
			question: "How many people have died throughout the show?",
			firstOp: "one",
			secondOp: "two",
			thirdOp: "three",
			fourthOp: "four",
			correctAns: 3,
		},
		{
			id: "2",
			question: "Really",
			firstOp: "Yes",
			secondOp: "Perhaps",
			thirdOp: "No",
			fourthOp: "Maybe",
			correctAns: 1,
		},
	];

	const [data, setData] = useState(
		dataSource.map((el, index) => ({no: index + 1, ...el}))
   );

   // GET QUIZ
   const getData = () => setData(dataSource.map((el, index) => ({no: index + 1, ...el})))

   // POST QUIZ
	const postData = newData => {
		newData.id = Math.floor(Math.random() * Math.floor(100))
		setData([...data, newData])
		setData(prevState => prevState.map((el, index) => ({no: index + 1, ...el})))
	}

	const value = {
      quizForm,
      data,
		setData,
		postData,
	};

	return (
		<QuizDataContext.Provider value={value}>
			{children}
		</QuizDataContext.Provider>
	);
}