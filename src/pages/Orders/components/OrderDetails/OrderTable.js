import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import {DataTable} from 'primereact/components/datatable/DataTable';
import { DataViewLayoutOptions} from 'primereact/components/dataview/DataView';
import {Column} from 'primereact/components/column/Column'
import {InputText} from 'primereact/components/inputtext/InputText';
import {Dropdown} from 'primereact/components/dropdown/Dropdown';

import { Spin, Modal, Icon, Button, Popconfirm } from 'antd';

import { fetchOrders, cancelOrder } from './actions/orders'

import OrderDetails from './components/OrderDetails'

class OrdersTableView extends Component {

    constructor() {
        super();
        this.state = {
            orders: [],
            dataTableSelectValue: {}
        };
    }
    selectionChange = (e) => {
      this.setState({ dataTableSelectValue: e.data, visible: true })
    }

    hideModal = (idx) => {
     this.setState({
       visible: false
     });
    }

    actionTemplate = (rowData, column) => {
      if (rowData.isLoading) {
        return (
          <Spin />
        )
      }
      if (rowData.status === 'canceled') {
        return (
          <Button type="danger" disabled>
            <Icon type="close" />
          </Button>
        )
      }
      return <Popconfirm
          title="Are you sure you want to cancel this order?"
          placement="topRight"
          onConfirm={() => this.props.cancelOrder(rowData, this.props.user.token)}
          okText="Yes" cancelText="Cancel">
          <Button type="danger" icon="close" />
        </Popconfirm>;
    }

    caseFileTemplate = (rowData, column) => {
      if (rowData.caseFileUrls) {
        return rowData.caseFileUrls.map(caseFile => <Button key={`${Math.random()}`} href={caseFile} shape="circle" icon="download" />)
      } else {
        return null
      }
    }

    designFileTemplate = (rowData, column) => {
      if (rowData.designFileUrls) {
        return rowData.designFileUrls.map(designFile => <Button href={designFile} shape="circle" icon="inbox" />)
      } else {
        return null
      }
    }

    render(){
      if (!this.props.user.isAuthenticated) {
        return <Redirect to='/login' from='/' />
      }
        return (
            <div className="ui-g">
                <div className="ui-g-12">
                    <div className="card card-w-title">
                        <h1>Orders</h1>
                        <DataTable value={this.props.orders} header="Cases" paginator={true} rows={10}>
                            <Column field="name" header="Identifier" sortable={true}/>
                            <Column field="type" header="Restoration Type" sortable={true}/>
                            <Column field="unitsView" header="Tooth #" sortable={true}/>
                            <Column field="unitsCount" header="Units" sortable={true}/>
                            <Column field="status" header="Status" sortable={true}/>
                            <Column field="notes" header="Notes" sortable={true}/>
                            <Column body={this.caseFileTemplate} header="Scan Files" sortable={true}/>
                            <Column body={this.designFileTemplate} header="Design Files" sortable={true}/>
                            <Column body={this.actionTemplate} header="Cancel order" style={{textAlign:'center', width: '6em'}}/>
                        </DataTable>
                    </div>
                </div>
                <Modal
                  title={<div style={{ display: 'flex', flexDirection: 'row', fontSize: '12px' }}><div>Order ID: </div><b>{this.state.dataTableSelectValue.name}</b></div>}
                  visible={this.state.visible}
                  onOk={() => this.hideModal()}
                  onCancel={() => this.hideModal()}
                  okText="Done"
                  cancelText="Cancel"
                >
                  <OrderDetails {...this.props} order={this.state.dataTableSelectValue} />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  orders: state.orders,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: token => dispatch(fetchOrders(token)),
  cancelOrder: (order, token) => dispatch(cancelOrder(order, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTableView)
