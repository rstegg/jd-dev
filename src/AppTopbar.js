import React, { Component } from 'react';
import { connect } from 'react-redux'
import { InputText } from 'primereact/components/inputtext/InputText'
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom'
import { Menu, Button, Popover, Icon } from 'antd'
import LoginForm from './shared/forms/login'
import { onLoginSubmit, onLogoutSubmit } from './shared/actions/login'

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
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>

      <Menu mode="horizontal" defaultSelectedKeys={[ defaultOpen ]} onClick={this.handleClick} selectedKeys={[ defaultOpen, this.state.current ]}>
        <Menu.Item key="dashboard">
          <NavLink to="/">Dashboard</NavLink>
        </Menu.Item>
        <Menu.Item key="orders">
          <NavLink to="/orders">Orders</NavLink>
        </Menu.Item>
      </Menu>
      <Menu mode="horizontal" defaultSelectedKeys={[ defaultOpen ]} onClick={this.handleClick} selectedKeys={[ defaultOpen, this.state.current ]}>
        <Menu.SubMenu title={<span className="submenu-title-wrapper"><Icon type="user" />{user.email}</span>}>
          <Menu.ItemGroup title="Account">
            <Menu.Item key="profile"><NavLink to="/profile"><Icon type="user" />Profile</NavLink></Menu.Item>
            <Menu.Item key="account"><NavLink to="/settings/account"><Icon type="setting" />Settings</NavLink></Menu.Item>
            <Menu.Item key="logout" onClick={() => this.props.onLogoutSubmit(this.props.user.token)}><Icon type="logout" />Logout</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>
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
  onLogoutSubmit: (token) => dispatch(onLogoutSubmit(token)),
})


export const AppTopbar = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppTopbarView))
