import { Form, Input, Modal, Radio } from "antd";
import React from "react";

export default function QuizModal({visible, setVisible, quizForm}) {

	const onSubmit = value => {
    setVisible(false);
    console.log(value)
	};

	const onCancel = () => {
		setVisible(false);
	};

	return (
		<Modal
			visible={visible}
			title="Edit question"
			okText="Save"
			cancelText="Cancel"
			onCancel={onCancel}
			onOk={() => {
				quizForm.submit();
			}}
		>
			<Form
				form={quizForm}
				layout="vertical"
				name="quiz-form"
				onFinish={onSubmit}
			>
				<Form.Item label="Question" name="question">
					<Input.TextArea />
				</Form.Item>

				<Form.Item label="Answer" name="correctAns">
          <Radio.Group>
            <Radio value={1} />
            <Form.Item name="firstOp">
                <Input bordered={false} />
              </Form.Item>
            <Radio value={2}>
              <Form.Item name="secondOp">
                <Input bordered={false} />
              </Form.Item>
            </Radio>
            <Radio value={3}>
              <Form.Item name="thirdOp">
                <Input bordered={false} />
              </Form.Item>
            </Radio>
            <Radio value={4}>
              <Form.Item name="fourthOp">
                <Input bordered={false} />
              </Form.Item>
            </Radio>
          </Radio.Group>
        </Form.Item>
			</Form>
		</Modal>
	);
}
