import React, { Component} from 'react'
import { connect } from 'react-redux'
import './Styles.css'

import PrescriptionForm from './PrescriptionForm'
import { Card, Modal, notification, Button, Form } from 'antd'
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
      description: 'You still have some form fields that need to be filled out.  Try filling out your forms and then click "Blast off" again.',
    });
    this.props.openNotification()
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.validateForm(this.props.products, this.props.options)
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
          <Card title="Card title">
          { this.props.products.map((product, idx) => (
            <div key={`case-${idx}`}>
              <Card.Grid style={{ width: '25%', textAlign: 'center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => this.openModal(idx)}>{product.name}</Card.Grid>
              <Modal
                title="Modal"
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

const mapStateToProps = state => ({  })

const mapDispatchToProps = dispatch => ({
  setType: (type, idx) => dispatch(setType(type, idx)),
  setName: (name, idx) => dispatch(setName(name, idx)),
  setNotes: (notes, idx) => dispatch(setNotes(notes, idx)),
  setUnits: (units, idx) => dispatch(setUnits(units, idx)),
  clearUnits: (idx) => dispatch(clearUnits(idx)),
  deleteProduct: idx => dispatch(deleteProduct(idx)),
  validateForm: (products, options) => dispatch(validateForm(products, options)),
  toggleRenameCaseID: idx => dispatch(toggleRenameCaseID(idx)),
  openNotification: () => dispatch(openNotification()),
})

export default Form.create()(connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadTable))
