import React, { Component } from 'react';

class RadioForm extends Component {
  
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.id;
    this.props.onChange(name, value);
  }


  render() {
    const { label, name, text } = this.props;

    return (
      <div className="radio-inline">
        <label htmlFor={label}>
          <input
            type="radio"
            name={name}
            id={label}
            onChange={this.handleChange}
          />
          {text}
        </label>
      </div>
    );
  }
}

export default RadioForm;
