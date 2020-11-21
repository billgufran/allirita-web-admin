import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Upload } from "antd";
import { useCallback } from "react";
import api from "../services/api";

const {Option} = Select;

export default function ContentForm({id_konten, contentForm}) {

	const updateContent = async (val, id) => {
		// PUT
		try {
			api.put(`/konten/${id}`,val)
		} catch (error) {
			console.log(error)
		}
	};

	const createContent = value => {
		// POST
		try {
			api.post("/konten",val)
		} catch (error) {
			console.log(error)
		}
	}

	const onSubmit = useCallback(value => {
		id_konten ? updateContent(value, id_konten) : createContent(value);
	}, []);

	return (
		<Card title="Content details" bordered={false} style={{width: "100%"}}>
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
							required: true,
							message: "Please fill content's title",
							type: "string",
							whitespace: true,
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
							required: true,
							message: "Please fill content's description",
							type: "string",
							whitespace: true,
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
							required: true,
							message: "Please fill content's URL",
							type: "string",
							whitespace: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Upload thumbnail"
					name="thumbnail"
				>
					<Upload name="logo" action="/upload.do" listType="picture">
						<Button icon={<UploadOutlined />}>Click to upload</Button>
					</Upload>
				</Form.Item>
			</Form>
		</Card>
	);
}