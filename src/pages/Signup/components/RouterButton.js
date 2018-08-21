import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'

const RouterButton = ({to, from, className, activeClassName, prefix, label}) =>
  <NavLink to={to} from={from} className={className || 'router--link'} activeClassName={activeClassName || 'link--active'}>
      {prefix} <Button size='small'>{label}</Button>
  </NavLink>

export default RouterButton
