import React from 'react';

export default class Bio extends React.Component {
    constructor() {
        super()
        this.state = {
            biography: 'There is no bio yet',
            open: true
        }
    }

    componentDidMount() {
        if (!this.props.biography)
            this.setState({open: false});
        else
            this.setState({biography: this.props.biography});
    }
    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" href="#bio">Biography</a>
                        </h4>
                    </div>
                    <div id="bio" className="panel-collapse collapse {this.state.open}">
                        <div className="panel-body text-center">
                            {this.state.biography}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
