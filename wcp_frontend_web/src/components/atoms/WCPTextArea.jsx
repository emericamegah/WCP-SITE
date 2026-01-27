import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const WCPTextArea = React.forwardRef(({ className, error, ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            className={twMerge(
                clsx(
                    "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors",
                    "placeholder-gray-400 text-gray-900 bg-white",
                    "min-h-[120px] resize-y",
                    error
                        ? "border-red-300 focus:ring-red-200 focus:border-red-500"
                        : "border-gray-200 focus:ring-wcp-blue-100 focus:border-wcp-blue-900",
                    className
                )
            )}
            {...props}
        />
    );
});

WCPTextArea.displayName = 'WCPTextArea';

WCPTextArea.propTypes = {
    className: PropTypes.string,
    error: PropTypes.bool,
};

export default WCPTextArea;
