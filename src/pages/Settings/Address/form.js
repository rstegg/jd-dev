import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Col, Button, Input, Form, Select, Tag, Divider } from 'antd'

import countries from './countries'

import { validate } from './validators'

const InputField = ({ input, meta, icon, label, ...rest }) =>
  <Form.Item label={label} hasFeedback validateStatus={meta.touched ? (meta.error ? 'error' : 'success') : ''} help={meta.touched && meta.error ? meta.error : ''}>
    <Input
      {...input}
      prefix={icon}
      {...rest} />
  </Form.Item>

const SelectField = ({ input: { value, onChange }, meta: { touched, error }, label, onSubmit, placeholder, options }) =>
  <Form.Item>
    {label && <div className='ant-form-item-label'><label title={label}>{label}</label></div>}
    <Select
      label={label}
      placeholder={placeholder}
      search
      selection
      value={value}
      onSelect={onChange}>
        {options.map(option => <Select.Option key={`option-${option.value}`} value={option.value}>{option.label}</Select.Option>)}
      </Select>
    {touched && error && <Tag color='red' pointing>{error}</Tag>}
  </Form.Item>

const AddressForm = ({ handleSubmit, submitting }) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' type='text' label='Full Name' placeholder='Full name' />
    <Field component={InputField} name='line1' type='text' label='Address' placeholder='Street and number, P.O. box, c/o.' />
    <Field component={InputField} name='line2' type='text' placeholder='Apartment, suite, unit, building, floor, etc.' />
    <Col span={14}>
      <Field component={InputField} name='city' type='text' label='City' placeholder='City' />
    </Col>
    <Col span={2}></Col>
    <Col span={8}>
      <Field component={InputField} name='region' type='text' label='State' placeholder='State' />
    </Col>
    <Col span={14}>
      <Field component={SelectField} name='country' label='Country' options={countries} />
    </Col>
    <Col span={2}></Col>
    <Col span={8}>
      <Field component={InputField} name='zip' type='text' label='Zip' placeholder='Zip' />
    </Col>
    <Divider />
    <Button loading={submitting} type='primary' htmlType='submit'>Save</Button>
  </Form>

const ConnectedAddressForm = reduxForm({
  form: 'addressSettings',
  validate
})(AddressForm)

const mapStateToProps = ({ user }) =>
({
  initialValues: user.address
})

export default connect(mapStateToProps)(ConnectedAddressForm)
