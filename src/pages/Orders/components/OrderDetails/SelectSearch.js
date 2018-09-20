import React, { Component } from 'react'
import { Select } from 'antd'
const Option = Select.Option

class SelectSearch extends Component {
  render() {
    const options = this.props.options && this.props.options.map(d => <Option key={d.value}>{d.label}</Option>);
    const selectStyle = { ...this.props.style, alignSelf: 'flex-end' }
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>{this.props.label}:</div>
        <Select
          value={this.props.value}
          placeholder={this.props.label}
          style={selectStyle}
          showArrow={true}
          filterOption={true}
          disabled={this.props.disabled}
          onChange={this.props.onChange}
          defaultValue={this.props.defaultValue}
          >
            {options}
          </Select>
      </div>
    );
  }
}

export default SelectSearch
