import React from 'react';

export default class InputImageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
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
                    type='file'
                    accept='image/*'
                    value={this.props.value}
                    name={this.state.name}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}
