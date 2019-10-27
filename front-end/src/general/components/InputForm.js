import React from 'react';
import '../css/inputForm.css';

export default class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            name: this.props.name,
            placeholder: this.props.placeholder,
            className: this.props.className,
        }
    }

    handleChange = (e) => {
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value.trim();
      this.props.onChange(name, value);
    }

    render() {
        return (
            <div className={this.state.className}>
                <input
                    className="form-control text-center"
                    value={this.props.value}
                    name={this.state.name}
                    type={this.state.type}
                    placeholder={this.state.placeholder}
                    onChange={this.handleChange}
                    required
                />
            </div>
        );
    }
}
