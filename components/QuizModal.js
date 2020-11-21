import { Form, Input, Modal, Radio } from "antd";
import React from "react";

export default function QuizModal({ visible, setVisible, quizForm, id }) {

  const {id_konten, id_pertanyaan} = id

  const onSubmit = async value => {
    try {
      //API: PUT update pertanyaan/kuis
      await api.put(`/konten/${id_konten}/pertanyaan/${id_pertanyaan}`, value)
      setVisible(false);
    } catch (error) {
      console.log(error)
    }
  };

  const onCancel = () => {
    quizForm.resetFields();
    setVisible(false);
  };

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
    >
      <Form
        form={quizForm}
        layout="vertical"
        name="quiz-form"
        onFinish={onSubmit}
      >
        <Form.Item label="Question" name="pertanyaan">
          <Input.TextArea placeholder="Type the question..." />
        </Form.Item>
        <Form.Item label="Answer" name="jawaban_benar">
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