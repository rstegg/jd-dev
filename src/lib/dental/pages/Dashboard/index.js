import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom'
import { Panel } from 'primereact/components/panel/Panel';
import Uploader from './components/Uploader/Uploader';
import { Icon } from 'antd'

import { redirectToOrders, fetchDashboard } from './actions'

class Dashboard extends Component {
    componentWillMount = () => {
      this.props.fetchDashboard(this.props.user.token)
    }
    componentDidUpdate = () => {
      if (this.props.redirects.shouldRedirect) {
        this.props.redirectToOrders()
      }
    }
    render() {
      if (!this.props.user.isAuthenticated) {
        return <Redirect to='/login' from='/' />
      }
      if (this.props.redirects.shouldRedirect) {
        return <Redirect to='/orders' from='/' />
      }
      const { dashboard } = this.props
        return (
          <div className="ui-g ui-fluid dashboard">
            <div className="ui-g-12 ui-md-6 ui-lg-3">
                <div className="highlight-box">
                    <div className="initials" style={{backgroundColor:'#ef6262',color:'#a83d3b'}}>
                      <Icon type="double-right" />
                    </div>
                    <div className="card">
                        <span className="fa fa-chevron-right"/>
                        <span> In Process</span>
                        <span className="count">{dashboard.processedOrders || 0}</span>
                    </div>
                </div>
            </div>
            <div className="ui-g-12 ui-md-6 ui-lg-3">
                <div className="highlight-box">
                    <div className="initials" style={{backgroundColor:'#20d077',color:'#038d4a'}}>
                      <Icon type="close" />
                    </div>
                    <div className="card">
                        <span className="fa fa-close"/>
                        <span> Canceled</span>
                        <span className="count">{dashboard.canceledOrders || 0}</span>
                    </div>
                </div>
            </div>
            <div className="ui-g-12 ui-md-6 ui-lg-3">
                <div className="highlight-box">
                    <div className="initials" style={{backgroundColor:'#f9c851',color:'#b58c2b'}}>
                      <Icon type="swap" />
                    </div>
                    <div className="card">
                        <span className="fa fa-check"/>
                        <span> Completed</span>
                        <span className="count">{dashboard.completedOrders || 0}</span>
                    </div>
                </div>
            </div>
            <div className="ui-g-12 ui-md-6 ui-lg-3">
                <div className="highlight-box">
                    <div className="initials" style={{backgroundColor:'#007be5',color:'#00448f'}}>
                      <Icon type="tags" />
                    </div>
                    <div className="card">
                        <span className="fa fa-tags"/>
                        <span> Total New</span>
                        <span className="count">{dashboard.newOrders || 0}</span>
                    </div>
                </div>
            </div>
            <div className="ui-g-12 ui-md-12 ui-lg-12">
              <Panel style={{height: '100%'}}>
                  <Uploader />
              </Panel>
            </div>
        </div>
      )
    }
}

const mapStateToProps = ({ user, redirects, dashboard }) => ({ user, redirects, dashboard })

const mapDispatchToProps = dispatch => ({
  fetchDashboard: (token) => dispatch(fetchDashboard(token)),
  redirectToOrders: () => dispatch(redirectToOrders())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
