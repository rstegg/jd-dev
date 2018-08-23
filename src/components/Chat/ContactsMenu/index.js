import React, { Component } from 'react'
import { connect } from 'react-redux'
import './UserList.styles.css'

import { Avatar, List, Icon } from 'antd'

import { openContactChat, closeContactMenu } from './actions'

class ContactsMenuHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      closeShine: false
    }
  }
  setCloseShine(bool) {
    this.setState({ closeShine: bool })
  }
  render() {
    const { onClose } = this.props
    return (
      <div onClick={onClose} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', cursor: 'pointer' }}>
        <Icon type='close' className={this.state.closeShine ? 'close-contacts-shine' : 'close-contacts'} onMouseOver={() => this.setCloseShine(true)} onMouseOut={() => this.setCloseShine(false)}/>
      </div>
    )
  }
}



class ContactsMenu extends Component {
  render() {
    const { chat, openContactChat, closeContactMenu } = this.props;
    const { contacts } = chat
    return (
      <List
       className='user-list'
       style={{ flexDirection: 'column' }}
        bordered
        header={<ContactsMenuHeader onClose={() => closeContactMenu()} />}
        dataSource={contacts}
        renderItem={(user, idx) => (
          <List.Item onClick={() => openContactChat(user, idx)} className='user-list--user'>
            <List.Item.Meta
              avatar={user.avatar ? <Avatar src={user.avatar} /> : <Avatar icon="user" />}
              title={<div className='user-list--user-name'>{user.name}</div>}
              description={user.lastMessage ? user.lastMessage : (user.bio ? user.bio : '')}
            />
          </List.Item>
        )}
      />
    );
  }
}

const mapStateToProps = ({ chat }) => ({ chat })

const mapDispatchToProps = dispatch => ({
  openContactChat: (user, idx) => dispatch(openContactChat(user, idx)),
  closeContactMenu: () => dispatch(closeContactMenu())
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactsMenu)
