import React, { Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import './Styles.css'

import STLViewer from 'stl-viewer'


import PrescriptionForm from './PrescriptionForm'
import { Tabs, Tag, Popconfirm, Progress, Card, Modal, notification, Button, Form } from 'antd'
import { openNotification, deleteProduct, toggleRenameCaseID, setType, setName, setNotes, setUnits, clearUnits, validateForm } from './actions/products'

const OrderPreviewDetails = ({ product, viewMore }) =>
  <Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="General" key="1">
      <ul>
        <li>Filename: {product.file.name}</li>
        <li>Restoration Type: {product.type || 'None selected'}</li>
        <li>{product.type || 'None selected'}</li>
      </ul>
    </Tabs.TabPane>
    <Tabs.TabPane tab="General 2" key="2">Content of Tab Pane 2</Tabs.TabPane>
    {product.file.name.indexOf('.stl') !== -1 ? <Tabs.TabPane tab="STL Preview" key="3">
      <STLViewer
        url='http://www.example.com/example-url.stl'
      	width={400}
      	height={400}
      	modelColor='#B92C2C'
      	backgroundColor='#EAEAEA'
      	rotate={true}
      	orbitControls={true} />
    </Tabs.TabPane>
    : null }
  </Tabs>

class UploadTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: {}
    }
  }
  openNotify = () => {
    notification.error({
      message: 'Form fields empty',
      description: 'You still have some form fields that need to be filled out.',
    });
    this.props.openNotification()
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.validateForm(this.props.products, this.props.token)
  }
  openModal(idx) {
    this.setState({
      visible: {
        ...this.state.visible,
        [idx]: true
      }
    });
  }
  hideModal = (idx) => {
   this.setState({
     visible: {
       ...this.state.visible,
       [idx]: false
     }
   });
 }

  render() {
    return (
        <Form onSubmit={this.handleSubmit}>
          <Card title="Orders">
          { this.props.products.map((product, idx) => (
            <div key={`case-${idx}`}>
              <Card.Grid style={{ width: '25%', textAlign: 'center' }}>
                <div className='ant-card-head' style={{padding: 0, overflow: 'none' }}>
                  <div className='ant-card-head-wrapper' style={{padding: 0 }}>
                    <div className='ant-card-head-title' style={{ display: 'flex', padding: 0, alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: '12px' }}>{product.name}</div>
                      <Button.Group>
                        <Button type='primary' icon='eye' onClick={(e) => this.openModal(idx)} />
                        <Button shape="circle" icon="edit" onClick={(e) => this.openModal(idx)}  />
                      {!this.props.isLoading && <Popconfirm onClick={(e) => e.stopPropagation()}
                          title="Are you sure you want to cancel this order?"
                          placement="topRight"
                          onConfirm={(e) => e.stopPropagation() && this.props.deleteProduct(idx)}
                          okText="Yes" cancelText="Cancel">
                          <Button shape="circle" icon="delete" type="danger"  />
                        </Popconfirm>}
                      </Button.Group>
                    </div>
                  </div>
                </div>
                <div className='ant-card-body'>
                  {this.props.isLoading ? <Progress style={{marginTop: '36px', marginLeft: '16px'}} percent={product.progress} />
                  : <OrderPreviewDetails product={product} viewMore={(e) => this.openModal(idx)} />}
                </div>
              </Card.Grid>
              <Modal
                title={product.name}
                visible={this.state.visible[idx]}
                onOk={() => this.hideModal(idx)}
                onCancel={() => this.hideModal(idx)}
                okText="Save"
                cancelText="Cancel"
              >
                <PrescriptionForm {...this.props} product={product} idx={idx} />
              </Modal>
            </div>
          ))}
        </Card>
      {this.props.errors && this.props.errors.length ? this.openNotify() : null}
      <Button type='primary' loading={this.props.isLoading} htmlType='submit' style={{marginTop: '24px'}} block>Upload</Button>
    </Form>
    )
  }
}

const mapStateToProps = ({ user, redirects }) => ({
  token: user.token,
  isLoading: redirects.isLoading
})

const mapDispatchToProps = dispatch => ({
  setType: (type, idx) => dispatch(setType(type, idx)),
  setName: (name, idx) => dispatch(setName(name, idx)),
  setNotes: (notes, idx) => dispatch(setNotes(notes, idx)),
  setUnits: (units, idx) => dispatch(setUnits(units, idx)),
  clearUnits: (idx) => dispatch(clearUnits(idx)),
  deleteProduct: idx => dispatch(deleteProduct(idx)),
  validateForm: (products, token) => dispatch(validateForm(products, token)),
  toggleRenameCaseID: idx => dispatch(toggleRenameCaseID(idx)),
  openNotification: () => dispatch(openNotification()),
})

export default withRouter(Form.create()(connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadTable)))
