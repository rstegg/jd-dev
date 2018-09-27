import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column'
import moment from 'moment'

import { Spin, Modal, Icon, Button, Popconfirm } from 'antd';

import { fetchOrders, cancelOrder, addExtraScanFile, addExtraNoteAdmin, setOrderPrefs, addExtraScanFileAdmin, addDesignFileAdmin, reassignOrderAdmin } from './actions/orders'

import OrderDetails from './components/OrderDetails'

class OrdersTableView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],
            activeIndex: 0,
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
      const uid = e.data.uid
      const allUids = this.props.orders.map(o => o.uid)
      const activeIndex = allUids.indexOf(uid)
      this.setState({ dataTableSelectValue: e.data, activeIndex, visible: true })
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
        <div>{order.type}</div>
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
      if (rowData.caseFileUrls) {
        return rowData.caseFileUrls.map((scanFile, idx) => <Button key={`scanFileUrl-${rowData.uid}-${idx}`} href={scanFile} shape="circle" icon="download" />)
      } else {
        return null
      }
    }

    designFileTemplate = (rowData, column) => {
      if (rowData.designFileUrls) {
        return rowData.designFileUrls.map((designFile, idx) => <Button key={`designFileUrl-${rowData.uid}-${idx}`} href={designFile} shape="circle" icon="inbox" />)
      } else {
        return null
      }
    }

    notesTemplate = (rowData, column) => {
      if (rowData.notes && rowData.notes.length) {
        const lastNote = rowData.notes[rowData.notes.length - 1]
        if (lastNote.text && lastNote.text.length) {
          return <div>{lastNote.user}: "{lastNote.text && lastNote.text.length > 15 ? lastNote.text.slice(0,15) + '...' : lastNote.text}"</div>
        }
        return null
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
                            <Column field="user.name" header="Full name" sortable={true}/>
                            <Column field="user.email" header="E-mail" sortable={true}/>
                            <Column field="name" header="Case Identifier" sortable={true}/>
                            <Column field="type" header="Restoration Type" body={this.renderRestorationTypes} sortable={true}/>
                            <Column field="unitsView" header="Tooth #" sortable={true}/>
                            <Column body={this.unitsCountTemplate} header="Units" sortable={true}/>
                            <Column field="status" header="Status" sortable={true}/>
                            <Column body={this.dueByTemplate} field='dueDate' header="Due by" sortable={true} />
                            <Column body={this.notesTemplate} field="notes" header="Notes" sortable={true}/>
                            <Column field="caseFileUrls" body={this.scanFileTemplate} header="Scan Files" sortable={true}/>
                            <Column field="designFileUrls" body={this.designFileTemplate} header="Design Files" sortable={true}/>
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
                  <OrderDetails {...this.props} order={this.props.orders[this.state.activeIndex]} />
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
  addExtraScanFile: (file, order) => dispatch(addExtraScanFile(file, order)),
  addExtraNoteAdmin: (note, order, user) => dispatch(addExtraNoteAdmin(note, order, user)),
  setOrderPrefs: (prefs, order, token) => dispatch(setOrderPrefs(prefs, order, token)),
  cancelOrder: (order, token) => dispatch(cancelOrder(order, token)),
  addExtraScanFileAdmin: (file, order) => dispatch(addExtraScanFileAdmin(file, order)),
  addDesignFileAdmin: (file, order) => dispatch(addDesignFileAdmin(file, order)),
  reassignOrderAdmin: (order, token) => dispatch(reassignOrderAdmin(order, token)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrdersTableView))
