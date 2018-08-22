import React, { Component } from 'react';
import { connect } from 'react-redux'
import { InputText } from 'primereact/components/inputtext/InputText'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { Button, Popover, Icon } from 'antd'
import LoginForm from './shared/forms/login'
import { onLoginSubmit } from './shared/actions/login'

const HeadNavLink = ({ to, className, label, icon, style, activeClassName }) =>
  <NavLink to={to} className={className || 'router--link'} style={{ marginRight: '12px' }} activeClassName={activeClassName || 'link--active'}>
      <Button>{label}</Button>
  </NavLink>

export class AppTopbarView extends Component {

    static defaultProps = {
        onToggleMenu: null
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    render() {
      const { user } = this.props
      if (this.isDesktop()) {
        if (!user.isAuthenticated) {
          return (
            <div className="layout-topbar clearfix">
                <div className="layout-menu-buttons">
                  <Popover placement="bottomRight" content={<LoginForm onSubmit={onLoginSubmit} />}>
                    <Button style={{ marginRight: '12px', marginTop: '10px'}}>
                      Sign in<Icon type="down" />
                    </Button>
                  </Popover>
                  <HeadNavLink to="/signup" label="Sign up" />
                </div>
                <div className="layout-topbar-icons">
                  <NavLink to="/login" style={{ marginRight: '12px' }}>
                      <span className="layout-topbar-icon fa fa-user"/>
                  </NavLink>
                </div>
            </div>
          )
        }
        return (
          <div className="layout-topbar clearfix">
              <div className="layout-menu-buttons">
                <HeadNavLink to="/" label="Dashboard" />
                <HeadNavLink to="/orders" label="Orders" />
              </div>
              <div className="layout-topbar-icons">
                  <span className="layout-topbar-search">
                      <InputText type="text" placeholder="Search" />
                      <span className="layout-topbar-search-icon fa fa-search"/>
                  </span>
                  <a>
                      <span className="layout-topbar-item-text">Messages</span>
                      <span className="layout-topbar-icon fa fa-envelope-o animated swing"/>
                      <span className="layout-topbar-badge animated rubberBand">5</span>
                  </a>
                  <a>
                      <span className="layout-topbar-item-text">Settings</span>
                      <span className="layout-topbar-icon fa fa-gear"/>
                  </a>
                  <a>
                      <span className="layout-topbar-item-text">User</span>
                      <span className="layout-topbar-icon fa fa-user"/>
                  </a>
              </div>
          </div>
        )

      }

      if (!user.isAuthenticated) {
        return (
          <div className="layout-topbar clearfix">
              <div className="layout-menu-buttons">
                <Popover placement="bottomRight" content={<LoginForm onSubmit={onLoginSubmit} />}>
                  <Button style={{ marginRight: '12px', marginTop: '10px'}}>
                    Sign in<Icon type="down" />
                  </Button>
                </Popover>
                <HeadNavLink to="/signup" label="Sign up" />
              </div>
              <div className="layout-topbar-icons">
                <NavLink to="/login" style={{ marginRight: '12px' }}>
                    <span className="layout-topbar-icon fa fa-user"/>
                </NavLink>
              </div>
          </div>
        )
      }
      return (
        <div className="layout-topbar clearfix">
            <div className="layout-menu-buttons">
              <HeadNavLink to="/" label="Dashboard" />
              <HeadNavLink to="/orders" label="Orders" />
            </div>
            <div className="layout-topbar-icons">
                <span className="layout-topbar-search">
                    <InputText type="text" placeholder="Search" />
                    <span className="layout-topbar-search-icon fa fa-search"/>
                </span>
                <a>
                    <span className="layout-topbar-item-text">Messages</span>
                    <span className="layout-topbar-icon fa fa-envelope-o animated swing"/>
                    <span className="layout-topbar-badge animated rubberBand">5</span>
                </a>
                <a>
                    <span className="layout-topbar-item-text">Settings</span>
                    <span className="layout-topbar-icon fa fa-gear"/>
                </a>
                <a>
                    <span className="layout-topbar-item-text">User</span>
                    <span className="layout-topbar-icon fa fa-user"/>
                </a>
            </div>
        </div>
      )
    }
}

const mapStateToProps = ({ user }) =>
({
  user,
})

const mapDispatchToProps = dispatch =>
({
  onLoginSubmit: user => dispatch(onLoginSubmit(user)),
})


export const AppTopbar = connect(mapStateToProps, mapDispatchToProps)(AppTopbarView)
