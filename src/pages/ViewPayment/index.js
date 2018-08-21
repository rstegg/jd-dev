import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Label } from 'antd'
import RootLayout from '../../components/layouts/Root'
import PayMenu from '../../components/PayMenu'

import { fetchSinglePayment } from '../../redux/actions/payments'

class ViewPayment extends Component {
  componentWillMount() {
    const { match: { params }, user } = this.props
    this.props.fetchSinglePayment(params.id, user)
  }
  render() {
    const { payment, user } = this.props
    if(!payment) {
      return <Redirect to='/' />
    }
    return (
      <RootLayout>
        <div className='pay--menu'>
          <PayMenu />
        </div>
        <Card>
          <Card.Content>
            <Card.Header>{user.name}</Card.Header>
            <Card.Meta>Paid - ${payment.amount}</Card.Meta>
            <Card.Description>
              <Label basic>Note: {payment.name}</Label>
            </Card.Description>
          </Card.Content>
        </Card>
      </RootLayout>
    )
  }
}

const mapStateToProps = ({payments, user}) =>
({
  payment: payments.current,
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchSinglePayment: (paymentId, user) => dispatch(fetchSinglePayment(paymentId, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPayment)
