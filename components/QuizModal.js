import { Form, Input, Modal, Radio } from "antd";
import React from "react";

export default function QuizModal({ visible, setVisible, quizForm }) {

  const onSubmit = value => {
    setVisible(false);
    console.log(value)
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={ visible }
      title="Edit question"
      okText="Save"
      cancelText="Cancel"
      onCancel={ onCancel }
      onOk={ () => {
        quizForm.submit();
      } }
    >
      <Form
        form={ quizForm }
        layout="vertical"
        name="quiz-form"
        onFinish={ onSubmit }
      >
        <Form.Item label="Question" name="question">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Answer" name="correctAns">
          <Radio.Group>
            <Option value="firstOp" id={1} />
            <Option value="secondOp" id={2} />
            <Option value="thirdOp" id={3} />
            <Option value="fourthOp" id={4} />
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}

function Option({value, id}) {
  return (
    <Input.Group compact>
      <Form.Item>
        <Radio value={id} />
      </Form.Item>
      <Form.Item name={value}>
        <Input bordered={ false } />
      </Form.Item>
    </Input.Group>
  )
}