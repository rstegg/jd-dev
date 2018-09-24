import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter, Redirect } from 'react-router-dom'
import { Panel } from 'primereact/components/panel/Panel';
import { Drawer, Spin, Button, Modal, Icon } from 'antd'
import { reset, submit } from 'redux-form'

import { resetCreateUser, fetchAdminDashboard } from './actions'
import CreateUser from './components/CreateUser'

class Dashboard extends Component {
  state = {
    createUserVisible: false,
    createUserLoading: false,
    adminDrawerVisible: false,
  }
  componentWillMount = () => {
    this.props.fetchAdminDashboard(this.props.user.token)
  }
  componentWillUpdate = (nextProps) => {
    if (!this.props.admin.createUserLoading && nextProps.admin.createUserLoading) {
      this.setState({ createUserLoading: true })
    }
    if (this.props.admin.createUserLoading && !nextProps.admin.createUserLoading) {
      this.setState({ createUserLoading: false })
    }
    if (!this.props.admin.createUserSuccess && nextProps.admin.createUserSuccess) {
      this.setState({ createUserVisible: false, createUserLoading: false })
      this.props.resetCreateNewUserForm()
      this.props.resetCreateUser()
    }
  }

  createNewUser = () => {
    this.props.createNewUser()
  }

  hideCreateUserModal = () => {
    this.setState({ createUserVisible: false })
  }

  openCreateUserModal = () => {
    this.setState({ createUserVisible: true })
  }
  showAdminDrawer = () => {
    this.setState({ adminDrawerVisible: true })
  }
  hideAdminDrawer = () => {
    this.setState({ adminDrawerVisible: false })
  }

    render() {
      if (!this.props.user.isAuthenticated) {
        return <Redirect to='/login' from='/' />
      }
      const { admin } = this.props
        return (
          <div>
            <Button icon='user-add' onClick={() => this.openCreateUserModal()} type='dashed'>Create a New User</Button>
            <div className="ui-g ui-fluid dashboard">
              <div className="ui-g-12 ui-md-6 ui-lg-3">
                  <div className="highlight-box">
                      <div className="initials" style={{backgroundColor:'#ef6262',color:'#a83d3b'}}>
                        <Icon type="user" />
                      </div>
                      <div className="card">
                          <span className="fa fa-user"/>
                          <span> Users</span>
                          <span className="count">{admin.userCount || 0}</span>
                      </div>
                  </div>
              </div>
              <div className="ui-g-12 ui-md-6 ui-lg-3">
                  <div className="highlight-box">
                      <div className="initials" style={{backgroundColor:'#20d077',color:'#038d4a'}}>
                        <Icon type="tags" />
                      </div>
                      <div className="card">
                          <span className="fa fa-tags"/>
                          <span> Orders</span>
                          <span className="count">{admin.orderCount || 0}</span>
                      </div>
                  </div>
              </div>
              <div className="ui-g-12 ui-md-6 ui-lg-3">
                  <div className="highlight-box">
                      <div className="initials" style={{backgroundColor:'#f9c851',color:'#b58c2b'}}>
                        <Icon type="coffee" />
                      </div>
                      <div className="card">
                          <span className="fa fa-coffee"/>
                          <span> Designers</span>
                          <span className="count">{admin.designerCount || 0}</span>
                      </div>
                  </div>
              </div>
              <div className="ui-g-12 ui-md-6 ui-lg-3">
                  <div className="highlight-box">
                      <div className="initials" style={{backgroundColor:'#007be5',color:'#00448f'}}>
                        <Icon type="rocket" />
                      </div>
                      <div className="card">
                          <span className="fa fa-rocket"/>
                          <span> Completed</span>
                          <span className="count">{admin.finishedOrderCount || 0}</span>
                      </div>
                  </div>
              </div>

              <Modal
                style={{ minWidth: '50%' }}
                title='Create a user'
                visible={this.state.createUserVisible}
                onOk={() => this.createNewUser()}
                onCancel={() => this.hideCreateUserModal()}
                okText="Done"
                cancelText="Cancel"
              >
                { this.state.createUserLoading ? <Spin />
                  : <CreateUser /> }
              </Modal>
          </div>
        </div>
      )
    }
}

const mapStateToProps = ({ user, admin }) => ({ user, admin })

const mapDispatchToProps = dispatch => ({
  createNewUser: () => dispatch(submit('createUser')),
  resetCreateNewUserForm: () => dispatch(reset('createUser')),
  resetCreateUser: () => dispatch(resetCreateUser()),
  fetchAdminDashboard: (token) => dispatch(fetchAdminDashboard(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
