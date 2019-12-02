import React from 'react';

const TagCompo = ({ tag, func }) => (
    <div className='tags' id={tag} onClick={func}>#{tag}</div>
)

export default TagCompo;
