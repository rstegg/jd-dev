import React, { Component } from 'react'

import { Divider, Modal, Upload, Avatar, Steps, List, Tag, Card, Input, Button, Form } from 'antd'

import moment from 'moment'

import SelectSearch from './SelectSearch'
import { CONTACT_TYPES, OCCLUSION_TYPES, PONTIC_TYPES, LINER_SPACER_TYPES, } from './utils'

import './Styles.css'


const Step = Steps.Step

const OrderSteps = ({ order }) => {
  const statusNum = order.status === 'processed' ? 1 : 2
  if (order.status === 'canceled') {
    return (
      <Steps current={statusNum} status={'error'}>
        <Step title="Sent" description="Sent to designer" />
        <Step title="In Process" description="Design in process" />
        <Step title="Canceled" description="Order canceled" />
      </Steps>
    )
  }
  return (
    <Steps current={statusNum} status={'processed'}>
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
    this.props.addExtraNote(this.state.note, this.props.order, this.props.user)
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
          {order.designers && order.designers.map((designer, idx) =>
            idx < order.designers.length - 1 ?
            <Card.Grid key={`designer-${order.uid}-${idx}`} style={{ width: '100%', backgroundColor: 'rgba(232,0,0,0.15)' }}>
              <div style={{textDecoration: 'line-through'}}>
              <Card.Meta
                avatar={designer.image ? <Avatar src={designer.image} /> : <Avatar icon="user" />}
                title={designer.name}
                description={moment(designer.asignedDate).fromNow()}
              />
              </div>
            </Card.Grid>
            :
            <Card.Grid key={`designer-${order.uid}-${idx}`} style={{ width: '100%' }}>
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
          {order.scanFileUrls && order.scanFileUrls.map((scanFileUrl, i) =>
            <Tag key={`scanFileUrl-${order.uid}-${i}`} color='geekblue'><a href={scanFileUrl}>{decodeURI(scanFileUrl && scanFileUrl.split('/').slice(-1)[0])}</a></Tag>
          )}
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Design Files">
          {order.designFileUrls && order.designFileUrls.map((designFileUrl, i) =>
            <Tag key={`designFileUrl-${order.uid}-${i}`} color='gold'><a href={designFileUrl}>{decodeURI(designFileUrl && designFileUrl.split('/').slice(-1)[0])}</a></Tag>
          )}
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Notes"
          extra={<a onClick={() => this.showNotesModal()} style={{ position: 'absolute', right: '10px', top: '10px' }}>Add notes</a>}>
          {order.notes && order.notes.map((note, idx) => note.text ? <p key={`note-${order.uid}-${idx}`} color='geekblue'>{note.user}: "{note.text}"</p> : null)}
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
              options={CONTACT_TYPES}
              style={{ width: 300, marginRight: '16px' }}
              onChange={value => this.setState({ prefs: { ...this.state.prefs, contact: value }})}
              value={this.state.prefs.contact || this.props.order.contact} />
            </List.Item>
            <List.Item>
              <SelectSearch
                label='Occlusion Preferences'
                options={OCCLUSION_TYPES}
                style={{ width: 300, marginRight: '16px' }}
                onChange={value => this.setState({ prefs: { ...this.state.prefs, occlusion: value }})}
                value={this.state.prefs.occlusion || this.props.order.occlusion} />
            </List.Item>
            <List.Item>
              <SelectSearch
                label='Pontic Preferences'
                options={PONTIC_TYPES}
                style={{ width: 300, marginRight: '16px' }}
                onChange={value => this.setState({ prefs: { ...this.state.prefs, pontic: value }})}
                value={this.state.prefs.pontic || this.props.order.pontic} />
            </List.Item>
            <List.Item>
              <SelectSearch
                label='Liner Spacer Preferences'
                options={LINER_SPACER_TYPES}
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
