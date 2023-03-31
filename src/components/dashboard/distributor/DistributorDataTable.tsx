import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import type { RowType } from 'src/pages/dashboard/distributor';


interface propsType {
    title: string,
    head: string[],
    rows: RowType[]
}

export default function InventoryTable({ title = '', rows, head }: propsType) {
    return (
        <TableContainer component={Paper}>
            <Typography
                sx={{ flex: '1 1 100%', p: 2, fontSize: 'xl', color: 'gray', fontWeight: 'semibold' }}
                variant="h5"

                component="div"
            >
                {title || ''}
            </Typography>
            <Scrollbar>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {head.map(item => <TableCell key={item} align="left">{item}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.address}</TableCell>
                                <TableCell align="left">{row.phoneNumber}</TableCell>
                                <TableCell align="left">{row.ordersEmailAddress}</TableCell>
                                <TableCell align="left">{row.apEmailAddress}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Scrollbar>
        </TableContainer>
    );
}