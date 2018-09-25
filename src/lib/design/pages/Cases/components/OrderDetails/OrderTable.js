import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import {DataTable} from 'primereact/components/datatable/DataTable';
import { DataViewLayoutOptions} from 'primereact/components/dataview/DataView';
import {Column} from 'primereact/components/column/Column'
import {InputText} from 'primereact/components/inputtext/InputText';
import {Dropdown} from 'primereact/components/dropdown/Dropdown';

import { Spin, Modal, Icon, Button, Popconfirm } from 'antd';

import { fetchCases, cancelCase } from './actions/cases'

import CaseDetails from './components/CaseDetails'

class CasesTableView extends Component {

    constructor() {
        super();
        this.state = {
            cases: [],
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
          title="Are you sure you want to cancel this c?"
          placement="topRight"
          onConfirm={() => this.props.cancelCase(rowData, this.props.user.token)}
          okText="Yes" cancelText="Cancel">
          <Button type="danger" icon="close" />
        </Popconfirm>;
    }

    scanFileTemplate = (rowData, column) => {
      if (rowData.cFileUrls) {
        return rowData.cFileUrls.map(scanFile => <Button key={`${Math.random()}`} href={scanFile} shape="circle" icon="download" />)
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
                        <h1>Cases</h1>
                        <DataTable value={this.props.cases} header="Scans" paginator={true} rows={10}>
                            <Column field="name" header="Identifier" sortable={true}/>
                            <Column field="type" header="Restoration Type" sortable={true}/>
                            <Column field="unitsView" header="Tooth #" sortable={true}/>
                            <Column field="unitsCount" header="Units" sortable={true}/>
                            <Column field="status" header="Status" sortable={true}/>
                            <Column field="notes" header="Notes" sortable={true}/>
                            <Column body={this.scanFileTemplate} header="Scan Files" sortable={true}/>
                            <Column body={this.designFileTemplate} header="Design Files" sortable={true}/>
                            <Column body={this.actionTemplate} header="Cancel c" style={{textAlign:'center', width: '6em'}}/>
                        </DataTable>
                    </div>
                </div>
                <Modal
                  title={<div style={{ display: 'flex', flexDirection: 'row', fontSize: '12px' }}><div>Case ID: </div><b>{this.state.dataTableSelectValue.name}</b></div>}
                  visible={this.state.visible}
                  onOk={() => this.hideModal()}
                  onCancel={() => this.hideModal()}
                  okText="Done"
                  cancelText="Cancel"
                >
                  <CaseDetails {...this.props} activeCase={this.state.dataTableSelectValue} />
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
  cancelCase: (c, token) => dispatch(cancelCase(c, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(CasesTableView)
