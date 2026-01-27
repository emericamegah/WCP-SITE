import React from 'react';
import PropTypes from 'prop-types';
import { Check } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const ProgressStepper = ({ steps, currentStep, className = '' }) => {
    return (
        <div className={twMerge("w-full", className)}>
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;
                    const isUpcoming = stepNumber > currentStep;

                    return (
                        <React.Fragment key={step.id || index}>
                            {/* Step Circle */}
                            <div className="flex flex-col items-center flex-1">
                                <div
                                    className={twMerge(
                                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2",
                                        isCompleted && "bg-green-600 border-green-600 text-white",
                                        isCurrent && "bg-blue-600 border-blue-600 text-white ring-4 ring-blue-100",
                                        isUpcoming && "bg-white border-gray-300 text-gray-500"
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check size={20} />
                                    ) : (
                                        stepNumber
                                    )}
                                </div>
                                {/* Step Label */}
                                <span
                                    className={twMerge(
                                        "mt-2 text-xs font-medium text-center hidden sm:block",
                                        isCurrent && "text-blue-900",
                                        isCompleted && "text-green-900",
                                        isUpcoming && "text-gray-500"
                                    )}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {/* Connector Line (except after last step) */}
                            {index < steps.length - 1 && (
                                <div className="flex-1 h-0.5 mx-2 -mt-5">
                                    <div
                                        className={twMerge(
                                            "h-full transition-all duration-300",
                                            stepNumber < currentStep ? "bg-green-600" : "bg-gray-300"
                                        )}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

ProgressStepper.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    currentStep: PropTypes.number.isRequired,
    className: PropTypes.string,
};

export default ProgressStepper;
