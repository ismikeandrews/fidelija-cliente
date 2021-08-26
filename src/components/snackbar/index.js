import React from 'react';
import { Snackbar as MuiSnackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export default function Snackbar(props){
    return (
        <MuiSnackbar open={props.toggleSnack} autoHideDuration={props.time} onClose={props.onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={props.onClose} severity={props.color} variant="filled">
                {props.children}
            </Alert>
        </MuiSnackbar>
    )
}