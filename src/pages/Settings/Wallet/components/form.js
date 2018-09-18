import React from 'react'

import { Field, reduxForm } from 'redux-form'

import { Col, Alert, Form, Button, Input, Icon } from 'antd'

import { normalizeCCNumber, normalizeExpiry, normalizeCVV } from './normalize'
import { validate } from './validators'


const FormItem = Form.Item

const InputField = ({ input, meta, icon, ...rest }) =>
  <FormItem hasFeedback validateStatus={meta.touched ? (meta.error ? 'error' : 'success') : ''} help={meta.touched && meta.error ? meta.error : ''}>
    <Input
      {...input}
      prefix={icon}
      {...rest} />
  </FormItem>

const CardForm = ({error, handleSubmit, submitting}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} normalize={normalizeCCNumber} name="number" type="text" icon={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Number' />

    <Field component={InputField} name="name" type="text" icon={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Name on card' />
    <Col span={11}>
      <Field component={InputField} normalize={normalizeExpiry} name="expirationDate" type="text" icon={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='MM/YY' />
    </Col>
    <Col span={2}>

    </Col>
    <Col span={11}>
      <Field component={InputField} normalize={normalizeCVV} name="cvv" type="text" icon={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='CVV' />
    </Col>

    {error && <Alert message={error} type="error" closable style={{ marginBottom: '20px' }} />}
  </Form>

export default reduxForm({
  form: 'addcard',
  validate
})(CardForm)
