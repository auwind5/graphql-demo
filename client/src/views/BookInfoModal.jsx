import React, { useEffect } from 'react'
import { Form, Input, Modal, Button } from 'antd'
import { useForm } from 'antd/lib/form/Form'

export default function BookInfoModal(props) {
  const { isModalVisible, model, handleSubmit, handleCancel, rowData } = props
  const [ form ] = useForm()

  useEffect(() => {
    if (model !== 'POST') {
      form.setFieldsValue(rowData)
    } else {
      form.resetFields()
    }
  }, [model, form, rowData])

  const onFinishFailed = () => {
    console.log('failed!')
  }
  return (
    <Modal
      title={model === 'add' ? 'Add Book' : 'Edit Book'}
      footer={null}
      forceRender
      visible={isModalVisible}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Book Name"
          name="bookName"
        >
          <Input name="bookName" />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author"
        >
          <Input name="author" />
        </Form.Item>
        <Form.Item
          label="Shelf ID"
          name="shelfID"
        >
          <Input name="shelfID" />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
        >
          <Input name="city" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 18, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
