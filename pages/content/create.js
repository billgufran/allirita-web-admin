import Form from 'antd/lib/form/Form';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/AuthContext';
import DetailViewLayout from '../../components/DetailViewLayout';
import api from '../../services/api';

//path: /content/create

export default function Create() {

	const router = useRouter();

	const [contentForm] = Form.useForm();

	const [quizzes, setQuizzes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [contentId, setContentId] = useState("")
	const [imageName, setImageName] = useState("")

	const {user} = useContext(AuthContext);

	// === API Call
	const getSelectedContent = async id_konten => {
		try {
			setIsLoading(true);

			// API: GET edit konten/video
			const res = await api.get(`/konten/${id_konten}`, {
				headers: {Authorization: `Bearer ${user.token}`},
			});
			// set value for content form
			const content = res.data.data.getKonten;

			setImageName(content.image)

			content["kategori"] = content.kategori.map(item => item.nama_kategori);
			content["image"] = null
			contentForm.setFieldsValue(content);

			// console.log("GET CONTENT RESPONSE")
			// console.log(content)

			// set data for quiz table
			setQuizzes(res.data.data.pertanyaan);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	// === Effect
	useEffect(() => {
		setContentId(router.query.id)
	}, [router.pathname, router.query]);

	useEffect(() => {
		if (!!contentId) {
			console.log("getting content")
			getSelectedContent(contentId);
		} else {
			console.log("id is not present")
			contentForm.resetFields();
		}
	}, [contentId]);

	const props = {
		contentId,
		contentForm,
		isLoading,
		imageName,
		quizzes,
	}

	return <DetailViewLayout {...props}/>
}
