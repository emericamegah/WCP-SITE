import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center justify-center space-x-2 py-4">
            <button
                className="p-2 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <Icon name="ChevronLeft" size={20} />
            </button>

            <span className="text-sm text-gray-600 font-medium px-4">
                Page {currentPage} sur {totalPages}
            </span>

            <button
                className="p-2 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <Icon name="ChevronRight" size={20} />
            </button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
