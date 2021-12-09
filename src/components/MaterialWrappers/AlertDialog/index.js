import React from 'react'
import { Link } from 'react-router-dom';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@material-ui/core';

const AlertDialog = (props) => {
    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle>
                {props.title !== '' ? props.title : "Aviso"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {props.link !== '' ? (
                    <Button component={Link} to={props.link} variant="contained" color="primary">
                        Verificar
                    </Button>
                ) : (
                    <Button onClick={props.close} color="primary">
                        Continuar
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog
