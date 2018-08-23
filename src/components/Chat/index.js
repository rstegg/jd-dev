import React, { Component } from 'react'
import { connect } from 'react-redux'

import ContactsMenu from './ContactsMenu'
import ContactsLauncher from './ContactsLauncher'

import './styles.css'

class ChatView extends Component {
  isDesktop() {
      return window.innerWidth > 1024;
  }
  render() {
    const { chat } = this.props
    const isMobile = !this.isDesktop()
    return (
      <div className={`rcw-widget-container`}>
        { chat.isContactsOpened ? <ContactsMenu /> : null }
        <ContactsLauncher />
      </div>
    )
  }
}

const mapStateToProps = ({ chat }) => ({ chat })

export default connect(mapStateToProps)(ChatView)
