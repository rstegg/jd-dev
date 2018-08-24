import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Widget } from 'react-chat-widget'
import './styles.css'

import { Icon } from 'antd'

import { closeContactChat } from './actions'

import avatarPlaceholder from './avatar.png';

class ChatLauncher extends Component {
  handleNewUserMessage = msg => {

  }
  render() {
    const { chat, closeContactChat } = this.props
    const { contacts } = chat
    return (
      <div>
        {
          contacts.map((contact, idx) =>
            <div key={`contact-launcher--${idx}`} className={contact.isShowing  ? 'contact-launcher-show' : 'contact-launcher-hide'}>
              <Widget
                handleNewUserMessage={this.handleNewUserMessage}
                profileAvatar={contact.avatar || avatarPlaceholder}
                title={contact.name}
                subtitle={contact.orderName || ''}
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


const mapStateToProps = ({ chat }) => ({ chat })

const mapDispatchToProps = dispatch => ({
  closeContactChat: (contact, idx) => dispatch(closeContactChat(contact, idx))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatLauncher)
