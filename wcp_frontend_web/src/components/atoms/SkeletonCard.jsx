import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const SkeletonCard = ({ height = '200px', lines = 3, className = '' }) => {
    return (
        <div
            className={twMerge(
                "bg-white rounded-xl border border-[#E5E7EB] p-6 animate-pulse",
                className
            )}
            style={{ height }}
        >
            {/* Header skeleton */}
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

            {/* Lines skeleton */}
            <div className="space-y-3">
                {Array.from({ length: lines }).map((_, index) => (
                    <div
                        key={index}
                        className="h-4 bg-gray-200 rounded"
                        style={{
                            width: index === lines - 1 ? '60%' : '100%'
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

SkeletonCard.propTypes = {
    height: PropTypes.string,
    lines: PropTypes.number,
    className: PropTypes.string,
};

export default SkeletonCard;
