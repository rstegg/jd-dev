import React from 'react'

import { Field, reduxForm } from 'redux-form'

import { validate, asyncValidate } from './validators'

import { Form, Button, Input, Icon } from 'antd'

const FormItem = Form.Item

const InputField = ({ input, meta, icon, ...rest }) =>
  <FormItem hasFeedback validateStatus={meta.touched ? (meta.error ? 'error' : 'success') : ''} help={meta.touched && meta.error ? meta.error : ''}>
    <Input
      {...input}
      prefix={icon}
      {...rest} />
  </FormItem>

const SignupForm = ({handleSubmit, submitting}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name="email" type="email" icon={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Email' />
    <Field component={InputField} name="name" type="text" icon={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Full name' />
    <Field component={InputField} name="password" type="password" icon={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Password' />
    <Field component={InputField} name="repeat" type="password" icon={<Icon type="reload" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Verify Password' />
    <Button loading={submitting} htmlType="submit" type='primary'>Sign up</Button>
  </Form>

export default reduxForm({
  form: 'signup',
  validate,
  asyncValidate,
  asyncBlurFields: ['email']
})(SignupForm)
