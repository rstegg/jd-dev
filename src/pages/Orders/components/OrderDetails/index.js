import React, { Component } from 'react'

import { Modal, Upload, Avatar, Steps, List, Tag, Card, Progress, Input, Icon, Button, Form } from 'antd'

import moment from 'moment'

import './Styles.css'

const Step = Steps.Step

const { Search, TextArea } = Input
const FormItem = Form.Item

const OrderSteps = ({ order }) => {
  const statusNum = order.status === 'sent' ? 0 : 1
  if (order.status === 'canceled') {
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
    this.props.addExtraNote(this.state.note, this.props.order, this.props.user.token)
    this.setState({ visible: false, note: '' })
  }
  showModal = () => {
    this.setState({ visible: true })
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
          extra={<a onClick={() => this.showModal()} style={{ position: 'absolute', right: '10px', top: '10px' }}>Add notes</a>}>
          {order.notes && order.notes.map((note, i) => note.length ? <Tag key={`note-${order.uid}-${i}`} color='geekblue'>{note}</Tag> : null)}
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Preferences"
          extra={<a href="#" style={{ position: 'absolute', right: '10px', top: '10px' }}>Edit</a>}
        >
          <List bordered grid={{ xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 2 }}>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  Contact
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <b>{order.contact}</b>
                </div>
              </div>
            </List.Item>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  Occlusion
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <b>{order.occlusion}</b>
                </div>
              </div>
            </List.Item>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  Pontic
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <b>{order.pontic}</b>
                </div>
              </div>
            </List.Item>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
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
