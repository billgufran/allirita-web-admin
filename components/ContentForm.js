import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Skeleton, Upload } from "antd";
import Link from "next/link";
import { useCallback, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

const {Option} = Select;

export default function ContentForm({id_konten, contentForm, isLoading}) {

	const {user} = useContext(AuthContext)

	const updateContent = async (value, id_konten) => {
		try {
			// API: PUT update konten/video
			api.put(
				`/konten/${id_konten}`,
				value,
				{headers: {Authorization: `Bearer ${user.token}`}}
			)
		} catch (error) {
			console.log(error)
		}
	};

	const createContent = value => {
		try {
			// API: POST create konten/video
			api.post(
				"/konten",
				value,
				{headers: {Authorization: `Bearer ${user.token}`}}
			)
		} catch (error) {
			console.log("createe")
		}
	}

	const onSubmit = useCallback(value => {
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
						name="thumbnail"
					>
						<Upload name="logo" action="/upload.do" listType="picture">
							<Button icon={<UploadOutlined />}>Click to upload</Button>
						</Upload>
					</Form.Item>
				</Form>
			</Skeleton>
		</Card>
	);
}