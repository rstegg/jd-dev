import React from 'react'
import { NavLink } from 'react-router-dom'

import { Alert, Card, Icon } from 'antd'

//TODO: route to wallet ID

const WalletListItem = ({ wallet }) =>
  <Card type='inner'
    title={<div>{wallet.object === 'card' && <Icon type='credit-card' />} ending in {wallet.last4}</div>}
    >
    <Alert message={wallet.name} type={wallet.defaultCard ? 'success' : 'warning'} />
    <br />
    <p>Expiration: {wallet.exp_month}/{wallet.exp_year}</p>
  </Card>

export default WalletListItem
