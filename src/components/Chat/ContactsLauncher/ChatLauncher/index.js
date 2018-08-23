import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Widget } from 'react-chat-widget'

import { Icon } from 'antd'

import { closeContactChat } from './actions'

const CustomChatLoader = ({  })

class ChatLauncher extends Component {
  render() {
    const { chat, removeContactChat } = this.props
    const { contacts } = chat
    return (
      <div>
        {
          contacts.map((contact, idx) =>
            <div key={`contact-launcher--${idx}`} className={contact.isShowing  ? '' : 'contact-launcher-hide'} style={{ display: 'inlineflex' }}>
              <Widget  />
              <Icon type='close' />
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
