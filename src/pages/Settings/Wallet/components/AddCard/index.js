import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

import { Spin, Modal, Button } from 'antd'

import { Elements } from 'react-stripe-elements';


import AddCreditCardForm from './form'

import { closeAddCard, addStripeCard } from './actions'

import './Styles.css'
// !card.isLoading &&
class AddCreditCard extends Component {
  handleSubmit = values => {
    console.log(values);
    this.props.addStripeCard(values)
    // this.props.stripe.createToken({ type: 'card', name: this.props.user.name })
    // .then(({ token, error }) => {
    //   if (error) {
    //     console.error('ERROR CREATING TOKEN', error);
    //     return
    //   }
    //   const requestData = Object.assign(values, token)
    //   this.props.addStripeCard(requestData)
    // })
  }
  render() {
    const { user, card, cardForm, closeAddCard, addStripeCard } = this.props
    return (
      <Modal visible={card.isOpen}
        style={{ textAlign: 'center' }}
        title='Add a Card'
        onCancel={() => !card.isLoading && closeAddCard()}
        onOk={() => this.cardForm.getWrappedInstance().onSubmit()}
        okText='Save'
        >
          <Elements>
            <AddCreditCardForm user={user} addStripeCard={addStripeCard} ref={ref => this.cardForm = ref} />
          </Elements>
      </Modal>
    )
  }
}

const mapStateToProps = ({ user, card, form }) =>
({
  user,
  card
})

const mapDispatchToProps = dispatch =>
({
  addStripeCard: (card, token) => dispatch(addStripeCard(card, token)),
  closeAddCard: () => dispatch(closeAddCard()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCreditCard)
