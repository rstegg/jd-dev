import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'antd'
import RouterButton from '../../elements/RouterButton'
import PaymentsList from './list'

import { fetchPayments, setCurrentPayment, refreshPayments } from '../../redux/actions/payments'

import RootLayout from '../../components/layouts/Root'

class Payments extends Component {
  componentDidMount() {
    if(this.props.user.isAuthenticated) {
      this.props.fetchPayments(this.props.user)
      this.props.refreshPayments()
    }
  }
  render() {
    const { payments, setCurrentPayment } = this.props
    if(!this.props.user.isAuthenticated) {
      return <Redirect to='/login' from='/payments' />
    }
    return (
      <RootLayout>
        <Card className='payments'>
          <Card.Content className='card__list'>
            <Card.Header>Payments</Card.Header>
            <Card.Description>
              <PaymentsList
                payments={payments}
                setCurrentPayment={setCurrentPayment}
               />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <RouterButton to='/' from='/payments' label='Pay a post' />
          </Card.Content>
        </Card>
      </RootLayout>
    )
  }
}
const mapStateToProps = ({payments, user}) =>
({
  payments: payments.list,
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchPayments: user => dispatch(fetchPayments(user)),
  setCurrentPayment: payment => dispatch(setCurrentPayment(payment)),
  refreshPayments: () => dispatch(refreshPayments()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payments)
