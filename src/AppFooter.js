import React, { Component } from 'react';

export class AppFooter extends Component {

    render() {
        return  (
            <div className="layout-footer">
                <span className="footer-text" style={{'marginRight': '5px'}}>Ryan Stegmann -- </span>
                <span className="footer-text" style={{'marginLeft': '5px'}}>-- Cool guy</span>
            </div>
        );
    }
}
