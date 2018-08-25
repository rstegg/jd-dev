import React, { Component} from 'react'

import { List, Tag, Card, Progress, Input, Icon, Button, Form } from 'antd'

import './Styles.css'

const { Search, TextArea } = Input
const FormItem = Form.Item

export default class PrescriptionForm extends Component {
  render () {
    const { order } = this.props
    return (
      <Card title={order.status}>
          <p style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.85)', marginBottom: 16, fontWeight: 500, }}>
            {order.status}
          </p>
          <Card
            type="inner"
            title="Case Files"
            extra={<a href="#">Upload</a>}
          >
            {order.caseFileUrls && order.caseFileUrls.map((caseFileUrl, i) => <Tag key={`caseFileUrl-${order.uid}-${i}`} color='geekblue'><a href={caseFileUrl}>{decodeURI(caseFileUrl.split('/').slice(-1)[0])}</a></Tag>)}
          </Card>
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="Design Files"
            extra={<a href="#">Upload</a>}
          >
            {order.designFileUrls && order.designFileUrls.map((designFileUrl, i) => <Tag key={`designFileUrl-${order.uid}-${i}`} color='gold'><a href={designFileUrl}>{decodeURI(designFileUrl.split('/').slice(-1)[0])}</a></Tag>)}
          </Card>
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="Preferences"
            extra={<a href="#">Edit</a>}
          >
            <List bordered grid={{ gutter: 8, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 2 }} style={{fontSize: '6pt'}}>
              <List.Item>
                <Card title='Contact'>
                  {order.contact}
                </Card>
              </List.Item>
              <List.Item>
                <Card title='Occlusion'>
                  {order.occlusion}
                </Card>
              </List.Item>
              <List.Item>
                <Card title='Pontic'>
                  {order.pontic}
                </Card>
              </List.Item>
              <List.Item>
                <Card title='Liner Spacer'>
                  {order.linerSpacer}
                </Card>
              </List.Item>
            </List>
          </Card>
        </Card>
    )
  }
}
