import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, notification } from 'antd'

import { prop, head } from 'ramda'

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';

import Login from './auth/pages/Login';
import Signup from './auth/pages/Signup';
import LibRouter from './lib/Router';

import { joinRoom, removeNotification } from './actions'

import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.css';
import 'antd/dist/antd.css'
import './App.css';
import './layout/layout.css';

class App extends Component {
  componentWillUpdate(nextProps) {
    if (!this.props.user.token && nextProps.user.token) {
      this.props.joinRoom(nextProps.user.uid, nextProps.user.token)
    }

    if (!this.props.notifications.length && nextProps.notifications.length) {

      const key = prop('uid', head(this.props.notifications))

      const btn = (
        <Button type="primary" size="small" onClick={() => {}}>
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
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
