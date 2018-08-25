import React from 'react'

import { Field, reduxForm } from 'redux-form'

import { Alert, Form, Button, Input, Icon } from 'antd'

import { validate } from './validators'

const FormItem = Form.Item

const InputField = ({ input, meta, icon, ...rest }) =>
  <FormItem hasFeedback validateStatus={meta.touched ? (meta.error ? 'error' : 'success') : ''} help={meta.touched && meta.error ? meta.error : ''}>
    <Input
      {...input}
      prefix={icon}
      {...rest} />
  </FormItem>

const LoginForm = ({error, handleSubmit, submitting}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name="email" type="email" icon={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Email' />
    <Field component={InputField} name="password" type="password" icon={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Password' />
    {error && <Alert message={error} type="error" closable />}
    <Button loading={submitting} htmlType="submit" type='primary'>Log in</Button>
  </Form>

export default reduxForm({
  form: 'loginHeader',
  validate,
})(LoginForm)
