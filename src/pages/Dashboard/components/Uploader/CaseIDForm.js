import React, { Component } from 'react'
import { Input, Icon, Button } from 'antd'
const { Search } = Input

class CaseIDForm extends Component {
  render() {
    return this.props.renameCaseID ?
      <Search
        placeholder='Identifier'
        style={this.props.style}
        onChange={e => this.props.onChange(e.target.value)}
        onSearch={value => this.props.onSave(value)}
        enterButton={<Icon type='edit' />} />
      : <div style={this.props.textStyle}>Identifier: <b>{this.props.name}</b> <Button size='small' type="primary" onClick={() => this.props.onClick()}><Icon type='edit' /></Button></div>
  }
}

export default CaseIDForm
