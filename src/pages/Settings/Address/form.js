import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Button, Input, Form, Select, Tag, Divider } from 'antd'

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
    <Select
      label={label}
      placeholder={placeholder}
      search
      selection
      value={value}
      onChange={(_,data) => {
        onChange(data.value)
        if (onSubmit) {
          onSubmit(data.value)
        }
      }}
      options={options} />
    {touched && error && <Tag color='red' pointing>{error}</Tag>}
  </Form.Item>

const AddressForm = ({ handleSubmit, submitting }) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' type='text' label='Full Name' placeholder='' />
    <Field component={InputField} name='line1' type='text' label='Address' placeholder='Street and number, P.O. box, c/o.' />
    <Field component={InputField} name='line2' type='text' placeholder='Apartment, suite, unit, building, floor, etc.' />
    <Field component={InputField} name='city' type='text' label='City' placeholder='' />
    <Field component={InputField} name='region' type='text' label='State/Province/Region' placeholder='' />
    <Field component={SelectField} name='country' label='Country' options={countries} />
    <Field component={InputField} name='zip' type='text' label='Zip' placeholder='' />
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
