import React from 'react';
import PropTypes from 'prop-types';

const Hello = props => {
    return (
        <h1>
            {props.name}</h1>
    );
};
Hello.propTypes = {
    name: PropTypes.string.isRequired
};

export default Hello;
