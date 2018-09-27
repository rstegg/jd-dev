import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column'
import moment from 'moment'

import { Avatar, Spin, Modal, Icon, Button, Popconfirm } from 'antd';

import { fetchUsers, banUser, unbanUser } from './actions/users'

import UserDetails from './components/UserDetails'

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
            users: [],
            dataTableSelectValue: {},
            organizationSelect: null
        };
    }

    componentDidMount() {
        this.props.fetchUsers(this.props.user.token)
    }
    selectionChange = (e) => {
      const uid = e.data.uid
      const allUids = this.props.admin.users.map(o => o.uid)
      const activeIndex = allUids.indexOf(uid)
      this.setState({ dataTableSelectValue: e.data, activeIndex, visible: true })
    }

    hideModal = (idx) => {
     this.setState({
       visible: false
     });
    }

    avatarTemplate = (user) => {
      if (user.isLoading) {
        return (
          <Spin />
        )
      }
      if (user.image) {
        return <Avatar src={user.image} />
      }
      return <Avatar icon='user' />
    }

    actionTemplate = (rowData, column) => {
      if (rowData.isLoading) {
        return (
          <Spin />
        )
      }
      if (rowData.disabled) {
        return (
          <Popconfirm
            title="Are you sure you want to unban this user?"
            placement="topRight"
            onConfirm={() => this.props.unbanUser(rowData, this.props.user.token)}
            okText="Yes" cancelText="Cancel">
            <Button type="success" icon="reload" />
          </Popconfirm>
        )
      }
      return <Popconfirm
          title="Are you sure you want to ban this user?"
          placement="topRight"
          onConfirm={() => this.props.banUser(rowData, this.props.user.token)}
          okText="Yes" cancelText="Cancel">
          <Button type="danger" icon="close" />
        </Popconfirm>;
    }

    disabledTemplate = (rowData) => {
      if (rowData.disabled) {
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><Icon type="stop" />Banned</div>
        )
      }
      return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><Icon type="check-circle" />Active</div>
    }

    render(){
      if (!this.props.user.isAuthenticated) {
        return <Redirect to='/login' from='/' />
      }
        return (
            <div className="ui-g">
                <div className="ui-g-12">
                    <div className="card card-w-title">
                        <h1>Users</h1>
                        <DataTable value={this.props.admin.users} selectionMode="single" header="Users" paginator={true} rows={10} sortField='status' sortOrder={-1}
                        responsive={true} selection={this.state.dataTableSelectValue} onSelectionChange={(e) => this.selectionChange(e)}>
                            <Column body={this.avatarTemplate} field='image' header="Avatar" sortable={true} />
                            <Column field="name" header="Name" sortable={true}/>
                            <Column field="email" header="E-mail" sortable={true}/>
                            <Column field="userType" header="User type" sortable={true}/>
                            <Column field="uid" header="Unique ID" sortable={true}/>
                            <Column body={this.disabledTemplate} field="disabled" header="Status" sortable={true}/>
                            <Column body={this.actionTemplate} header="Ban user" style={{textAlign:'center', width: '6em'}}/>
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
                  <UserDetails {...this.props} user={this.props.admin.users ? this.props.admin.users[this.state.activeIndex] : null} admin={this.props.user} />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({ user, admin }) => ({ user, admin })

const mapDispatchToProps = dispatch => ({
  fetchUsers: token => dispatch(fetchUsers(token)),
  banUser: (user, token) => dispatch(banUser(user, token)),
  unbanUser: (user, token) => dispatch(unbanUser(user, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTableView)
