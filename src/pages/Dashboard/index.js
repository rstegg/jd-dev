import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Panel } from 'primereact/components/panel/Panel';
import Uploader from './components/Uploader/Uploader';

class Dashboard extends Component {
    render() {
      if (!this.props.user.isAuthenticated) {
        return <Redirect to='/login' from='/' />
      }
        return (
          <div className="ui-g ui-fluid dashboard">
            <div className="ui-g-12 ui-md-4">
                <div className="card clearfix summary">
                    <span className="title">Users</span>
                    <span className="detail">Number of visitors</span>
                    <span className="count visitors">12</span>
                </div>
            </div>
            <div className="ui-g-12 ui-md-4">
                <div className="card clearfix summary">
                    <span className="title">Sales</span>
                    <span className="detail">Number of purchases</span>
                    <span className="count purchases">534</span>
                </div>
            </div>
            <div className="ui-g-12 ui-md-4">
                <div className="card clearfix summary">
                    <span className="title">Revenue</span>
                    <span className="detail">Income for today</span>
                    <span className="count revenue">$3,200</span>
                </div>
            </div>

            <div className="ui-g-12 ui-md-6 ui-lg-3">
                <div className="highlight-box">
                    <div className="initials" style={{backgroundColor:'#007be5',color:'#00448f'}}>TV</div>
                    <div className="card">
                        <span className="fa fa-eye"/>
                        <span>Total Views</span>
                        <span className="count">523</span>
                    </div>
                </div>
            </div>
            <div className="ui-g-12 ui-md-6 ui-lg-3">
                <div className="highlight-box">
                    <div className="initials" style={{backgroundColor:'#ef6262',color:'#a83d3b'}}>TI</div>
                    <div className="card">
                        <span className="fa fa-question-circle"/>
                        <span>Total Issues</span>
                        <span className="count">81</span>
                    </div>
                </div>
            </div>
            <div className="ui-g-12 ui-md-6 ui-lg-3">
                <div className="highlight-box">
                    <div className="initials" style={{backgroundColor:'#20d077',color:'#038d4a'}}>OI</div>
                    <div className="card">
                        <span className="fa fa-question-circle-o"/>
                        <span>Open Issues</span>
                        <span className="count">21</span>
                    </div>
                </div>
            </div>
            <div className="ui-g-12 ui-md-6 ui-lg-3">
                <div className="highlight-box">
                    <div className="initials" style={{backgroundColor:'#f9c851',color:'#b58c2b'}}>CI</div>
                    <div className="card">
                        <span className="fa fa-check"/>
                        <span>Closed Issues</span>
                        <span className="count">60</span>
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

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(Dashboard)
