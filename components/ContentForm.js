import { Card, Form, Input, Select } from "antd";
import { useCallback, useContext } from "react";
import { ContentDataContext } from "./ContentDataContext";

export default function ContentForm({id}) {
	const {Option} = Select;

	const {contentForm, setData, data, postData} = useContext(
		ContentDataContext
	);

	const updateData = (value, id) => {
		// PUT
		let newData = data.map(content => {
			if (content.id === id) {
				content = {...content, ...value};
			}
			return content;
		});
		setData(newData);
	};

	const onSubmit = useCallback(value => {
		id ? updateData(value, id) : postData(value);

		alert("form submitted");
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
					name="title"
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
					name="description"
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
				<Form.Item
					label="Category"
					name="category"
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
				</Form.Item>
				<Form.Item
					label="Video URL"
					name="url"
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
			</Form>
		</Card>
	);
}
