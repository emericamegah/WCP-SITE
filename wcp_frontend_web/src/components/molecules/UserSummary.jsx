import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import AdminBadge from '../atoms/AdminBadge';
import { TableRow, TableCell } from '../ui/table';

const UserSummary = ({ user }) => {
    return (
        <TableRow>
            <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <AdminBadge role={user.role} />
            </TableCell>
            <TableCell className="text-muted-foreground">
                {user.lastActivity}
            </TableCell>
        </TableRow>
    );
};

export default UserSummary;
