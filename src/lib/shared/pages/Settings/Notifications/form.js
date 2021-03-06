import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Alert, Button, Form, Radio, Divider } from 'antd'

const RadioField = ({ input: { value, onChange }, meta: { touched, error }, label, onSubmit, placeholder, options }) =>
  <Form.Item>
    <Radio.Group>
      <Radio value="on">On</Radio>
      <Radio value="off">Off</Radio>
    </Radio.Group>
    {touched && error && <Alert message={error} type="error" closable style={{ marginBottom: '20px' }} />}
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
