import React from 'react';
import { TableRow, TableCell } from '../ui/table';
import DataPill from '../atoms/DataPill';
import IconButton from '../atoms/IconButton';

const FinanceRow = ({ transaction }) => {
    return (
        <TableRow>
            <TableCell className="font-medium">#{transaction.id}</TableCell>
            <TableCell>{transaction.property}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell className="text-right font-mono">{transaction.amount}</TableCell>
            <TableCell>
                <DataPill status={transaction.status} type="finance" />
            </TableCell>
            <TableCell className="text-right">
                <IconButton
                    type="export"
                    tooltip="Télécharger le reçu"
                    onClick={() => console.log('Download receipt', transaction.id)}
                />
            </TableCell>
        </TableRow>
    );
};

export default FinanceRow;
