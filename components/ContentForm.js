import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, notification, Select, Skeleton, Switch, Upload } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

const {Option} = Select;

export default function ContentForm({id_konten, contentForm, isLoading, defaultCategories}) {

	// const [fileList, updateFileList] = useState([]);
	const [categories, setCategories] = useState([])
	const [pip, setPip] = useState(defaultCategories)

	const {user} = useContext(AuthContext)
	const router = useRouter();

	// console.log(`Content form default categories is ${defaultCategories}`)
	console.log(defaultCategories)

	// === Notifcation instance
	const successNotifcation = isCreating => {
		notification["success"]({
			message: 'Success',
			description:
			  `Content is successfully ${isCreating ? "created" : "updated"}`,
		 });
	}

	const failedNotification = () => {
		notification["error"]({
			message: 'Failed',
		})
	}

	// === API Call
	const updateContent = async (value, id_konten) => {
		try {
			// API: PUT update konten/video
			const res = await api.put(
				`/konten/${id_konten}`,
				value,
				{headers: {Authorization: `Bearer ${user.token}`}}
			)
			successNotifcation(false)
			router.push("/content/list")
			console.log(res)
		} catch (error) {
			console.log(error)
			failedNotification()
		}
	};

	const createContent = async value => {
		try {
			// API: POST create konten/video
			value["image"] = value.image.fileList[0].thumbUrl
			const res = await api.post(
				"/konten",
				value,
				{headers: {Authorization: `Bearer ${user.token}`}}
			)
			successNotifcation(true)
			console.log(res)
			// const id_konten = res.data.data.konten.id_konten;
			// router.push(`/content/edit/${id_konten}`)

		} catch (error) {
			console.log(error)
			failedNotification()
		}
		// console.log(value)
	}

	const getCategory = async () => {
		try {
			const res = await api.get(
				"/kategori",
				{headers: {Authorization: `Bearer ${user.token}`}}
			)
			setCategories(res.data.data.getKategori)
		} catch (error) {
			console.log(error)
		}
	}

	// === Effect

	useEffect(() => {
		getCategory()
	},[])


	// === Form submit handler
	const onSubmit = useCallback(value => {
		value["question_is_disabled"] = +value.question_is_disabled
		console.log(value)
		id_konten ? updateContent(value, id_konten) : createContent(value);
	}, []);

	const title = (
		<>
			<Link href="/content/list">
				<ArrowLeftOutlined style={{marginRight: 8}}/>
			</Link>
			Content details
		</>
	)

	// Form rules
	const stringRules = {
		required: true,
		type: "string",
		whitespace: true,
		max: 255,
	}

	const uploadProps = {
		// fileList,
		name: "logo",
		listType: "picture",
		accept: ".jpeg,.jpg,.png,.gif,.svg,",
		onChange: info => {
			console.log(info)
		}
		// beforeUpload: file => {
		// 	const isFormatCorrect = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/svg';
		// 	if (!isFormatCorrect) {
		// 	message.error(`${file.name} format is not supported`);
		// 	}
		// 	return isFormatCorrect;
		// },
		// onChange: info => {
		// 	console.log(info.fileList);
		// 	// file.status is empty when beforeUpload return false
		// 	updateFileList(info.fileList.filter(file => !!file.status));
		// 	updateFileList(prevState => [prevState[prevState.length - 1]])
		// 	console.log(fileList)
		//  },
	}

	let val = defaultCategories ?? [1]



	return (
		<Card title={title} bordered={false} style={{width: "100%"}}>
			<h1>{defaultCategories}</h1>
			<Skeleton active loading={isLoading}>
				<Form
					wrapperCol={{span: 14}}
					form={contentForm}
					layout="vertical"
					name="content-form"
					onFinish={onSubmit}
					// initialValues={{"kategori.id_kategori": val }}
					// {...apex}
				>
					<Form.Item
						label="Title"
						name="judul"
						rules={[
							{
								...stringRules,
								message: "Please fill content's title",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Description"
						name="deskripsi"
						rules={[
							{
								...stringRules,
								message: "Please fill content's description",
							},
						]}
					>
						<Input.TextArea />
					</Form.Item>
					<Form.Item
						label="Category"
						name="kategori.id_kategori"
						// initialValue={val}
						rules={[
							{
								required: true,
								message: "Please fill content's category",
								type: "array",
							},
						]}
					>
						<Select
							mode="multiple"
						>
							{
								categories.map(category => (
									<Option value={category.id_kategori}>{category.nama_kategori}</Option>
								))
							}
						</Select>
					</Form.Item>
					{/* <Form.Item
						label="Category"
						name="kategori"
						rules={[
							{
								required: true,
								message: "Please fill content's category",
								type: "string",
							},
						]}
					>
						<Input />
					</Form.Item> */}
					<Form.Item
						label="Video URL"
						name="video"
						rules={[
							{
								...stringRules,
								message: "Please fill content's URL",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Upload thumbnail"
						name="image"
						rules={[
							{
								required: true,
								message: "Please provide a thumbnail for the content",
							},
						]}
					>
						<Upload {...uploadProps}>
							<Button icon={<UploadOutlined />}>Click to upload</Button>
						</Upload>
					</Form.Item>
					<Form.Item
						label="Disable quiz"
						name="question_is_disabled"
						valuePropName="checked"
						initialValue={0}
					>
						<Switch />
					</Form.Item>
				</Form>
			</Skeleton>
		</Card>
	);
}