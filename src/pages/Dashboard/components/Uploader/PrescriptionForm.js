import React, { Component} from 'react'

import SelectSearch from './SelectSearch'
import DentalPicker from '../DentalPicker/Picker'
import ModelPicker from '../ModelPicker/Picker'
import { TimePicker, DatePicker, List, Progress, Input, Icon, Button, Form } from 'antd'

import moment from 'moment'

const { Search, TextArea } = Input
const FormItem = Form.Item

const designTypes = [
  { label: 'Full Crown', value: 'Full Crown', },
  { label: 'Coping', value: 'Coping', },
  { label: 'Anatomical Coping', value: 'Anatomical Coping', },
  { label: 'Full Crown Bridge', value: 'Full Crown Bridge', },
  { label: 'Coping Bridge', value: 'Coping Bridge', },
  { label: 'Inlay', value: 'Inlay', },
  { label: 'Onlay', value: 'Onlay', },
  { label: 'Model', value: 'Model' },
]
const contactTypes = [
  { label: '+0.05 mm Open Contact', value: '+0.05 mm Open Contact' },
  { label: '+0.04 mm Open Contact', value: '+0.04 mm Open Contact' },
  { label: '+0.03 mm Open Contact', value: '+0.03 mm Open Contact' },
  { label: '+0.025 mm Open Contact', value: '+0.025 mm Open Contact' },
  { label: '+0.10 mm Open Contact', value: '+0.10 mm Open Contact' },
  { label: '+0.00 mm', value: '+0.00 mm' },
  { label: '-0.01 mm', value: '-0.01 mm' },
  { label: '-0.02 mm', value: '-0.02 mm' },
  { label: '-0.025 mm', value: '-0.025 mm' },
  { label: '-0.03 mm', value: '-0.03 mm' },
  { label: '-0.035 mm', value: '-0.035 mm' },
  { label: '-0.04 mm', value: '-0.04 mm' },
  { label: '-0.045 mm', value: '-0.045 mm' },
  { label: '-0.05 mm', value: '-0.05 mm' },
  { label: '-0.06 mm', value: '-0.06 mm' },
  { label: '-0.07 mm', value: '-0.07 mm' },
  { label: '-0.08 mm', value: '-0.08 mm' },
  { label: '-0.09 mm', value: '-0.09 mm' },
  { label: '-0.10 mm', value: '-0.10 mm' },
  { label: '-0.20 mm', value: '-0.20 mm' },
]
const occlusionTypes = [
  { label: '+0.10 mm Supra Occlusion', value: '+0.10 mm Supra Occlusion' },
  { label: '+0.04 mm Supra Occlusion', value: '+0.04 mm Supra Occlusion' },
  { label: '0.00 mm OUT of Occlusion', value: '0.00 mm OUT of Occlusion' },
  { label: '-0.07 mm OUT of Occlusion', value: '-0.07 mm OUT of Occlusion' },
  { label: '-0.08 mm OUT of Occlusion', value: '-0.08 mm OUT of Occlusion' },
  { label: '-0.10 mm OUT of Occlusion', value: '-0.10 mm OUT of Occlusion' },
  { label: '-0.12 mm OUT of Occlusion', value: '-0.12 mm OUT of Occlusion' },
  { label: '-0.15 mm OUT of Occlusion', value: '-0.15 mm OUT of Occlusion' },
  { label: '-0.20 mm OUT of Occlusion', value: '-0.20 mm OUT of Occlusion' },
  { label: '-0.25 mm OUT of Occlusion', value: '-0.25 mm OUT of Occlusion' },
  { label: '-0.30 mm OUT of Occlusion', value: '-0.30 mm OUT of Occlusion' },
  { label: '-0.32 mm OUT of Occlusion', value: '-0.32 mm OUT of Occlusion' },
  { label: '-0.35 mm OUT of Occlusion', value: '-0.35 mm OUT of Occlusion' },
  { label: '-0.37 mm OUT of Occlusion', value: '-0.37 mm OUT of Occlusion' },
  { label: '-0.40 mm OUT of Occlusion', value: '-0.40 mm OUT of Occlusion' },
  { label: '-0.45 mm OUT of Occlusion', value: '-0.45 mm OUT of Occlusion' },
  { label: '-0.50 mm OUT of Occlusion', value: '-0.50 mm OUT of Occlusion' },
  { label: '-0.60 mm OUT of Occlusion', value: '-0.60 mm OUT of Occlusion' },
  { label: '-0.70 mm OUT of Occlusion', value: '-0.70 mm OUT of Occlusion' },
  { label: '-0.80 mm OUT of Occlusion', value: '-0.80 mm OUT of Occlusion' },
  { label: '-0.90 mm OUT of Occlusion', value: '-0.90 mm OUT of Occlusion' },
  { label: '-1.00 mm OUT of Occlusion', value: '-1.00 mm OUT of Occlusion' },
]
const ponticTypes = [
  { label: 'Conical', value: 'Conical' },
  { label: 'Hygenic', value: 'Hygenic' },
  { label: 'Modified Ridge Lap', value: 'Modified Ridge Lap' },
  { label: 'Ovate', value: 'Ovate' },
  { label: 'Saddle Ridge', value: 'Saddle Ridge' },
]
const linerTypes = [
  { label: '0.030 mm - 30 Microns', value: '0.030 mm - 30 Microns' },
  { label: '0.020 mm - 20 Microns', value: '0.020 mm - 20 Microns' },
  { label: '0.010 mm - 10 Microns', value: '0.010 mm - 10 Microns' },
  { label: '0.040 mm - 40 Microns', value: '0.040 mm - 40 Microns' },
  { label: '0.050 mm - 50 Microns', value: '0.050 mm - 50 Microns' },
  { label: '0.060 mm - 60 Microns', value: '0.060 mm - 60 Microns' },
  { label: '0.005 mm - 05 Microns', value: '0.005 mm - 05 Microns' },
  { label: '0.00 mm - No Liner Spacer', value: '0.00 mm - No Liner Spacer' },
  { label: '0.015 mm - 15 Microns', value: '0.015 mm - 15 Microns' },
  { label: '0.150 mm - 150 Microns', value: '0.150 mm - 150 Microns' },
  { label: '0.200 mm - 200 Microns', value: '0.200 mm  200 Microns' },
  { label: '0.270 mm - 270 Microns', value: '0.270 mm -270 Microns' },
]

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
    const { product, isLoading, toggleRenameScanID, setType, setName, setNotes, setUnits, setModel, clearUnits, idx,
    setPreference, setDueTime, setDueDate } = this.props
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
            <FormItem hasFeedback validateStatus={product.hasUnitError}>
              {product.type === 'Model' ? <ModelPicker idx={idx} product={product} setModel={setModel} clearUnits={clearUnits} />
              : <DentalPicker idx={idx} product={product} setUnits={setUnits} clearUnits={clearUnits} /> }
            </FormItem>
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '50px'}}>
            <FormItem hasFeedback validateStatus={product.hasTypeError}>
              <div style={{ lineHeight: 0, marginTop: '24px' }}>
                <div style={{ width: '100%', marginBottom: '12px' }}>Type of Restore</div>
                <SelectSearch
                  label='Restoration type'
                  options={designTypes}
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
                  onChange={e => setNotes(e.target.value, idx)}
                  value={product.notes} />
              </div>
            </FormItem>
              <div style={{ lineHeight: 0, marginTop: '24px' }}>
                <div style={{ width: '100%', marginBottom: '12px' }}>Design Preferences</div>
                <List bordered>
                  <List.Item>
                    <SelectSearch
                    label='Contact Preferences'
                    options={contactTypes}
                    style={{ width: 200, marginRight: '16px' }}
                    onChange={value => setPreference('contact', value, idx)}
                    value={product.contact} />
                  </List.Item>
                  <List.Item>
                    <SelectSearch
                      label='Occlusion Preferences'
                      options={occlusionTypes}
                      style={{ width: 200, marginRight: '16px' }}
                      onChange={value => setPreference('occlusion', value, idx)}
                      value={product.occlusion} />
                  </List.Item>
                  <List.Item>
                    <SelectSearch
                      label='Pontic Preferences'
                      options={ponticTypes}
                      style={{ width: 200, marginRight: '16px' }}
                      onChange={value => setPreference('pontic', value, idx)}
                      value={product.pontic} />
                  </List.Item>
                  <List.Item>
                    <SelectSearch
                      label='Liner Spacer Preferences'
                      options={linerTypes}
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
