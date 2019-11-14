import React from 'react';
import utils from '../../general/components/utils';
import EditForm from '../components/EditForm';
import RedirectToProfile from '../../general/components/RedirectToProfile';
import { thunk_getInfosUser } from '../../actions/thunk_actions_editProfile';
import { connect } from 'react-redux';

class Edit extends React.Component {
    constructor() {
        super()
        this.state = {
            updated: false,
            userloaded:false,
            tagsloaded:false,
            usertagsloaded:false
        };
    }

    componentDidMount() {
        this.props.dispatch(thunk_getAllTags())
            .then(() => {this.setState({ tagsloaded: true })})
        this.props.dispatch(thunk_getUserTags())
        .then(() => {this.setState({ usertagsloaded: true })})
        const decoded = utils.decodedCookie();
        if (decoded){
                this.props.dispatch(thunk_getInfosUser(decoded.username))
                .then( () => {this.setState({ userloaded: true })})
        }
        else
            console.error('Error Decode Cookie');
    }

    render() {
        switch (this.state.updated) {
            case true:
                return <RedirectToProfile username={this.state.username} />;
            default:
                if (this.state.userloaded && this.state.tagsloaded && this.state.usertagsloaded)
                    return (
                        <EditForm/>
                    );
                else
                        return(<p>ELSE</p>);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userInfos: state.userInfos || {}
        
    };
};

export default connect(mapStateToProps)(Edit);
