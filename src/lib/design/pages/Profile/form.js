import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Alert, Form, Button, Input, Icon } from 'antd'

import { validate } from './validators'

const FormItem = Form.Item

const InputField = ({ input, meta, icon, label, ...rest }) =>
  <FormItem label={label} hasFeedback validateStatus={meta.touched ? (meta.error ? 'error' : 'success') : ''} help={meta.touched && meta.error ? meta.error : ''}>
    <Input
      {...input}
      prefix={icon}
      {...rest} />
  </FormItem>

const ProfileForm = ({error, handleSubmit, submitting}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name="name" type="text" icon={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Full name' label='Full name' />
    <Field component={InputField} name="bio" type="text" icon={<Icon type="profile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Bio' label='Bio'/>
    <Field component={InputField} name="password" type="password" icon={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Password' label='Password' />
    {error && <Alert message={error} type="error" closable style={{ marginBottom: '20px' }} />}
    <Button loading={submitting} htmlType="submit" type='primary'>Save</Button>
  </Form>

const mapStateToProps = ({ user }) => ({ initialValues: user })

const ReduxProfileForm = reduxForm({
  form: 'profile',
  validate,
})(ProfileForm)

export default connect(mapStateToProps)(ReduxProfileForm)
