import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, notification } from 'antd'

import { prop, head } from 'ramda'

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';

import Login from './auth/pages/Login';
import Signup from './auth/pages/Signup';
import Forgot from './auth/pages/Forgot';
import Reset from './auth/pages/Reset';
import LibRouter from './lib/Router';

import { joinRoom, removeNotification, socketDisconnect } from './actions'

import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.css';
import 'antd/dist/antd.css'
import './App.css';
import './layout/layout.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.props.socket.on('disconnect', () => {
      this.props.socketDisconnect(this.props.user.token)
    })
  }
  componentWillMount() {
    if (this.props.user.token) {
      this.props.joinRoom(this.props.user.uid, this.props.user.token)
    }
  }
  componentWillUpdate(nextProps) {
    if (!this.props.user.token && nextProps.user.token) {
      this.props.joinRoom(nextProps.user.uid, nextProps.user.token)
    }

    if (!this.props.notifications.length && nextProps.notifications.length) {

      const key = prop('uid', head(this.props.notifications))

      const btn = (
        <Button type="primary" size="small" onClick={() => { console.log(this.props) }}>
          View Order
        </Button>
      );

      notification.open({
        message: 'Assigned new order',
        description: 'You have been assigned a new order.',
        btn,
        key,
      })

      this.props.removeNotification(key)
    }
  }

  render() {
      return (
          <div className='layout-wrapper'>
              <AppTopbar />
              <div className="layout-main">
                <Switch>
                  <Route path="/login" exact component={Login} />
                  <Route path="/signup" exact component={Signup} />
                  <Route path="/forgot" exact component={Forgot} />
                  <Route path="/reset/:permalink/:verifyToken" exact component={Reset} />
                  <Route path="/" component={LibRouter} />
                </Switch>
              </div>

              <AppFooter />

              <div className="layout-mask"></div>
          </div>
      );
  }
}

const mapStateToProps = ({ user, notifications }) => ({ user, notifications })

const mapDispatchToProps = dispatch => ({
  joinRoom: (uid, token) => dispatch(joinRoom(uid, token)),
  removeNotification: (uid) => dispatch(removeNotification(uid)),
  socketDisconnect: (token) => dispatch(socketDisconnect(token)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
