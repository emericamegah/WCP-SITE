import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';

const CheckListItem = ({ text }) => {
    return (
        <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
                <Icon name="CheckCircle2" className="text-wcp-blue-600" size={20} />
            </div>
            <p className="ml-3 text-base text-gray-600">{text}</p>
        </div>
    );
};

CheckListItem.propTypes = {
    text: PropTypes.string.isRequired,
};

export default CheckListItem;
