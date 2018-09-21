import React, { Component } from 'react'

import { Modal, Upload, Avatar, Steps, List, Tag, Card, Progress, Input, Icon, Button, Form } from 'antd'

import moment from 'moment'

import './Styles.css'

const Step = Steps.Step

const { Search, TextArea } = Input
const FormItem = Form.Item

const CaseSteps = ({ activeCase }) => {
  const statusNum = activeCase.status === 'sent' ? 0 : 1
  if (activeCase.status === 'canceled') {
    return (
      <Steps current={statusNum} status={'error'}>
        <Step title="Sent" description="Sent to designer" />
        <Step title="Canceled" description="Case canceled" />
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
    this.props.addDesignNote(this.state.note, this.props.activeCase, this.props.user.token)
    this.setState({ visible: false, note: '' })
  }
  showModal = () => {
    this.setState({ visible: true })
  }
  render () {
    const { activeCase } = this.props
    return (
      <Card title={<CaseSteps activeCase={activeCase} />}>
        <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.85)', marginBottom: 16, fontWeight: 500, }}>
          <p>Sent: {moment(activeCase.createdAt).fromNow()}</p>
          <p>Due by: {moment(activeCase.dueDate).fromNow()}</p>
          <p>Latest change: {moment(activeCase.updatedAt).fromNow()}</p>
        </div>
        <Card
          type="inner"
          title="User Info">
          {activeCase.user &&
            <Card.Grid style={{ width: '100%' }}>
              <Card.Meta
                avatar={activeCase.userImage ? <Avatar src={activeCase.userImage} /> : <Avatar icon="user" />}
                title={activeCase.userName}
                description={activeCase.userMail}
              />
            </Card.Grid>
          }
        </Card>
        <Card
          type="inner"
          title="Scan Files">
          {activeCase.caseFileUrls && activeCase.caseFileUrls.map((scanFileUrl, i) => <Tag key={`scanFileUrl-${activeCase.uid}-${i}`} color='geekblue'><a href={scanFileUrl}>{decodeURI(scanFileUrl && scanFileUrl.split('/').slice(-1)[0])}</a></Tag>)}
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Design Files"
          extra={<Upload action={`/api/v1/upload/design/${activeCase.uid}`} name='file' headers={{ authorization: this.props.user.token }} showUploadList={false} onChange={accept => accept.file && accept.file.response && this.props.addDesignFile(accept.file.response.file, activeCase)}>
            <Button icon='upload' shape='circle' style={{ position: 'absolute', right: '10px', top: '7.5px' }} />
          </Upload>}>
          {activeCase.designFileUrls && activeCase.designFileUrls.map((designFileUrl, i) => <Tag key={`designFileUrl-${activeCase.uid}-${i}`} color='gold'><a href={designFileUrl}>{decodeURI(designFileUrl && designFileUrl.split('/').slice(-1)[0])}</a></Tag>)}
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Notes"
          extra={<a onClick={() => this.showModal()} style={{ position: 'absolute', right: '10px', top: '10px' }}>Add notes</a>}>
          {activeCase.notes && activeCase.notes.map((note, i) => note.text ? <div key={`note-${activeCase.uid}-${i}`}>{note.user}: "{note.text}"</div> : null)}
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Preferences">
          <List grid={{ xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 2 }}>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column', bc: '1px solid #ccc' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  Contact
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <b>{activeCase.contact}</b>
                </div>
              </div>
            </List.Item>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column', bc: '1px solid #ccc' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  Occlusion
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <b>{activeCase.occlusion}</b>
                </div>
              </div>
            </List.Item>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column', bc: '1px solid #ccc' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  Pontic
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <b>{activeCase.pontic}</b>
                </div>
              </div>
            </List.Item>
            <List.Item>
              <div style={{ display: 'flex', flexDirection: 'column', bc: '1px solid #ccc' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  Liner Spacer
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <b>{activeCase.linerSpacer}</b>
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
