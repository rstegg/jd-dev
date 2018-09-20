import React from 'react'

import { Tag, Card, Icon } from 'antd'

//TODO: route to wallet ID

import isMobile from '../../../utils/is-mobile'

const WalletListItem = ({ wallet }) =>
  <Card.Grid
    style={wallet.defaultCard ? { backgroundColor: '#f6ffed', width: isMobile() ? '100%' : '50%', textAlign: 'center'  }
    : { width: isMobile() ? '100%' : '50%', textAlign: 'center' }}>
    <div>{wallet.object === 'card' && <Icon type='credit-card' />} ending in {wallet.last4}</div>
    {wallet.defaultCard ? <Tag color='geekblue'>Active</Tag> : null}
    <br />
    <p>Expiration: {wallet.exp_month}/{wallet.exp_year}</p>
  </Card.Grid>

export default WalletListItem
