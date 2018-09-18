import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card } from 'antd'
import { Redirect } from 'react-router-dom'

import WalletList from './list'
import AddCardModal from './components/AddCard'

import { fetchStripeCards, openAddCard } from './actions'

class WalletSettings extends Component {
  componentWillMount() {
    const { fetchStripeCards, user } = this.props
    fetchStripeCards(user)
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
  fetchStripeCards: user => dispatch(fetchStripeCards(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletSettings)
