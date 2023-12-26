import React from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell'
import { Button } from '@mui/material'
import api from '../../utility';
import { useState } from 'react';

function OrderPageRow({ row }) {
    const [dipatchLoader,setDispatchLoader] = useState(false);
    const [status,setStatus] = useState(row.status);

    const markasshipped = async (e) => {
        let orderId = e.target.getAttribute('id');
        setDispatchLoader(true);
        try {
            let res = await api.patch(`/order/markdis/${orderId}`);
            if (res && res.status === 200) {
                setStatus('dispatched')
                setDispatchLoader(false);
            }
        } catch (err) {
            window.alert(err.message);
            setDispatchLoader(false);
        }
    }
    return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
            <TableCell align='center'>{row._id}</TableCell>
            <TableCell align='center'>{row.address}</TableCell>
            <TableCell align='center'>{row.dateBought.substring(0, row.dateBought.indexOf('T'))}</TableCell>
            <TableCell align='center'>{status}</TableCell>
            <TableCell align='center'>
                <Button id={row._id} onClick={markasshipped} variant='contained' color='success' disableElevation disabled={status !== 'bought' || dipatchLoader}>Mark as Shipped</Button>
            </TableCell>
        </TableRow>
    )
}

export default OrderPageRow