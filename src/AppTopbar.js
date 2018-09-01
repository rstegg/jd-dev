import React, { Component } from 'react';
import { connect } from 'react-redux'
import { InputText } from 'primereact/components/inputtext/InputText'
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom'
import { Menu, Button, Popover, Icon } from 'antd'
import LoginForm from './shared/forms/login'
import { onLoginSubmit } from './shared/actions/login'

const HeadNavLink = ({ to, className, label, icon, style, activeClassName }) =>
  <NavLink to={to} className={className || 'router--link'} style={{ marginRight: '12px' }} activeClassName={activeClassName || 'link--active'}>
      {label}
  </NavLink>

export class AppTopbarView extends Component {
  state = {
    current: ''
  }
  handleClick = e => {
    this.setState({
      current: e.key
    })
  }
  render() {
    const { user, location, onLoginSubmit } = this.props
    let defaultOpen = location.pathname && location.pathname.slice(1)
    if (defaultOpen === '') {
      defaultOpen = 'dashboard'
    }
    if (!user.isAuthenticated) {
      return (
        <Menu mode="horizontal" defaultSelectedKeys={[ defaultOpen ]} onClick={this.handleClick} selectedKeys={[ defaultOpen, this.state.current ]}>
          <Menu.Item key="signin">
            <Popover placement="bottomRight" content={<LoginForm onSubmit={onLoginSubmit} />}>
                <NavLink to="/login"><Icon type="down" />Sign in</NavLink>
            </Popover>
          </Menu.Item>
          <Menu.Item key="signup">
            <NavLink to="/signup">Sign up</NavLink>
          </Menu.Item>
        </Menu>
      )
    }
    return (
      <Menu mode="horizontal" defaultSelectedKeys={[ defaultOpen ]} onClick={this.handleClick} selectedKeys={[ defaultOpen, this.state.current ]}>
        <Menu.Item key="dashboard">
          <NavLink to="/">Dashboard</NavLink>
        </Menu.Item>
        <Menu.Item key="orders">
          <NavLink to="/orders">Orders</NavLink>
        </Menu.Item>
      </Menu>
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


export const AppTopbar = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppTopbarView))
