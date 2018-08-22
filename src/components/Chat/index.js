import React, { Component } from 'react'
import './Launcher.styles.css'

class ChatView extends Component {
  render() {
    return (
      <div className={
      `rcw-widget-container ${props.fullScreenMode ? 'rcw-full-screen' : ''} ${props.showChat ? 'rcw-opened' : ''}`
    }>
      {props.showChat &&
      <Conversation
        title={props.title}
        subtitle={props.subtitle}
        sendMessage={props.onSendMessage}
        senderPlaceHolder={props.senderPlaceHolder}
        profileAvatar={props.profileAvatar}
        toggleChat={props.onToggleConversation}
        showChat={props.showChat}
        showCloseButton={props.showCloseButton}
        disabledInput={props.disabledInput}
        autofocus={props.autofocus}
        titleAvatar={props.titleAvatar}
      />
    }
    {props.customLauncher ?
      props.customLauncher(props.onToggleConversation) :
      !props.fullScreenMode &&
      <Launcher
        toggle={props.onToggleConversation}
        badge={props.badge}
      />
    }
    </div>
    )
  }
}
