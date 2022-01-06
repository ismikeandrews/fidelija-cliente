import React from 'react'
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button, TextField } from '@material-ui/core';

const ActionDialog = (props) => {
    return (
       <Dialog open={props.open} onClose={props.close}>
           <DialogTitle>
                {props.title !== '' ? props.title : "Aviso"}
           </DialogTitle>
           <DialogContent>
                <DialogContentText>
                    {props.text}
                </DialogContentText>
                {props.inputActive && (
                    <TextField autoFocus margin="dense" label={props.inputLabel} type="text" value={props.inputValue} onChange={e => props.parentCallback(e.target.value)} required fullWidth/>
                )}
           </DialogContent>
           <DialogActions>
               <Button variant="contained" color="secondary" onClick={props.close}>
                    Cancelar
               </Button>
               {props.inputActive ? (
                    <Button variant="contained" disabled={props.inputValue === ""} color="primary" onClick={props.action}>
                            Continuar
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={props.action}>
                            Continuar
                    </Button>
                )}
           </DialogActions>
       </Dialog>
    )
}

export default ActionDialog;