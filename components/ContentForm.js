import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import {
	Card,
	Form,
	Input,
	notification,
	Select,
	Skeleton,
	Switch,
	Upload
} from "antd";
import Modal from "antd/lib/modal/Modal";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

const {Option} = Select;

const imageBaseUrl = "https://allirita-api.upanastudio.com/storage";

export default function ContentForm({
	id_konten,
	contentForm,
	isLoading,
	imageName,
	setDisableQuiz,
}) {
	const [categories, setCategories] = useState([]);
	const [fileList, setFileList] = useState([]);

	const [thumbnailRequired, setThumbnailRequired] = useState(true)

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
	const updateContent = async (value, id_konten) => {
		try {
			// API: PUT update konten/video
			const res = await api.put(`/konten/${id_konten}`, value, {
				headers: {Authorization: `Bearer ${user.token}`},
			});
			successNotifcation(false);

			console.log("PUT RESULT");
			console.log(res);

			router.push("/content/list");
		} catch (error) {
			console.log(error);
			failedNotification();
		}
	};

	const createContent = async value => {
		try {
			// API: POST create konten/video
			const res = await api.post("/konten", value, {
				headers: {Authorization: `Bearer ${user.token}`},
			});
			successNotifcation(true);

			console.log("POST RESULT");
			console.log(res);

			const id_konten = res.data.data.konten.id_konten;
			router.push(`/content/edit/${id_konten}`);
		} catch (error) {
			console.log(error);
			failedNotification();
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
			setThumbnailRequired(false)
		}
	}, [imageName]);

	// === Form submit handler
	const onSubmit = useCallback(async value => {

		value["question_is_disabled"] = +value.question_is_disabled;

		if(value.image) {
			const imageBase64 = await getBase64(value.image.file.originFileObj);
			value["image"] = imageBase64.substring(
				imageBase64.indexOf(",", imageBase64.indexOf(";base64")) + 1
			);
		}

		console.log("SUBMITTED VALUE");
		console.log(value);

		id_konten ? updateContent(value, id_konten) : createContent(value);
	}, []);

	const title = (
		<>
			<Link href="/content/list">
				<ArrowLeftOutlined style={{marginRight: 8}} />
			</Link>
			Content details
		</>
	);

	// === Switch change event handler
	const onSwitchChange = val => {
		setDisableQuiz(val);
	}

	// === Form rules
	const stringRules = {
		required: true,
		type: "string",
		whitespace: true,
		max: 255,
	};

	const defaultValidateMessages = {
		default: "Validation error on field ${label}",
		required: "${label} is required",
		enum: "${label} must be one of [${enum}]",
		whitespace: "${label} cannot be empty",
		date: {
		  format: "${label} is invalid for format date",
		  parse: "${label} could not be parsed as date",
		  invalid: "${label} is invalid date",
		},
		string: {
		  len: "${label} must be exactly ${len} characters",
		  min: "${label} must be at least ${min} characters",
		  max: "${label} cannot be longer than ${max} characters",
		  range: "${label} must be between ${min} and ${max} characters",
		},
		number: {
		  len: "${label} must equal ${len}",
		  min: "${label} cannot be less than ${min}",
		  max: "${label} cannot be greater than ${max}",
		  range: "${label} must be between ${min} and ${max}",
		},
		array: {
		  len: "${label} must be exactly ${len} in length",
		  min: "${label} cannot be less than ${min} in length",
		  max: "${label} cannot be greater than ${max} in length",
		  range: "${label} must be between ${min} and ${max} in length",
		},
		pattern: {
		  mismatch: "${label} does not match pattern ${pattern}",
		},
	}

	// === Upload button
	const uploadProps = {
		fileList,
		name: "thumbnail",
		listType: "picture-card",
		accept: ".jpeg,.jpg,.png,.gif,.svg,",
		onChange: info => {
			console.log("UPLOAD INFO");
			console.log(info);
			setFileList(info.fileList);

			if (info.file.status === "error") {
				setFileList([
					{
						...info.file,
						percent: 100,
						status: "done",
					},
				]);
			}
		},
		beforeUpload: file => {
			const isFormatCorrect =
				file.type === "image/jpeg" ||
				file.type === "image/jpg" ||
				file.type === "image/png" ||
				file.type === "image/gif" ||
				file.type === "image/svg";
			if (!isFormatCorrect) {
				message.error(`${file.name} format is not supported`);
			}
			return isFormatCorrect;
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
			<Card title={title} bordered={false} style={{width: "100%"}}>
				<Skeleton active loading={isLoading}>
					<Form
						wrapperCol={{span: 14}}
						form={contentForm}
						layout="vertical"
						name="content-form"
						onFinish={onSubmit}
						validateMessages={defaultValidateMessages}
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
									// message: "Please fill content's description",
								},
							]}
						>
							<Input.TextArea />
						</Form.Item>
						<Form.Item
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
							<Switch onChange={onSwitchChange} />
						</Form.Item>
					</Form>
				</Skeleton>
			</Card>
		</>
	);
}
