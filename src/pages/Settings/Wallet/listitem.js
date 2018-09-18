import React from 'react'
import { NavLink } from 'react-router-dom'

import { Header, Card, Icon } from 'antd'

const renderCardType = type => {
  switch (type) {
  case 'Visa':
    return <Icon name='visa' />
  case 'MasterCard':
    return <Icon name='mastercard' />
  case 'American Express':
    return <Icon name='american express' />
  case 'Diners Club':
    return <Icon name='diners club' />
  case 'Discover':
    return <Icon name='discover' />
  case 'JCB':
    return <Icon name='japan credit bureau' />
  case 'Maestro':
  case 'UnionPay':
  default:
    return <Icon name='payment' />
  }
}

//TODO: route to wallet ID

const WalletListItem = ({ wallet }) =>
  <NavLink to='/settings/wallet'>
    <Card type='inner'>
      <h4>
        {wallet.object === 'card' && renderCardType(wallet.brand)} ending in {wallet.last4}
      </h4>
      <h4 floated='right'>
        {wallet.exp_month}/{wallet.exp_year}
      </h4>
    </Card>
  </NavLink>

export default WalletListItem
