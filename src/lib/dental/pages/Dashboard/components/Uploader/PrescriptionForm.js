import React, { Component} from 'react'
import { TimePicker, DatePicker, List, Progress, Input, Form } from 'antd'
import moment from 'moment'

import SelectSearch from './SelectSearch'
import DentalPicker from '../DentalPicker/Picker'
import ModelPicker from '../ModelPicker/Picker'

import { DESIGN_TYPES, CONTACT_TYPES, OCCLUSION_TYPES, PONTIC_TYPES, LINER_SPACER_TYPES, } from './utils'

const { TextArea } = Input
const FormItem = Form.Item


export default class PrescriptionForm extends Component {
  state = {
    startValue: moment()
  }
  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }
  render () {
    const { product, isLoading, setType, setName, setNotes, setUnits, setModel, clearUnits, idx,
    setPreference, setDueTime, setDueDate, errors } = this.props
    return (
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        {isLoading ? <Progress style={{marginTop: '36px', marginLeft: '16px'}} percent={product.progress} />
        : <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px'}}>
            <div style={{ width: '100%' }}>Due by</div>
            <div style={{display: 'flex', flexDirection: 'row' }}>
              <TimePicker value={moment(product.dueTime)} use12Hours format="hh:mm:ss A" allowEmpty={false} onChange={time => setDueTime(time, idx)}  />
              <DatePicker disabledDate={this.disabledEndDate} value={moment(product.dueDate)} allowClear={false} onChange={time => setDueDate(time, idx)}  />
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', marginTop: '36px'}}>
            <FormItem hasFeedback validateStatus={errors[idx] && errors[idx].units}>
              {product.type === 'Model' ? <ModelPicker idx={idx} product={product} setModel={setModel} clearUnits={clearUnits} />
              : <DentalPicker idx={idx} product={product} setUnits={setUnits} clearUnits={clearUnits} /> }
            </FormItem>
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '50px'}}>
            <FormItem hasFeedback validateStatus={errors[idx] && errors[idx].type}>
              <div style={{ lineHeight: 0, marginTop: '24px' }}>
                <SelectSearch
                  label='Type of Restoration'
                  options={DESIGN_TYPES}
                  style={{ width: 200, marginRight: '16px' }}
                  onChange={value => setType(value, idx)}
                  value={product.type} />
              </div>
            </FormItem>
            <FormItem>
              <div style={{ lineHeight: 0, marginTop: '24px' }}>
                <div style={{ width: '100%', marginBottom: '12px' }}>Design Notes</div>
                <TextArea
                  label='Design Notes'
                  style={{ width: 200, marginRight: '16px' }}
                  onChange={e => setNotes([ e.target.value ], idx)}
                  value={product.notes} />
              </div>
            </FormItem>
              <div style={{ lineHeight: 0, marginTop: '24px' }}>
                <div style={{ width: '100%', marginBottom: '12px' }}>Design Preferences</div>
                <List bordered>
                  <List.Item>
                    <SelectSearch
                    label='Contact Preferences'
                    options={CONTACT_TYPES}
                    style={{ width: 200, marginRight: '16px' }}
                    onChange={value => setPreference('contact', value, idx)}
                    value={product.contact} />
                  </List.Item>
                  <List.Item>
                    <SelectSearch
                      label='Occlusion Preferences'
                      options={OCCLUSION_TYPES}
                      style={{ width: 200, marginRight: '16px' }}
                      onChange={value => setPreference('occlusion', value, idx)}
                      value={product.occlusion} />
                  </List.Item>
                  <List.Item>
                    <SelectSearch
                      label='Pontic Preferences'
                      options={PONTIC_TYPES}
                      style={{ width: 200, marginRight: '16px' }}
                      onChange={value => setPreference('pontic', value, idx)}
                      value={product.pontic} />
                  </List.Item>
                  <List.Item>
                    <SelectSearch
                      label='Liner Spacer Preferences'
                      options={LINER_SPACER_TYPES}
                      style={{ width: 200, marginRight: '16px' }}
                      onChange={value => setPreference('linerSpacer', value, idx)}
                      value={product.linerSpacer} />
                  </List.Item>
                </List>
          </div>
        </div>
      </div>
    </div>
      }
      </div>
    )
  }
}
