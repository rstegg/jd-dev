import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Badge, Icon } from 'antd'

import './Launcher.styles.css'

import { toggleChatContacts } from './actions'

import chatIcon from './chaticon.svg'
import closeIcon from './closeicon.png'

import ChatLauncher from './ChatLauncher'
import ContactsMenu from './ContactsMenu'

const Launcher = ({ toggleChatContacts, chat }) =>
  <div style={{ position: 'fixed', display: 'flex', flexDirection: 'row-reverse', right: 0, bottom: 0 }}>
    <div className='chat-launcher-contact-column'>
      { chat.isContactsOpened ? <ContactsMenu /> : null }
      <button type="primary"
         className={chat.isContactsOpened ? 'rcw-launcher rcw-hide-sm' : 'rcw-launcher'}
         onClick={toggleChatContacts}>
        <Badge count={chat.contactsUnseen} />
          {chat.isContactsOpened ?
            <div className="rcw-close-launcher">

            </div> :
            <div className="rcw-open-launcher">

            </div>
          }
        </button>
      </div>
      <ChatLauncher />
    </div>

const mapStateToProps = ({ chat }) => ({ chat })

const mapDispatchToProps = dispatch => ({
  toggleChatContacts: () => dispatch(toggleChatContacts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Launcher)
