import React from 'react'
import { length } from 'ramda'

import WalletListItem from './listitem'
import { Card, Icon } from 'antd'

const WalletList =
({
  wallet
}) =>
  <Card type='inner'>
    {length(wallet) ? wallet.map((wallet, i) =>
      <WalletListItem key={`wallet-${i}`} wallet={wallet} />
    ) :
      <div>
        <h4 style={{ textAlign: 'center'}}>
          <Icon type='meh' /> Empty!
        </h4>
      </div>
    }
  </Card>

export default WalletList
