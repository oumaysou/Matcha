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
        if (!this.props.profile.bio)
            this.setState({open: false});
        else
            this.setState({biography: this.props.profile.bio});
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
                    <div id="bio" className="panel-collapse">
                        <div className="panel-body text-center">
                            {this.state.biography}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
