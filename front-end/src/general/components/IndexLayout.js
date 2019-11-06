import React from 'react';
import '../css/indexLayout.css';
// import Matcha from './matcha-coeur.jpg';
// import MatchaPrime from './bg-landing.jpg';

export default class IndexLayout extends React.Component {
    render() {
        return (
            <div className="App">
                <div id="bg-img"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-content text-center">
                                <h1>Because it just <span>matcha</span> your need.</h1><img src={this.props.whichone} height="auto" width="1000px" alt="matcha coeur" />

                                <div className="card">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
