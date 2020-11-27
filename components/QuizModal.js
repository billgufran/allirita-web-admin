import { Form, Input, Modal, Radio } from "antd";
import { useContext } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

export default function QuizModal({ visible, setVisible, quizForm, id, getSelectedContent }) {

  const {user} = useContext(AuthContext)
  const {id_konten, id_pertanyaan} = id

  const updateQuiz = async value => {
    try {
      //API: PUT update pertanyaan/kuis
      await api.put(
        `/konten/${id_konten}/pertanyaan/${id_pertanyaan}`,
        value,
        {headers: {Authorization: `Bearer ${user.token}`}}
      )
    } catch (error) {
      console.log(error)
    }
  }

  const createQuiz = async value => {
    try {
      //API: POST create pertanyaan/kuis
      await api.post(
        `/konten/${id_konten}/pertanyaan`,
        value,
        {headers: {Authorization: `Bearer ${user.token}`}}
      )
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = value => {
    id_pertanyaan ? updateQuiz(value) : createQuiz(value)
    setVisible(false);
    getSelectedContent(id_konten)
  }

  const onCancel = () => {
    setVisible(false);
    quizForm.resetFields();
  };

  // Form rules
	const stringRules = {
		required: true,
		type: "string",
		whitespace: true,
		max: 255,
	}

  return (
    <Modal
      visible={visible}
      title="Edit question"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={ () => {
        quizForm.submit();
      }}
      okButtonProps={{
        // disabled: !quizForm.isFieldsTouched(true),
      }}
    >
      <Form
        form={quizForm}
        layout="vertical"
        name="quiz-form"
        onFinish={onSubmit}
      >
        <Form.Item
          label="Question"
          name="pertanyaan"
          rules={[
            {
              ...stringRules,
              message: "Please fill the question",
            },
          ]}
        >
          <Input.TextArea placeholder="Type the question..." />
        </Form.Item>
        <Form.Item
          label="Answer"
          name="jawaban_benar"
          rules={[
            {
              required: true,
              whitespace: true,
              max: 255,
              message: "Please provide the answers",
            },
          ]}
        >
          <Radio.Group>
            <Option value="jawaban_a" index={"a"} />
            <Option value="jawaban_b" index={"b"} />
            <Option value="jawaban_c" index={"c"} />
            <Option value="jawaban_d" index={"d"} />
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}

function Option({value, index}) {
  return (
    <Input.Group compact>
      <Form.Item>
        <Radio value={index} />
      </Form.Item>
      <Form.Item name={value}>
        <Input bordered={false} placeholder="Type the answer..." />
      </Form.Item>
    </Input.Group>
  )
}