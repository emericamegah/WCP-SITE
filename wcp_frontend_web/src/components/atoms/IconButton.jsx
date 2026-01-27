import React from 'react';
import { Button } from '../ui/button';
import {
    Pencil,
    Trash2,
    Ban,
    Download,
    MoreHorizontal
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip"


const iconMap = {
    edit: Pencil,
    delete: Trash2,
    ban: Ban,
    export: Download,
    more: MoreHorizontal
};

const variantMap = {
    edit: 'outline',
    delete: 'destructive',
    ban: 'destructive',
    export: 'outline',
    more: 'ghost'
};

const IconButton = ({ type, onClick, tooltip, className, disabled }) => {
    const IconComponent = iconMap[type] || MoreHorizontal;
    const variant = variantMap[type] || 'ghost';

    // If tooltip is provided, wrap in Tooltip
    // Note: We need to ensure TooltipProvider is at root, but adding here for safety if used locally
    // Ideally TooltipProvider should be in App.jsx or Layout

    const button = (
        <Button
            variant={variant}
            size="icon"
            className={`h-8 w-8 ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            <IconComponent className="h-4 w-4" />
            <span className="sr-only">{type}</span>
        </Button>
    );

    if (tooltip) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {button}
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return button;
};

export default IconButton;
