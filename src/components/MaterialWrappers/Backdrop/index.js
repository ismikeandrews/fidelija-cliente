import React from 'react';
import { Backdrop as MuiBackdrop, CircularProgress, makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}))

const Backdrop = (props) => {
    const classes = styles();
    
    return (
        <MuiBackdrop className={classes.backdrop} open={props.open}>
            <CircularProgress color="inherit" />
        </MuiBackdrop>
    )
}

export default Backdrop;
