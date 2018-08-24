import React, { Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import './Styles.css'

import PrescriptionForm from './PrescriptionForm'
import { Progress, Card, Modal, notification, Button, Form } from 'antd'
import { openNotification, deleteProduct, toggleRenameCaseID, setType, setName, setNotes, setUnits, clearUnits, validateForm } from './actions/products'

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
              <Card.Grid style={{ width: '25%', textAlign: 'center', cursor: 'pointer',  }} onClick={() => this.openModal(idx)}>
                {product.name}
                {!this.props.isLoading && <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', marginTop: '24px'}}>
                  <Button shape="circle" icon="delete" onClick={() => this.props.deleteProduct(idx)} />
                </div>}
                {this.props.isLoading && <Progress style={{marginTop: '36px', marginLeft: '16px'}} percent={product.progress} />}
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
