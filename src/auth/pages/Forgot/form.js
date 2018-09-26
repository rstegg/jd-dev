import React from 'react'

import { Field, reduxForm } from 'redux-form'

import { validate, asyncValidate } from './validators'

import { Alert, Form, Button, Input, Icon } from 'antd'

const FormItem = Form.Item

const InputField = ({ input, meta, icon, ...rest }) =>
  <FormItem hasFeedback validateStatus={meta.touched ? (meta.error ? 'error' : 'success') : ''} help={meta.touched && meta.error ? meta.error : ''}>
    <Input
      {...input}
      prefix={icon}
      {...rest} />
  </FormItem>

const SignupForm = ({error, handleSubmit, submitting}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name="email" type="email" icon={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Email' />
    {error && <Alert message={error} type="error" closable style={{ marginBottom: '20px' }} />}
    <Button loading={submitting} htmlType="submit" type='primary'>Submit</Button>
  </Form>

export default reduxForm({
  form: 'signup',
  validate,
  asyncValidate,
  asyncBlurFields: ['email']
})(SignupForm)
