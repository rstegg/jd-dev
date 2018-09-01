import React, { Component} from 'react'

import { List, Tag, Card, Progress, Input, Icon, Button, Form } from 'antd'

import moment from 'moment'

import './Styles.css'

const { Search, TextArea } = Input
const FormItem = Form.Item

export default class PrescriptionForm extends Component {
  state = {
    startDate: moment(),
  }
  render () {
    const { order } = this.props
    const percentage_complete = (moment() - moment(order.createdAt)) / (moment(order.dueDate) - moment(order.createdAt)) * 100;
    const percentage_rounded = Math.abs(Math.round(percentage_complete * 100) / 100);
    return (
      <Card title={<Progress percent={percentage_rounded} />}>
          <p style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.85)', marginBottom: 16, fontWeight: 500, }}>
            Due before: {moment(order.dueDate).fromNow()}
          </p>
          {order.status}
          <Card
            type="inner"
            title="Designer Info">
            {order.designers && order.designers.map((designer, i) => <Card.Grid style={{ width: '100%' }}>
              {designer.name} - {designer.job} - {designer.asignedDate} <Button>Message</Button>
            </Card.Grid>)}
          </Card>
          <Card
            type="inner"
            title="Case Files"
            extra={<a href="#">Upload</a>} >
            {order.caseFileUrls && order.caseFileUrls.map((caseFileUrl, i) => <Tag key={`caseFileUrl-${order.uid}-${i}`} color='geekblue'><a href={caseFileUrl}>{decodeURI(caseFileUrl && caseFileUrl.split('/').slice(-1)[0])}</a></Tag>)}
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
