import React, { Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import './Styles.css'

import STLViewer from 'stl-viewer'

import PrescriptionForm from './PrescriptionForm'
import { Tabs, List, Tag, Input, Icon, Popconfirm, Progress, Card, Modal, notification, Button, Form } from 'antd'
import { openNotification, deleteProduct, toggleRenameCaseID, setType, setName, setDueTime, setDueDate, setNotes, setUnits, clearUnits, validateForm } from './actions/products'

const FormItem = Form.Item
const Search = Input.Search

const UploaderHeader = ({ name, setName, product, toggleRenameCaseID, idx }) =>
  product.renameCaseID ?
    <FormItem hasFeedback validateStatus={product.hasNameError}>
      <div style={{ lineHeight: 0, marginTop: '24px' }}>
        <div style={{ width: '100%', marginBottom: '12px', textAlign: 'center', fontSize: '14px' }}>Case Identifier</div>
        <Search
          placeholder='Identifier'
          style={{ width: 300, lineHeight: 0, fontSize: '12px' }}
          onSearch={value => setName(value, idx)}
          enterButton={<Icon type='check' />}
          defaultValue={product.name} />
      </div>
    </FormItem>
    : <div style={{ lineHeight: 0, marginTop: '24px', fontSize: '12px' }}>
        <div style={{ width: '100%', marginBottom: '12px', textAlign: 'center', fontSize: '14px' }}>Case Identifier</div>
        <b>{product.name}</b>
        <Button size='small' type="primary" onClick={() => toggleRenameCaseID(idx)} style={{marginLeft: '3px'}}><Icon type='edit' /></Button>
      </div>


const OrderPreviewDetails = ({ product, viewMore }) =>
  <Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="General" key="1">
      <List bordered>
        <List.Item>Restoration Type: {product.type || 'None selected'}</List.Item>
        <List.Item>Units: {product.units && product.units.length || 0}</List.Item>
        <List.Item>Tooth Numbers: {product.units && product.units.join(', ') || 'None selected'}</List.Item>
      </List>
    </Tabs.TabPane>
    <Tabs.TabPane tab="Notes" key="2">
      <List bordered>
        <List.Item>{product.notes ? 'Notes:' + product.notes : 'No notes'}</List.Item>
      </List>
    </Tabs.TabPane>
    {product.filename.indexOf('.stl') !== -1 ? <Tabs.TabPane tab="STL Preview" key="3">
      <STLViewer
        url={product.preview}
      	width={100}
      	height={100}
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
                    <div className='ant-card-head-title' style={{ display: 'flex', padding: 0, alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                      {product.renameCaseID ?
                        <FormItem hasFeedback validateStatus={product.hasNameError}>
                          <div style={{ lineHeight: 0, marginTop: '24px' }}>
                            <div style={{ width: '100%', marginBottom: '12px', textAlign: 'center', fontSize: '14px' }}>Case Identifier</div>
                            <Search
                              placeholder='Identifier'
                              style={{ width: 300, lineHeight: 0, fontSize: '12px' }}
                              onSearch={value => this.props.setName(value, idx)}
                              enterButton={<Icon type='check' />}
                              defaultValue={product.name} />
                          </div>
                        </FormItem>
                        : <div style={{ lineHeight: 0, marginTop: '24px', fontSize: '12px' }}>
                            <div style={{ width: '100%', marginBottom: '12px', textAlign: 'center', fontSize: '14px' }}>Case Identifier</div>
                            <b>{product.name}</b>
                            <Button size='small' type="primary" onClick={() => this.props.toggleRenameCaseID(idx)} style={{marginLeft: '3px'}}><Icon type='edit' /></Button>
                          </div>
                      }
                    </div>
                  </div>
                </div>
                <div className='ant-card-body'>
                  {this.props.isLoading ? <Progress style={{marginTop: '36px', marginLeft: '16px'}} percent={product.progress} />
                  : <OrderPreviewDetails product={product} viewMore={(e) => this.openModal(idx)} />}
                </div>
                <ul className='ant-card-actions'>
                  <li style={{ width: '33.3333%' }}>
                    <Button type='primary' icon='eye' onClick={(e) => this.openModal(idx)} />
                  </li>
                  <li style={{ width: '33.3333%' }}>
                    <Button shape="circle" icon="edit" onClick={(e) => this.openModal(idx)}  />
                  </li>
                  <li style={{ width: '33.3333%' }}>
                    {!this.props.isLoading && <Popconfirm title="Are you sure you want to remove this order?" placement="topRight"
                      onConfirm={(e) => this.props.deleteProduct(product.uid)} okText="Yes" cancelText="Cancel">
                        <Button shape="circle" icon="delete" type="danger" />
                      </Popconfirm>}
                  </li>
                </ul>
              </Card.Grid>
              <Modal
                title={<UploaderHeader {...this.props} product={product} idx={idx} />}
                visible={this.state.visible[idx]}
                onOk={() => this.hideModal(idx)}
                onCancel={() => this.hideModal(idx)}
                okText="Save"
                cancelText="Cancel"
                style={{ minWidth: '50%' }}
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
  setDueTime: (time, idx) => dispatch(setDueTime(time, idx)),
  setDueDate: (date, idx) => dispatch(setDueDate(date, idx)),
  clearUnits: (idx) => dispatch(clearUnits(idx)),
  deleteProduct: uid => dispatch(deleteProduct(uid)),
  validateForm: (products, token) => dispatch(validateForm(products, token)),
  toggleRenameCaseID: idx => dispatch(toggleRenameCaseID(idx)),
  openNotification: () => dispatch(openNotification()),
})

export default withRouter(Form.create()(connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadTable)))
