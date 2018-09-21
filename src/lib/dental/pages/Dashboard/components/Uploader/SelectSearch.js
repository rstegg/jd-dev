import React, { Component } from 'react'
import { Select } from 'antd'
const Option = Select.Option

class SelectSearch extends Component {
  render() {
    const options = this.props.options && this.props.options.map(d => <Option key={d.value}>{d.label}</Option>);
    return (
      <div>
        <div style={{ width: '100%', marginBottom: '12px' }}>{this.props.label}:</div>
        <Select
          value={this.props.value}
          placeholder={this.props.label}
          style={this.props.style}
          showArrow={true}
          filterOption={true}
          disabled={this.props.disabled}
          onChange={this.props.onChange}
        >
          {options}
        </Select>
      </div>
    );
  }
}

export default SelectSearch
