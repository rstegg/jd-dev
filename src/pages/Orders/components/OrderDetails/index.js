import React, { Component } from 'react'

import { Modal, Upload, Avatar, Steps, List, Tag, Card, Input, Button, Form } from 'antd'

import moment from 'moment'

import SelectSearch from './SelectSearch'

import './Styles.css'

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

const Step = Steps.Step

const OrderSteps = ({ order }) => {
  const statusNum = order.status === 'process' ? 0 : 1
  if (order.status === 'canceled') {
    return (
      <Steps current={statusNum} status={'error'}>
        <Step title="In Process" description="Design in process" />
        <Step title="Canceled" description="Order canceled" />
      </Steps>
    )
  }
  return (
    <Steps current={statusNum} status={'process'}>
      <Step title="Sent" description="Sent to designer" />
      <Step title="In Process" description="Design in process" />
      <Step title="Complete" description="Design complete" />
    </Steps>
  )
}

export default class OrderDetails extends Component {
  state = {
    noteVisible: false,
    prefsVisible: false,
    note: '',
    prefs: {
      contact: '',
      occlusion: '',
      pontic: '',
      linerSpacer: '',
    }
  }

  hideNotesModal = () => {
    this.setState({ noteVisible: false, note: '' })
  }
  saveNewNote = () => {
    this.props.setOrderPrefs(this.state.note, this.props.order, this.props.user.token)
    this.setState({ noteVisible: false, note: '' })
  }
  showNotesModal = () => {
    this.setState({ noteVisible: true })
  }
  hidePrefsModal = () => {
    this.setState({ prefsVisible: false, prefs: '' })
  }
  saveNewPrefs = () => {
    this.props.setOrderPrefs(this.state.prefs, this.props.order, this.props.user.token)
    this.setState({ prefsVisible: false, prefs: '' })
  }
  showPrefsModal = () => {
    this.setState({ prefsVisible: true })
  }
  render () {
    const { order } = this.props
    return (
      <Card title={<OrderSteps order={order} />}>
        <p style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.85)', marginBottom: 16, fontWeight: 500, }}>
          Due by: {moment(order.dueDate).fromNow()}
        </p>
        <Card
          type="inner"
          title="Designer Info">
          {order.designers && order.designers.map((designer, i) =>
            <Card.Grid key={`designer-${order.uid}-${i}`} style={{ width: '100%' }}>
              <Card.Meta
                avatar={designer.image ? <Avatar src={designer.image} /> : <Avatar icon="user" />}
                title={designer.name}
                description={moment(designer.asignedDate).fromNow()}
              />
            </Card.Grid>
          )}
        </Card>
        <Card
          type="inner"
          title="Scan Files"
          extra={<Upload action={`/api/v1/upload/orders/${this.props.order.uid}`} name='file' headers={{ authorization: this.props.user.token }} showUploadList={false} onChange={accept => accept.file && accept.file.response && this.props.addExtraScanFile(accept.file.response.file, order)}>
            <Button icon='upload' shape='circle' style={{ position: 'absolute', right: '10px', top: '7.5px' }} />
          </Upload>}
          >
          {order.caseFileUrls && order.caseFileUrls.map((scanFileUrl, i) => <Tag key={`scanFileUrl-${order.uid}-${i}`} color='geekblue'><a href={scanFileUrl}>{decodeURI(scanFileUrl && scanFileUrl.split('/').slice(-1)[0])}</a></Tag>)}
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Design Files">
          {order.designFileUrls && order.designFileUrls.map((designFileUrl, i) => <Tag key={`designFileUrl-${order.uid}-${i}`} color='gold'><a href={designFileUrl}>{decodeURI(designFileUrl && designFileUrl.split('/').slice(-1)[0])}</a></Tag>)}
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Notes"
          extra={<a onClick={() => this.showNotesModal()} style={{ position: 'absolute', right: '10px', top: '10px' }}>Add notes</a>}>
          {order.notes && order.notes.map((note, i) => note.length ? <Tag key={`note-${order.uid}-${i}`} color='geekblue'>{note}</Tag> : null)}
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Preferences"
          extra={<a onClick={() => this.showPrefsModal()} style={{ position: 'absolute', right: '10px', top: '10px' }}>Edit</a>}
        >
          <List grid={{ xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 2 }}>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ccc' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  Contact
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <b>{order.contact}</b>
                </div>
              </div>
            </List.Item>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ccc' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  Occlusion
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <b>{order.occlusion}</b>
                </div>
              </div>
            </List.Item>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ccc' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  Pontic
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <b>{order.pontic}</b>
                </div>
              </div>
            </List.Item>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ccc' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  Liner Spacer
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <b>{order.linerSpacer}</b>
                </div>
              </div>
            </List.Item>
          </List>
        </Card>
        <Modal
          style={{ minWidth: '50%' }}
          title={'Add a note'}
          visible={this.state.noteVisible}
          onOk={() => this.saveNewNote()}
          onCancel={() => this.hideNotesModal()}
          okText="Done"
          cancelText="Cancel"
        >
          <Input placeholder='New note' onChange={e => this.setState({ note: e.target.value })} value={this.state.note} />
        </Modal>
        <Modal
          style={{ minWidth: '50%' }}
          title={'Set new design preferences'}
          visible={this.state.prefsVisible}
          onOk={() => this.saveNewPrefs()}
          onCancel={() => this.hidePrefsModal()}
          okText="Done"
          cancelText="Cancel"
        >
          <div style={{ width: '100%', marginBottom: '12px' }}>Design Preferences</div>
          <List bordered>
            <List.Item>
              <SelectSearch
              label='Contact Preferences'
              options={contactTypes}
              style={{ width: 300, marginRight: '16px' }}
              onChange={value => this.setState({ prefs: { ...this.state.prefs, contact: value }})}
              value={this.state.prefs.contact || this.props.order.contact} />
            </List.Item>
            <List.Item>
              <SelectSearch
                label='Occlusion Preferences'
                options={occlusionTypes}
                style={{ width: 300, marginRight: '16px' }}
                onChange={value => this.setState({ prefs: { ...this.state.prefs, occlusion: value }})}
                value={this.state.prefs.occlusion || this.props.order.occlusion} />
            </List.Item>
            <List.Item>
              <SelectSearch
                label='Pontic Preferences'
                options={ponticTypes}
                style={{ width: 300, marginRight: '16px' }}
                onChange={value => this.setState({ prefs: { ...this.state.prefs, pontic: value }})}
                value={this.state.prefs.pontic || this.props.order.pontic} />
            </List.Item>
            <List.Item>
              <SelectSearch
                label='Liner Spacer Preferences'
                options={linerTypes}
                style={{ width: 300, marginRight: '16px' }}
                onChange={value => this.setState({ prefs: { ...this.state.prefs, linerSpacer: value }})}
                value={this.state.prefs.linerSpacer || this.props.order.linerSpacer} />
            </List.Item>
          </List>
        </Modal>
      </Card>
    )
  }
}
