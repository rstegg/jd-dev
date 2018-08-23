import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Widget } from 'react-chat-widget'
import 'react-chat-widget/lib/styles.css'

import Chat from './components/Chat'

export class AppFooterView extends Component {
    handleNewUserMessage = msg => {
      console.log(msg);
    }
    render() {
        const { user } = this.props
        return  (
            <div className="layout-footer">
              { user && user.isAuthenticated ? <Chat />
              : <span className="footer-text" style={{'marginRight': '5px'}}>Ryan Stegmann -- Cool guy</span>}
            </div>
        );
    }
}

export const AppFooter = connect( ({ user }) => ({ user }) )(AppFooterView)
