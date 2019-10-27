import React from 'react';

export default class SidebarSearch extends React.Component {
    render() {
        return (
            <div className="row searchBox">
                <div className="col-sm-12 searchBox-inner">
                    <div className="form-group">
                        <input id="searchText" type="text" className="form-control" name="searchText" placeholder="Search" />
                    </div>
                </div>
            </div>
        );
    }
}
