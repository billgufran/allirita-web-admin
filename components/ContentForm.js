import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import {
	Button,
	Card,
	Form,
	Input,
	message, notification,
	Select,
	Skeleton,
	Switch,
	Upload
} from "antd";
import Modal from "antd/lib/modal/Modal";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

const {Option} = Select;

const imageBaseUrl = "https://allirita-api.upanastudio.com/storage";

export default function ContentForm({
	contentId,
	contentForm,
	isLoading,
	imageName,
	carouselRef,
}) {
	const [categories, setCategories] = useState([]);
	const [fileList, setFileList] = useState([]);
	const [formLoading, setFormLoading] = useState(false);

	// Thumbnail is not required on content update
	const [thumbnailRequired, setThumbnailRequired] = useState(true);

	// Image preview modal states
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");

	const {user} = useContext(AuthContext);
	const router = useRouter();

	function getBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	}

	// === Notifcation instance
	const successNotifcation = isCreating => {
		notification["success"]({
			message: "Success",
			description: `Content is successfully ${
				isCreating ? "created" : "updated"
			}`,
		});
	};

	const failedNotification = () => {
		notification["error"]({
			message: "Failed",
		});
	};

	// === API Call
	const createContent = async value => {
		setFormLoading(true);
		try {
			// API: POST create konten/video
			const res = await api.post("/konten", value, {
				headers: {Authorization: `Bearer ${user.token}`},
			});
			const id_konten = res.data.data.konten.id_konten;
			const path = {
				pathname: '/content/create',
				query: { id: id_konten },
			 }

			successNotifcation(true);

			// console.log("Created ✅. POST RESULT");
			// console.log(res);

			if (!value.question_is_disabled) {// question_is_disabled = 0 (the question is enabled)
				router.push(path, path, { shallow: true })
				carouselRef.current.next();
			} else {
				router.push("/content/list");
			}
		} catch (error) {
			console.log(error);
			failedNotification();
		} finally {
			setFormLoading(false);
		}
	};

	const updateContent = async (value, id_konten) => {
		setFormLoading(true);
		try {
			// API: PUT update konten/video
			const res = await api.put(`/konten/${id_konten}`, value, {
				headers: {Authorization: `Bearer ${user.token}`},
			});

			successNotifcation(false);

			// console.log("Updated 🔃. PUT RESULT");
			// console.log(res);

			if (!value.question_is_disabled) {// question_is_disabled = 0 (the question is enabled)
				carouselRef.current.next();
			} else {
				router.push("/content/list");
			}
		} catch (error) {
			console.log(error);
			failedNotification();
		} finally {
			setFormLoading(false);
		}
	};

	const getCategory = async () => {
		try {
			const res = await api.get("/kategori", {
				headers: {Authorization: `Bearer ${user.token}`},
			});
			setCategories(res.data.data.getKategori);
		} catch (error) {
			console.log(error);
		}
	};

	// === Effect
	useEffect(() => {
		getCategory();
	}, []);

	useEffect(() => {
		if (!!imageName) {
			setFileList([
				{
					uid: "-1",
					name: imageName,
					status: "done",
					url: `${imageBaseUrl}/${imageName}`,
					thumbUrl: `${imageBaseUrl}/${imageName}`,
				},
			]);
			setThumbnailRequired(false);
		}
	}, [imageName]);

	// === Form submit handler
	const onSubmit = async value => {
		value["question_is_disabled"] = +value.question_is_disabled;

		if (value.image) {
			const imageBase64 = await getBase64(value.image.file.originFileObj);
			value["image"] = imageBase64.substring(
				imageBase64.indexOf(",", imageBase64.indexOf(";base64")) + 1
			);
		}

		// console.log("SUBMITTED VALUE");
		// console.log(value);

		// console.log(`is edit? ${!!contentId}`)

		!!contentId ? updateContent(value, contentId) : createContent(value);
	}

	// === Form rules and validation
	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	const stringRules = {
		required: true,
		type: "string",
		whitespace: true,
		max: 255,
	};

	const defaultValidateMessages = {
		default: "Validation error on field ${label}",
		required: "${label} is required",
		whitespace: "${label} cannot be empty",
		string: {
			len: "${label} must be exactly ${len} characters",
			min: "${label} must be at least ${min} characters",
			max: "${label} cannot be longer than ${max} characters",
			range: "${label} must be between ${min} and ${max} characters",
		},
	};

	// === Upload button
	const uploadProps = {
		fileList,
		name: "thumbnail",
		listType: "picture-card",
		accept: ".jpeg,.jpg,.png,.gif,.svg,",
		beforeUpload: file => {
			const isFormatCorrect =
				file.type === "image/jpeg" ||
				file.type === "image/jpg" ||
				file.type === "image/png" ||
				file.type === "image/gif" ||
				file.type === "image/svg";
			// file size less than 1 MB
			const isLt1M = file.size / 1024 / 1024 < 1
			if (!isFormatCorrect) {
				message.error(`${file.name} format is not supported`, 7);
			}
			if (!isLt1M) {
				message.error(`Image size must be smaller than 1MB`, 7)
			}
			return isFormatCorrect && isLt1M;
		},
		onChange: info => {
			// console.log("UPLOAD INFO");
			// console.log(info);

			setFileList(info.fileList.filter(file => !!file.status))

			if (info.file.status === "uploading") {
				setFormLoading(true);
				return;
			}

			if (info.file.status === "error") {
				setFormLoading(false);
				setFileList([
					{
						...info.file,
						percent: 100,
						status: "done",
					},
				]);
				return;
			}

			if (info.file.status === "done") {
				setFormLoading(false);
			}
		},
		onPreview: async file => {
			if (!file.url && !file.preview) {
				file.preview = await getBase64(file.originFileObj);
			}

			setPreviewImage(file.url || file.preview);
			setPreviewVisible(true);
			setPreviewTitle(
				file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
			);
		},
	};

	const uploadButton = (
		<div>
			<UploadOutlined />
			<div style={{marginTop: 8}}>Upload</div>
		</div>
	);

	const cardHeader = (
		<>
			<Link href="/content/list">
				<ArrowLeftOutlined style={{marginRight: 8}} />
			</Link>
			Content list
		</>
	);

	return (
		<>
			<Modal
				visible={previewVisible}
				title={previewTitle}
				footer={null}
				onCancel={() => setPreviewVisible(false)}
			>
				<img alt="thumbnail" style={{width: "100%"}} src={previewImage} />
			</Modal>
			<Card title={cardHeader} bordered={false} >
				<Skeleton active loading={isLoading}>
					<Form
						wrapperCol={{span: 14}}
						form={contentForm}
						layout="vertical"
						name="content-form"
						onFinish={onSubmit}
						onFinishFailed={onFinishFailed}
						validateMessages={defaultValidateMessages}
					>
						<Form.Item
							label="Title"
							name="judul"
							rules={[
								{
									...stringRules,
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
								},
							]}
						>
							<Input.TextArea
								autoSize={{minRows: 3, maxRows: 6}}
								showCount
								maxLength={255}
							/>
						</Form.Item>
						<Form.Item
							label="Category"
							name="kategori"
							rules={[
								{
									required: true,
									type: "array",
								},
							]}
						>
							<Select mode="multiple">
								{categories.map(category => (
									<Option value={category.nama_kategori}>
										{category.nama_kategori}
									</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							label="Video YouTube ID"
							name="video"
							rules={[
								{
									...stringRules,
								},
							]}
							extra={
								<p>
									Example: https://www.youtube.com/watch?v=
									<b>Ok5v511qbko</b>. The bold text is the ID
								</p>
							}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Upload thumbnail"
							name="image"
							rules={[
								{
									required: thumbnailRequired,
									message:
										"Please provide a thumbnail for the content",
								},
							]}
						>
							<Upload {...uploadProps}>
								{fileList.length >= 1 ? null : uploadButton}
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
						<Form.Item shouldUpdate={true}>
							{() => (
								<Button
									type="primary"
									htmlType="submit"
									loading={formLoading}
									disabled={
										contentForm
											.getFieldsError()
											.filter(({errors}) => errors.length).length
									}
								>
									Save
								</Button>
							)}
						</Form.Item>
					</Form>
				</Skeleton>
			</Card>
		</>
	);
}
