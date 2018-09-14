import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Widget } from 'react-chat-widget'
import './styles.css'

import { Icon } from 'antd'

import { closeContactChat, sendThreadChatMessage } from './actions'

import avatarPlaceholder from './avatar.png';

class ChatLauncher extends Component {
  render() {
    const { user, chat, closeContactChat } = this.props
    const { contacts } = chat
    return (
      <div>
        {
          contacts.map((contact, idx) =>
            <div key={`contact-launcher--${idx}`} className={contact.isShowing  ? 'contact-launcher-show' : 'contact-launcher-hide'}>
              <Widget
                handleNewUserMessage={msg => this.props.sendThreadChatMessage(msg, contact.caseUID, user.token)}
                profileAvatar={contact.avatar || avatarPlaceholder}
                title={contact.name + ' :: '  + contact.case}
                subtitle={contact.orderName || ''}
                messages={contact.messages}
              />
              <div className='contact-launcher-close'>
                <Icon type='close' onClick={() => closeContactChat(contact, idx)}/>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}


const mapStateToProps = ({ user, chat }) => ({ user, chat })

const mapDispatchToProps = dispatch => ({
  closeContactChat: (contact, idx) => dispatch(closeContactChat(contact, idx)),
  sendThreadChatMessage: (msg, thread, token) => dispatch(sendThreadChatMessage(msg, thread, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatLauncher)
