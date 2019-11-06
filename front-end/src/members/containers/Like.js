import React from 'react';
import axios from 'axios';
import utils from '../../general/components/utils';
import { NotificationManager } from 'react-notifications';

export default class Like extends React.Component {
    constructor() {
        super()

        this.state = {
            once: false,
            likedMe: '',
            likedByMe: '',
            finish: false
        }
        // this.setLike = this.setLike.bind(this);
    }

    componentWillMount() {
        const username = this.props.user.username;

        axios.get(`/api/like/get/${username}`).then(({ data }) => {
            if (data.success)
                this.setState({ likedMe: data.likedMe, likedByMe: data.likedByMe, finish: true })
        }).catch(err => console.error('Error: ', err));
    }

    setLike = () => {
        const username = this.props.user.username;
        axios.get(`/api/like/set/${username}`).then(({ data }) => {
            if (data.success && this.state.false) {
                this.setState({ once: true })
                NotificationManager.success(data.message, 'Success !', 6000);
            }
            else if (!data.success) {
                NotificationManager.error(data.message, 'Sorry but...', 6000);
            }
        })
    }

    UnsetLike = () => {
        const username = this.props.user.username;
        axios.get(`/api/like/Unset/${username}`).then(({ data }) => {
            if (data.success) {
                NotificationManager.success(data.message, 'Success !', 6000);
            }
            else if (!data.success) {
                NotificationManager.error(data.message, 'Sorry but...', 6000);
            }
        })
    }

    LoadOnce = () => {
        var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
        // Current Time //
        var now = Date.now();
        // Total Process Lenght as Minutes //
        var tenSec = 1000;
        // End Time of Process //
        var plusTenSec = currentDocumentTimestamp + tenSec;
        if (now > plusTenSec) {
            window.location.reload();
        }
    }

    render() {
        const likedMe = this.state.likedMe;
        const likedByMe = this.state.likedByMe;
        if (this.state.finish) {
            if (likedMe && !likedByMe) {
                return (
                    <button className="like-btn btn btn-primary text-center" onClick={() => { this.setLike(); this.LoadOnce() }}>
                        Like back <i className="fa fa-heart"></i>
                    </button>
                );
            }
            else if (!likedMe && !likedByMe) {
                return (
                    <button className="like-btn btn btn-primary text-center" onClick={() => { this.setLike(); this.LoadOnce() }}>
                        Like <i className="fa fa-heart"></i>
                    </button>
                );
            }
            else if (likedByMe) {
                return (
                    <button className="like-btn btn btn-primary text-center" onClick={() => { this.UnsetLike(); this.LoadOnce() }}>
                        Unlike <i className="fa fa-thumbs-down"></i>
                    </button>
                );
            }
        }
        return <utils.loading />
    }

}
