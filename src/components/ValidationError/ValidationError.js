import React from 'react';
import PropTypes from 'prop-types';
import './ValidationError.css'

export default function ValidationError(props) {
	return props.message ?
		<div className="error" onClick={e => props.clearError()}>{props.message}</div>
		: <></>;
};

ValidationError.propTypes = {
	message: PropTypes.string,
	clearError: PropTypes.func
};