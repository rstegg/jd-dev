import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Button, Input, Form, Divider } from 'antd'

import { validate } from './validators'

const InputField = ({ input, meta, icon, label, ...rest }) =>
  <Form.Item label={label} hasFeedback validateStatus={meta.touched ? (meta.error ? 'error' : 'success') : ''} help={meta.touched && meta.error ? meta.error : ''}>
    <Input
      {...input}
      prefix={icon}
      {...rest} />
  </Form.Item>


const AccountForm = ({ handleSubmit, submitting, loading }) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='oldPassword' type='password' label='Old Password *' placeholder='************' />
    <Field component={InputField} name='newPassword' type='password' label='New Password' placeholder='************' />
    * required
    <br />
    * changing your email will require re-verification
    <Divider />
    <Button loading={loading || submitting} type='primary' htmlType='submit'>Save</Button>
  </Form>

const ConnectedAccountForm = reduxForm({
  form: 'accountSettings',
  validate,
})(AccountForm)

const mapStateToProps = ({ user }) =>
({
  initialValues: user
})

export default connect(mapStateToProps)(ConnectedAccountForm)
