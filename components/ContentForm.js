import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, notification, Select, Skeleton, Switch, Upload } from "antd";
import Link from "next/link";
import { useCallback, useContext, useState } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

const {Option} = Select;

export default function ContentForm({id_konten, contentForm, isLoading}) {

	const [fileList, updateFileList] = useState([]);

	const {user} = useContext(AuthContext)

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


	const updateContent = async (value, id_konten) => {
		try {
			// API: PUT update konten/video
			await api.put(
				`/konten/${id_konten}`,
				value,
				{headers: {Authorization: `Bearer ${user.token}`}}
			)
			successNotifcation(false)
		} catch (error) {
			console.log(error)
		}
	};

	const createContent = async value => {
		try {
			// API: POST create konten/video
			value["image"] = value.image.file.name
			await api.post(
				"/konten",
				value,
				{headers: {Authorization: `Bearer ${user.token}`}}
			)
			successNotifcation(true)
		} catch (error) {
			console.log(error)
		}
		console.log(value)
	}

	const onSubmit = useCallback(value => {
		value["question_is_disabled"] = +value.question_is_disabled
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
		// beforeUpload: file => {
		// 	if (file.type !== 'image/png') {
		// 	message.error(`${file.name} format is not supported`);
		// 	}
		// 	return file.type === 'image/png';
		// },
		onChange: info => {
			console.log(info.fileList);
			// file.status is empty when beforeUpload return false
			// updateFileList(info.fileList.filter(file => !!file.status));
		 },
	}

	return (
		<Card title={title} bordered={false} style={{width: "100%"}}>
			<Skeleton active loading={isLoading}>
				<Form
					wrapperCol={{span: 14}}
					form={contentForm}
					layout="vertical"
					name="content-form"
					onFinish={onSubmit}
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
					{/* <Form.Item
						label="Category"
						name="kategori"
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
							placeholder="Please fill content's category"
						>
							<Option value="action">Action</Option>
							<Option value="chess">Chess</Option>
							<Option value="drama">Drama</Option>
							<Option value="war">War</Option>
						</Select>
					</Form.Item> */}
					<Form.Item
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
					</Form.Item>
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
					>
						<Upload {...uploadProps}>
							<Button icon={<UploadOutlined />}>Click to upload</Button>
						</Upload>
					</Form.Item>
					<Form.Item
						label="Disable quiz"
						name="question_is_disabled"
						valuePropName="checked"
					>
						<Switch/>
					</Form.Item>
				</Form>
			</Skeleton>
		</Card>
	);
}