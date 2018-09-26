import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {DataTable} from 'primereact/components/datatable/DataTable';
import { DataViewLayoutOptions} from 'primereact/components/dataview/DataView';
import {Column} from 'primereact/components/column/Column'
import {InputText} from 'primereact/components/inputtext/InputText';
import {Dropdown} from 'primereact/components/dropdown/Dropdown';
import moment from 'moment'

import { Avatar, Tag, Spin, Modal, Icon, Button, Popconfirm } from 'antd';

import { fetchCases, reassignOrder, addDesignFile, addDesignNote } from './actions/cases'

import OrderDetails from './components/OrderDetails'

class OrdersView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],
            activeIndex: 0,
            cases: [],
            dataTableSelectValue: {},
        };
    }

    componentDidMount() {
        this.props.fetchCases(this.props.user.token)
    }
    selectionChange = (e) => {
      const uid = e.data.uid
      const allUids = this.props.cases.map(o => o.uid)
      const activeIndex = allUids.indexOf(uid)
      this.setState({ dataTableSelectValue: e.data, activeIndex, visible: true })
    }

    hideModal = (idx) => {
     this.setState({
       visible: false
     });
    }

    unitsCountTemplate = rowData => {
      return (
        rowData.units ? rowData.units.length : 0
      )
    }

    renderRestorationTypes = rowData => {
      if (rowData.isLoading) {
        return (
          <Spin />
        )
      }
      return (
        <Tag>{rowData.type}</Tag>
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
          title="Assign this case to a new designer?"
          placement="topRight"
          onConfirm={() => this.props.reassignOrder(rowData, this.props.user.token)}
          okText="Yes" cancelText="Cancel">
          <Button type="danger" icon="close" />
        </Popconfirm>;
    }

    scanFileTemplate = (rowData, column) => {
      if (rowData.scanFileUrls) {
        return rowData.scanFileUrls.map((scanFile, idx) => <Button key={`scanFileUrl-${rowData.uid}-${idx}`} href={scanFile} shape="circle" icon="download" />)
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
        if (lastNote.text) {
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
                        <DataTable value={this.props.cases} selectionMode="single" header="Assigned Orders" paginator={true} rows={10} sortField='status' sortOrder={-1}
                        responsive={true} selection={this.state.dataTableSelectValue} onSelectionChange={(e) => this.selectionChange(e)}>
                            <Column field="name" header="Order Identifier" sortable={true}/>
                            <Column field="type" header="Restoration Type" body={this.renderRestorationTypes} sortable={true}/>
                            <Column field="unitsView" header="Tooth #" sortable={true}/>
                            <Column body={this.unitsCountTemplate} header="Units" sortable={true}/>
                            <Column field="status" header="Status" sortable={true}/>
                            <Column body={this.dueByTemplate} field='dueDate' header="Due by" sortable={true} />
                            <Column body={this.notesTemplate} field="notes" header="Notes" sortable={true}/>
                            <Column field="cFileUrls" body={this.scanFileTemplate} header="Scan Files" sortable={true}/>
                            <Column field="designFileUrls" body={this.designFileTemplate} header="Design Files" sortable={true}/>
                            <Column body={this.actionTemplate} header="Reassign Order" style={{textAlign:'center', width: '6em'}}/>
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
                  <OrderDetails {...this.props} activeOrder={this.props.cases[this.state.activeIndex]} />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  cases: state.cases,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  fetchCases: token => dispatch(fetchCases(token)),
  addDesignFile: (file, order) => dispatch(addDesignFile(file, order)),
  addDesignNote: (note, order, user) => dispatch(addDesignNote(note, order, user)),
  reassignOrder: (order, token) => dispatch(reassignOrder(order, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersView)
