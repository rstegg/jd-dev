import React, { Component } from 'react'

import { Modal, Upload, Avatar, Steps, List, Tag, Card, Progress, Input, Icon, Button, Form } from 'antd'

import moment from 'moment'

import './Styles.css'

const Step = Steps.Step

const { Search, TextArea } = Input
const FormItem = Form.Item

const OrderSteps = ({ activeOrder }) => {
  const statusNum = activeOrder.status === 'sent' ? 0 : 1
  if (activeOrder.status === 'canceled') {
    return (
      <Steps current={statusNum} status={'error'}>
        <Step title="Sent" description="Sent to designer" />
        <Step title="Canceled" description="Order canceled" />
      </Steps>
    )
  }
  return (
    <Steps current={statusNum} status={'process'}>
      <Step title="Sent" description="Sent to designer" />
      <Step title="In Process" description="Design in process" />
      <Step title="Waiting" description="Needs approval" />
    </Steps>
  )
}

export default class PrescriptionForm extends Component {
  state = {
    visible: false,
    note: ''
  }

  hideModal = () => {
    this.setState({ visible: false, note: '' })
  }
  saveNewNote = () => {
    this.props.addDesignNote(this.state.note, this.props.activeOrder, this.props.user)
    this.setState({ visible: false, note: '' })
  }
  showModal = () => {
    this.setState({ visible: true })
  }
  render () {
    const { activeOrder } = this.props
    return (
      <Card title={<OrderSteps activeOrder={activeOrder} />}>
        <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.85)', marginBottom: 16, fontWeight: 500, }}>

          <p>Due by: {moment(activeOrder.dueDate).fromNow()}</p>
          <p>Latest change: {moment(activeOrder.updatedAt).fromNow()}</p>
        </div>
        <Card
          type="inner"
          title="User Info">
          {activeOrder.user &&
            <Card.Grid style={{ width: '100%' }}>
              <Card.Meta
                avatar={activeOrder.userImage ? <Avatar src={activeOrder.userImage} /> : <Avatar icon="user" />}
                title={activeOrder.userName}
                description={<p>Sent: {moment(activeOrder.createdAt).fromNow()}</p>}
              />
            </Card.Grid>
          }
        </Card>
        <Card
          type="inner"
          title="Scan Files">
          {activeOrder.scanFileUrls && activeOrder.scanFileUrls.map((scanFileUrl, i) => <Tag key={`scanFileUrl-${activeOrder.uid}-${i}`} color='geekblue'><a href={scanFileUrl}>{decodeURI(scanFileUrl && scanFileUrl.split('/').slice(-1)[0])}</a></Tag>)}
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Design Files"
          extra={<Upload action={`/api/v1/upload/design/${activeOrder.uid}`} name='file' headers={{ authorization: this.props.user.token }} showUploadList={false} onChange={accept => accept.file && accept.file.response && this.props.addDesignFile(accept.file.response.file, activeOrder)}>
            <Button icon='upload' shape='circle' style={{ position: 'absolute', right: '10px', top: '7.5px' }} />
          </Upload>}>
          {activeOrder.designFileUrls && activeOrder.designFileUrls.map((designFileUrl, i) => <Tag key={`designFileUrl-${activeOrder.uid}-${i}`} color='gold'><a href={designFileUrl}>{decodeURI(designFileUrl && designFileUrl.split('/').slice(-1)[0])}</a></Tag>)}
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Notes"
          extra={<a onClick={() => this.showModal()} style={{ position: 'absolute', right: '10px', top: '10px' }}>Add notes</a>}>
          {activeOrder.notes && activeOrder.notes.map((note, i) => note.text ? <div key={`note-${activeOrder.uid}-${i}`}>{note.user}: "{note.text}"</div> : null)}
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Preferences">
          <List grid={{ xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 2 }}>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ccc' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  Contact
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <b>{activeOrder.contact}</b>
                </div>
              </div>
            </List.Item>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ccc' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  Occlusion
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <b>{activeOrder.occlusion}</b>
                </div>
              </div>
            </List.Item>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ccc' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  Pontic
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <b>{activeOrder.pontic}</b>
                </div>
              </div>
            </List.Item>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ccc' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  Liner Spacer
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <b>{activeOrder.linerSpacer}</b>
                </div>
              </div>
            </List.Item>
          </List>
        </Card>
        <Modal
          style={{ minWidth: '50%' }}
          title={'Add a note'}
          visible={this.state.visible}
          onOk={() => this.saveNewNote()}
          onCancel={() => this.hideModal()}
          okText="Done"
          cancelText="Cancel"
        >
          <Input placeholder='New note' onChange={e => this.setState({ note: e.target.value })} value={this.state.note} />
        </Modal>
      </Card>
    )
  }
}
