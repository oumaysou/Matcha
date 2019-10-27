import React from 'react';
import '../css/submitForm.css';

export default class SubmitForm extends React.Component {
    render() {
        const { className, value } = this.props;

        return (
          <input
            type="submit"
            className={`btn btn-primary ${className}`}
            value={value}
          />
        );
    }
}
