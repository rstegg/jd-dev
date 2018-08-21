import React from 'react'

import { Field, reduxForm } from 'redux-form'
import { Form } from 'antd'

import { validate, asyncValidate } from './validators'

import { Button, Input, Icon } from 'antd'

const InputField = ({ input, name, type, label, icon, placeholder }) =>
  <Input
    {...input}
    placeholder={placeholder}
    prefix={icon}
    style={{ marginBottom: '12px'}} />

const SignupForm = ({handleSubmit, submitting}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name="username" icon={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
    <Field component={InputField} name="email" type="email" icon={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Email' />
    <Field component={InputField} name="password" type="password" icon={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Password' />
    <Field component={InputField} name="repeat" type="password" icon={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Verify Password' />
    <Button loading={submitting} htmlType="submit" type='primary'>Sign up</Button>
  </Form>

export default reduxForm({
  form: 'signup',
  validate,
  asyncValidate,
  asyncBlurFields: ['username', 'email']
})(SignupForm)
