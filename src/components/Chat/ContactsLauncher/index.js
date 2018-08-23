import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Badge, Icon } from 'antd'

import './Launcher.styles.css'

import { toggleChatContacts } from './actions'

import chatIcon from './chaticon.svg'
import closeIcon from './closeicon.png'

import ChatLauncher from './ChatLauncher'

const Launcher = ({ toggleChatContacts, chat }) =>
  <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
    <button type="primary"
       className={chat.isContactsOpened ? 'rcw-launcher rcw-hide-sm' : 'rcw-launcher'}
       onClick={toggleChatContacts}>
      <Badge count={chat.contactsUnseen} />
        {chat.isContactsOpened ?
          <img className="rcw-close-launcher" src={closeIcon} /> :
          <img className="rcw-open-launcher" src={chatIcon} />
        }
      </button>
      <ChatLauncher />
    </div>

const mapStateToProps = ({ chat }) => ({ chat })

const mapDispatchToProps = dispatch => ({
  toggleChatContacts: () => dispatch(toggleChatContacts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Launcher)
