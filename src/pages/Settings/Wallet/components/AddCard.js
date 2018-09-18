import React from 'react'
import { connect } from 'react-redux'

import { Modal, Button } from 'antd'

import Cards from 'react-credit-cards'

import AddCreditCardForm from './form'

import { closeAddCard, addStripeCard } from './actions'

const AddCreditCard = ({ user, card, cardForm, closeAddCard, addStripeCard }) =>
  <Modal visible={card.isOpen}
    style={{ textAlign: 'center' }}
    title='Add a Card'
    onCancel={() => closeAddCard()}
    onOk={() => { addStripeCard(card, user); closeAddCard() }}
    okText='Save'
    >
    {cardForm &&
    <Cards number={cardForm.values && cardForm.values.number ? cardForm.values.number.replace(/-/g, '') : ''}
      name={cardForm.values && cardForm.values.name || ''}
      expiry={cardForm.values && cardForm.values.expirationDate || ''}
      cvc={cardForm.values && cardForm.values.cvv || ''}
      focused={cardForm.active === 'cvv' ? 'cvc' : cardForm.active === 'expirationDate' ? 'expiry' : cardForm.active} />
    }
    <AddCreditCardForm />
  </Modal>

const mapStateToProps = ({ user, card, form }) =>
({
  user,
  card,
  cardForm: form.addcard
})

const mapDispatchToProps = dispatch =>
({
  addStripeCard: (card, user) => dispatch(addStripeCard(card, user)),
  closeAddCard: () => dispatch(closeAddCard()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCreditCard)
