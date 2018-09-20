import React from 'react'
import { length } from 'ramda'

import { Tag, Table, Icon } from 'antd'

const columns = [{
  title: 'Last 4 digits',
  dataIndex: 'last4',
  key: 'last4',
  render: (last4, record) => <div><Icon type='credit-card' /> {last4} {record.defaultCard && <Tag color='geekblue'>Default</Tag>}</div>,
}, {
  title: 'Expiration Month',
  dataIndex: 'exp_month',
  key: 'exp_month',
  render: exp_month => <p>{exp_month}</p>
}, {
  title: 'Expiration Year',
  dataIndex: 'exp_year',
  key: 'exp_year',
  render: exp_year => <p>{exp_year}</p>
}]

const WalletList =
({
  wallet
}) =>
  length(wallet) ? <Table columns={columns} dataSource={wallet} rowClassName={row => row.defaultCard ? 'default-cc-card-row' : 'cc-card-row'} />
  : <div>
      <h4 style={{ textAlign: 'center'}}>
        <Icon type='meh' /> Empty!
      </h4>
    </div>

export default WalletList
