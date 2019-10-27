import React from 'react';
import UsersVisitedBy from './UsersVisitedBy';
import '../css/visitedBy.css';

export default class VisitedBy extends React.Component {

    render() {
        const { visitedBy } = this.props.profile;

        return (
            <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">Visited by</h4>
                    </div>
                    <div className="panel-body scroll">
                        <div className="col-md-12">
                            <table id='visited-by'>
                                <tbody>
                                    <UsersVisitedBy visitedBy={visitedBy} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
