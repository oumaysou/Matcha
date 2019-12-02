import React from 'react';
import utils from '../../general/components/utils';
import EditForm from '../components/EditForm';
import RedirectToProfile from '../../general/components/RedirectToProfile';
import { thunk_getInfosUser, thunk_getAllTags } from '../../actions/thunk_actions_editProfile';
import { connect } from 'react-redux';
import PicturesForm from '../components/PicturesForm';

class Edit extends React.Component {
    constructor() {
        super()
        this.state = {
            updated: false,
            userloaded:false,
            tagsloaded:false
        };
    }

    componentDidMount() {
        const decoded = utils.decodedCookie();
        if (decoded){
            this.props.dispatch(thunk_getInfosUser(decoded.username))
                .then( () => {this.setState({ userloaded: true })})
            this.props.dispatch(thunk_getAllTags())
                .then(() => {this.setState({ tagsloaded: true })})            
        }
        else
            console.error('Error Decode Cookie');
    }

    render() {
        switch (this.state.updated) {
            case true:
                return <RedirectToProfile username={this.state.username} />;
            default:
                if (this.state.userloaded && this.state.tagsloaded)
                    return (
                        <div>
                            <PicturesForm/>
                            <EditForm/>
                        </div>
                    );
                else
                        return(<p>ELSE</p>);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userInfos: state.userInfos || {},
        allTags: state.allTags || {}    
    };
};

export default connect(mapStateToProps)(Edit);
