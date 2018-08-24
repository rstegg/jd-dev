import React, { Component} from 'react'

import { Progress, Input, Icon, Button, Form } from 'antd'

const { Search, TextArea } = Input
const FormItem = Form.Item

export default class PrescriptionForm extends Component {
  render () {
    const { order } = this.props
    return (
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px'}}>
          <div style={{ lineHeight: 0, marginTop: '24px' }}>
            <div style={{ width: '100%', marginBottom: '12px', textAlign: 'center' }}>Case ID</div>
            <b>{order.name}</b>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', marginTop: '36px'}}>
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '50px'}}>
              <div style={{ lineHeight: 0, marginTop: '24px' }}>
                <div style={{ width: '100%', marginBottom: '12px' }}>Type of Restore</div>
                {order.type}
              </div>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{ lineHeight: 0, marginTop: '24px' }}>
                  <div style={{ width: '100%', marginBottom: '12px' }}>Design Notes</div>
                  {order.notes}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
  }
}
