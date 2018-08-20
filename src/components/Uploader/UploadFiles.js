import React, { Component} from 'react'
import { connect } from 'react-redux'
import './Styles.css'

import SelectSearch from './SelectSearch'
import DentalPicker from '../DentalPicker/Picker'
import { Progress, Input, notification, Icon, Button, Form, Table } from 'antd'
import { openNotification, deleteProduct, toggleRenameCaseID, setType, setName, setNotes, setUnits, clearUnits, validateForm } from './actions/products'

const { Column } = Table
const { Search, TextArea } = Input
const FormItem = Form.Item

class UploadTable extends Component {
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
  render() {
    return (
        <Form onSubmit={this.handleSubmit}>
          <Table dataSource={this.props.products} rowKey='index' showHeader={false} pagination={false}
            rowClassName={((_, idx) => idx % 2 ? 'ant-table-row ant-table-row-level-0' : 'ant-table-row ant-table-row-level-1' )}>
            <Column dataIndex='preview' key='preview'
              render={(_, product, idx) =>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              {this.props.isLoading ? <Progress style={{marginTop: '36px', marginLeft: '16px'}} percent={product.progress} />
              : <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px'}}>
                {product.renameCaseID ?
                  <FormItem hasFeedback validateStatus={product.hasNameError}>
                    <div style={{ lineHeight: 0, marginTop: '24px' }}>
                      <div style={{ width: '100%', marginBottom: '12px', textAlign: 'center' }}>Case ID</div>
                      <Search
                        placeholder='Case ID'
                        style={{ width: 300, lineHeight: 0 }}
                        onSearch={value => this.props.setName(value, idx)}
                        enterButton={<Icon type='check' />}
                        defaultValue={product.name} />
                    </div>
                  </FormItem>
                  : <div style={{ lineHeight: 0, marginTop: '24px' }}>
                      <div style={{ width: '100%', marginBottom: '12px', textAlign: 'center' }}>Case ID</div>
                      <b>{product.name}</b>
                      <Button size='small' type="primary" onClick={() => this.props.toggleRenameCaseID(idx)} style={{marginLeft: '3px'}}><Icon type='edit' /></Button>
                    </div>
                }
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '36px'}}>
                  <FormItem hasFeedback validateStatus={product.hasUnitError}>
                    <DentalPicker idx={idx} product={product} setUnits={this.props.setUnits} clearUnits={this.props.clearUnits} />
                  </FormItem>
                  <div style={{display: 'flex', flexDirection: 'column', marginLeft: '50px'}}>
                    <FormItem hasFeedback validateStatus={product.hasTypeError}>
                      <div style={{ lineHeight: 0, marginTop: '24px' }}>
                        <div style={{ width: '100%', marginBottom: '12px' }}>Type of Restore</div>
                        <SelectSearch
                          label='Restoration type'
                          options={this.props.productTypes}
                          style={{ width: 200, marginRight: '16px' }}
                          onChange={value => this.props.setType(value, idx)}
                          value={product.type} />
                      </div>
                    </FormItem>
                      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <FormItem>
                          <div style={{ lineHeight: 0, marginTop: '24px' }}>
                            <div style={{ width: '100%', marginBottom: '12px' }}>Design Notes</div>
                            <TextArea
                              label='Design Notes'
                              style={{ width: 200, marginRight: '16px' }}
                              onChange={e => this.props.setNotes(e.target.value, idx)}
                              value={product.notes} />
                          </div>
                        </FormItem>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {!this.props.isLoading && <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', marginTop: '24px'}}>
                <Button shape="circle" icon="delete" onClick={() => this.props.deleteProduct(idx)} />
              </div>}
            </div>
            }
          />
      </Table>
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
