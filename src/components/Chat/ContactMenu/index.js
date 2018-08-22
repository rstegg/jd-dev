import React, { Component } from 'react'
import './UserList.styles.css'

class ContactMenu extends Component {
  render() {
    const { users } = this.props;
    return (
      <div className="online-user-list">
        <div className="online-users-number valign-wrapper">
          <i className="material-icons">people</i>
          <span className="valign">{ users.length } online</span>
        </div>
        <ul>{
          users.map((userID) => {
            const name = 'Anonymous Robot #' + userID;
            const imgURL = '//robohash.org/' + userID + '?set=set2&bgset=bg2&size=70x70';
            return (
              <li key={ userID }>
                <img title={ name } alt={ name } src={ imgURL } className="circle" />
              </li>
            );
          })
        }</ul>
      </div>
    );
  }
}
