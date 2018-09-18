import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Button, Input, Form, Radio, Tag, Divider } from 'antd'

const InputField = ({ input, meta, icon, label, ...rest }) =>
  <Form.Item label={label} hasFeedback validateStatus={meta.touched ? (meta.error ? 'error' : 'success') : ''} help={meta.touched && meta.error ? meta.error : ''}>
    <Input
      {...input}
      prefix={icon}
      {...rest} />
  </Form.Item>

const RadioField = ({ input: { value, onChange }, meta: { touched, error }, label, onSubmit, placeholder, options }) =>
  <Form.Item>
    <Radio.Group>
      <Radio value="on">On</Radio>
      <Radio value="off">Off</Radio>
    </Radio.Group>
    {touched && error && <Tag color='red' pointing>{error}</Tag>}
  </Form.Item>

const NotificationsForm = ({ handleSubmit, submitting }) =>
  <Form onSubmit={handleSubmit}>
    <Field component={RadioField} name='power' type='text' label='Notifications on/off' />
    <Divider />
    <Button loading={submitting} type='primary' htmlType='submit'>Save</Button>
  </Form>

const ConnectedNotificationsForm = reduxForm({
  form: 'notificationsSettings',
})(NotificationsForm)

const mapStateToProps = ({ notifications }) =>
({
  initialValues: notifications.settings
})

export default connect(mapStateToProps)(ConnectedNotificationsForm)
