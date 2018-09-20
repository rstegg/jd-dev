import React, { Component } from 'react';
import { connect } from 'react-redux';

export class AppFooterView extends Component {
    render() {
        return  (
            <div className="layout-footer">
              <span className="footer-text" style={{'marginRight': '5px'}}>Copyright</span>
            </div>
        );
    }
}

export const AppFooter = connect( ({ user }) => ({ user }) )(AppFooterView)
