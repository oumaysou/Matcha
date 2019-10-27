import React from 'react';

export default class Tag extends React.Component {
    render() {
        const tags = this.props.tags;
        if (tags) {
            tags.map(tag => {
                return (
                    <div className='tags'>#{tag}</div>
                );
            })
        }
        return <div>Empty</div>;
    }
}
