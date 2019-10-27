import React from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import '../css/filters.css'

export default class Filters extends React.Component {

  render() {
    return (
        <div className='container-fluid'>
            <div className='row col-md-6 col-sm-12 col-xs-12 filters'>
                <div id='filter-basic'>
                    <input className='col-md-10 col-sm-10 col-xs-10' type="text" placeholder="Search a tag" />
                    <div className='col-md-2 col-sm-2 col-xs-2 pull-right'>
                        <ButtonToolbar>
                            <DropdownButton
                                bsSize="small"
                                title="Filters"
                                id="dropdown-size-small"
                            >
                            <MenuItem eventKey="1">Popularity</MenuItem>
                            <MenuItem eventKey="2">Age</MenuItem>
                            <MenuItem eventKey="3">Distance</MenuItem>
                            </DropdownButton>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
