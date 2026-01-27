import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '../atoms/Icon';

const Breadcrumb = ({ items }) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-wcp-blue-600">
                        <Icon name="Home" className="mr-2" size={16} />
                        Accueil
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <Icon name="ChevronRight" className="text-gray-400" size={16} />
                            {item.link ? (
                                <Link to={item.link} className="ml-1 text-sm font-medium text-gray-500 hover:text-wcp-blue-600 md:ml-2">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="ml-1 text-sm font-medium text-wcp-blue-600 md:ml-2">
                                    {item.label}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

Breadcrumb.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        link: PropTypes.string
    })).isRequired
};

export default Breadcrumb;
