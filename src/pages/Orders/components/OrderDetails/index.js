import React, { Component} from 'react'

import { Avatar, Steps, List, Tag, Card, Progress, Input, Icon, Button, Form } from 'antd'

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
    startDate: moment(),
  }
  render () {
    const { order } = this.props
    return (
      <Card title={<OrderSteps order={order} />}>
          <p style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.85)', marginBottom: 16, fontWeight: 500, }}>
            Due before: {moment(order.dueDate).fromNow()}
          </p>
          {order.status}
          <Card
            type="inner"
            title="Designer Info">
            {order.designers && order.designers.map((designer, i) => <Card.Grid style={{ width: '100%' }}>
              {designer.avatar ? <Avatar src={designer.avatar} /> : <Avatar icon="user" />}
              <Tag>{designer.name}</Tag> - <Tag>{designer.job}</Tag> - Assigned <Tag>{moment(designer.asignedDate).fromNow()}</Tag> <Button>Message</Button>
            </Card.Grid>)}
          </Card>
          <Card
            type="inner"
            title="Scan Files"
            extra={<a href="#">Upload</a>} >
            {order.scanFileUrls && order.scanFileUrls.map((scanFileUrl, i) => <Tag key={`scanFileUrl-${order.uid}-${i}`} color='geekblue'><a href={scanFileUrl}>{decodeURI(scanFileUrl && scanFileUrl.split('/').slice(-1)[0])}</a></Tag>)}
          </Card>
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="Design Files"
            extra={<a href="#">Upload</a>} >
            {order.designFileUrls && order.designFileUrls.map((designFileUrl, i) => <Tag key={`designFileUrl-${order.uid}-${i}`} color='gold'><a href={designFileUrl}>{decodeURI(designFileUrl && designFileUrl.split('/').slice(-1)[0])}</a></Tag>)}
          </Card>
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="Preferences"
            extra={<a href="#">Edit</a>}
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
        </Card>
    )
  }
}
