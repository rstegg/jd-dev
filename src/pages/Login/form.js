import React from 'react'

import { Form, Field, reduxForm } from 'redux-form'

import { Button, Input, Icon } from 'antd'

const InputField = ({ input, name, type, label, icon, placeholder }) =>
  <Input
    {...input}
    placeholder={placeholder}
    prefix={icon}
    style={{ marginBottom: '12px'}} />

const LoginForm = ({handleSubmit, submitting}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name="username" type="text" label='Username' icon={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
    <Field component={InputField} name="password" type="password" label='Password' icon={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Password' />
    <Button loading={submitting} htmlType="submit" type='primary'>Log in</Button>
  </Form>

export default reduxForm({
  form: 'login'
})(LoginForm)
