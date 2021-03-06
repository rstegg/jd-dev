import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card } from 'antd'
import { Redirect } from 'react-router-dom'

import WalletList from './list'
import AddCardModal from './components/AddCard'

import { fetchStripeCards, openAddCard } from './actions'

import './Styles.css'

class WalletSettings extends Component {
  componentWillMount() {
    const { fetchStripeCards, user } = this.props
    fetchStripeCards(user.token)
  }
  render() {
    const { user, card, openAddCard } = this.props
    if (!user.isAuthenticated) {
      return <Redirect to='/' />
    }
    const cardList = card.list || []
    return (
      <Card title='Payment Options' style={{ width: 350 }}
        actions={[<Button onClick={openAddCard}>Add a card</Button>]}
        >
        <WalletList
          wallet={cardList} //TODO: cards should be associated to user?
         />
         <AddCardModal />
      </Card>
    )
  }
}

const mapStateToProps = ({ user, card }) =>
({
  user,
  card
})

const mapDispatchToProps = dispatch =>
({
  openAddCard: () => dispatch(openAddCard()),
  fetchStripeCards: token => dispatch(fetchStripeCards(token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletSettings)
