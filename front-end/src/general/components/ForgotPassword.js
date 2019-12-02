import React from 'react';
import ForgotPwForm from './ForgotPwForm';
import IndexLayout from '../components/IndexLayout';
import MatchaPrime from './../components/bg-landing.jpg';

export default class ForgotPassword extends React.Component {
    render () {
        return (
            <IndexLayout whichone={MatchaPrime}>
                <ForgotPwForm />
            </IndexLayout>
        )
    }
}