import React, { Component} from 'react'

import SelectSearch from './SelectSearch'
import DentalPicker from '../DentalPicker/Picker'
import { Progress, Input, Icon, Button, Form } from 'antd'

const { Search, TextArea } = Input
const FormItem = Form.Item

export default class PrescriptionForm extends Component {
  render () {
    const { product, productTypes, isLoading, deleteProduct, toggleRenameCaseID, setType, setName, setNotes, setUnits, clearUnits, idx } = this.props
    return (
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        {isLoading ? <Progress style={{marginTop: '36px', marginLeft: '16px'}} percent={product.progress} />
        : <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px'}}>
          {product.renameCaseID ?
            <FormItem hasFeedback validateStatus={product.hasNameError}>
              <div style={{ lineHeight: 0, marginTop: '24px' }}>
                <div style={{ width: '100%', marginBottom: '12px', textAlign: 'center' }}>Case ID</div>
                <Search
                  placeholder='Case ID'
                  style={{ width: 300, lineHeight: 0 }}
                  onSearch={value => setName(value, idx)}
                  enterButton={<Icon type='check' />}
                  defaultValue={product.name} />
              </div>
            </FormItem>
            : <div style={{ lineHeight: 0, marginTop: '24px' }}>
                <div style={{ width: '100%', marginBottom: '12px', textAlign: 'center' }}>Case ID</div>
                <b>{product.name}</b>
                <Button size='small' type="primary" onClick={() => toggleRenameCaseID(idx)} style={{marginLeft: '3px'}}><Icon type='edit' /></Button>
              </div>
          }
          <div style={{display: 'flex', flexDirection: 'row', marginTop: '36px'}}>
            <FormItem hasFeedback validateStatus={product.hasUnitError}>
              <DentalPicker idx={idx} product={product} setUnits={setUnits} clearUnits={clearUnits} />
            </FormItem>
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '50px'}}>
              <FormItem hasFeedback validateStatus={product.hasTypeError}>
                <div style={{ lineHeight: 0, marginTop: '24px' }}>
                  <div style={{ width: '100%', marginBottom: '12px' }}>Type of Restore</div>
                  <SelectSearch
                    label='Restoration type'
                    options={productTypes}
                    style={{ width: 200, marginRight: '16px' }}
                    onChange={value => setType(value, idx)}
                    value={product.type} />
                </div>
              </FormItem>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
