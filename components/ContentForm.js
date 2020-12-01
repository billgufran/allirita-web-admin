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

export default function ContentForm({id_konten, contentForm, isLoading}) {
	const [categories, setCategories] = useState([]);
	const [fileList, setFileList] = useState([]);

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

	// === Form submit handler
	const onSubmit = useCallback(async value => {

		const imageBase64 = await getBase64(value.image.file.originFileObj);

		value["question_is_disabled"] = +value.question_is_disabled;
		value["image"] = imageBase64.substring(
			imageBase64.indexOf(",", imageBase64.indexOf(";base64")) + 1
		);

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

	// === Form rules
	const stringRules = {
		required: true,
		type: "string",
		whitespace: true,
		max: 255,
	};

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

			if(info.file.status === "error") {
				setFileList([{
					...info.file,
					percent : 100,
					status  : "done",
			  }]);
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
					</Form>
				</Skeleton>
			</Card>
		</>
	);
}
