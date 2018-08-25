import React, { Component } from 'react';
import classNames from 'classnames';
import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Signup from './pages/Signup';


import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.css';
import 'antd/dist/antd.css'
import './App.css';
import './layout/layout.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'light',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false
        };

        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.createMenu();
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false,
            })
        }

        this.menuClick = false;
    }

    createMenu() {
      if (this.props.user.isAuthenticated) {
        this.menu = [
            {label: 'Dashboard', icon: 'fa fa-fw fa-home', command: () => { window.location = '#/'}},
            {label: 'Orders', icon: 'fa fa-fw fa-table', command: () => { window.location = '#/orders'}},
        ];
      } else {
        this.menu = [
            {label: 'Login', icon: 'fa fa-fw fa-sign-in', command: () => { window.location = '#/login'}},
            {label: 'Sign up', icon: 'fa fa-fw fa-user-plus', command: () => { window.location = '#/signup'}},
        ];
      }

    }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    render() {
        let wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });
        let sidebarClassName = classNames("layout-sidebar", {'layout-sidebar-dark': this.state.layoutColorMode === 'dark'});

        return (
            <div className='layout-wrapper' onClick={this.onWrapperClick}>
                <AppTopbar />
                <div className="layout-main">
                  <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/orders" exact component={Orders} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                  </Switch>
                </div>

                <AppFooter />

                <div className="layout-mask"></div>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => ({ user })

export default withRouter(connect(mapStateToProps)(App));
