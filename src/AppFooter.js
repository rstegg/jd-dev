import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Widget } from 'react-chat-widget'
import 'react-chat-widget/lib/styles.css'

export class AppFooterView extends Component {
    handleNewUserMessage = msg => {
      console.log(msg);
    }
    render() {
        const { user } = this.props
        return  (
            <div className="layout-footer">
              { user && user.isAuthenticated ? <Widget handleNewUserMessage={this.handleNewUserMessage} title="Temp Chat" subtitle="Cool lil chat software" />
              : <span className="footer-text" style={{'marginRight': '5px'}}>Ryan Stegmann -- Cool guy</span>}
            </div>
        );
    }
}

export const AppFooter = connect( ({ user }) => ({ user }) )(AppFooterView)
