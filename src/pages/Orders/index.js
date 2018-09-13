import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import {DataTable} from 'primereact/components/datatable/DataTable';
import { DataViewLayoutOptions} from 'primereact/components/dataview/DataView';
import {Column} from 'primereact/components/column/Column'
import {InputText} from 'primereact/components/inputtext/InputText';
import {Dropdown} from 'primereact/components/dropdown/Dropdown';
import moment from 'moment'

import { Tag, Spin, Modal, Icon, Button, Popconfirm } from 'antd';

import { fetchOrders, cancelOrder } from './actions/orders'

import OrderDetails from './components/OrderDetails'

class OrdersView extends Component {

    constructor() {
        super();
        this.state = {
            dataTableValue: [],
            treeData: [],
            treeTableData: [],
            picklistSourceCars: [],
            picklistTargetCars: [],
            orderlistCars: [],
            scheduleEvents: [],
            orders: [],
            dataTableSelectValue: {},
            organizationSelect: null
        };
    }

    componentDidMount() {
        this.props.fetchOrders(this.props.user.token)
    }
    selectionChange = (e) => {
      this.setState({ dataTableSelectValue: e.data, visible: true })
    }

    hideModal = (idx) => {
     this.setState({
       visible: false
     });
    }

    unitsCountTemplate = (order) => {
      return (
        order.units ? order.units.length : 0
      )
    }

    renderRestorationTypes = (order) => {
      if (order.isLoading) {
        return (
          <Spin />
        )
      }
      return (
        <Tag>{order.type}</Tag>
      )
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

    scanFileTemplate = (rowData, column) => {
      if (rowData.scanFileUrls) {
        return rowData.scanFileUrls.map(scanFile => <Button key={`${Math.random()}`} href={scanFile} shape="circle" icon="download" />)
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

    dueByTemplate = (rowData, column) => {
      return moment(rowData.dueDate).fromNow()
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
                        <DataTable value={this.props.orders} selectionMode="single" header="Orders" paginator={true} rows={10} sortField='status' sortOrder={-1}
                        responsive={true} selection={this.state.dataTableSelectValue} onSelectionChange={(e) => this.selectionChange(e)}>
                            <Column field="name" header="Scan Identifier" sortable={true}/>
                            <Column field="type" header="Restoration Type" body={this.renderRestorationTypes} sortable={true}/>
                            <Column field="unitsView" header="Tooth #" sortable={true}/>
                            <Column body={this.unitsCountTemplate} header="Units" sortable={true}/>
                            <Column field="status" header="Status" sortable={true}/>
                            <Column body={this.dueByTemplate} field='dueBy' header="Due by" sortable={true} />
                            <Column field="notes" header="Notes" sortable={true}/>
                            <Column body={this.scanFileTemplate} header="Scan Files" sortable={true}/>
                            <Column body={this.designFileTemplate} header="Design Files" sortable={true}/>
                            <Column body={this.actionTemplate} header="Cancel order" style={{textAlign:'center', width: '6em'}}/>
                        </DataTable>
                    </div>
                </div>
                <Modal
                  style={{ minWidth: '50%' }}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrdersView))
