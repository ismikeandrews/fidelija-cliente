import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';
import InputMask from 'react-input-mask';

function MaskedTextFieldWrapper({ name, ...otherProps }){
    const [field, meta] = useField(name)

    const configTextfield = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined',
        maskChar: "",
    }

    if(meta && meta.touched && meta.error){
        configTextfield.error = true;
        configTextfield.helperText = meta.error
    }

    return (
        <InputMask {...configTextfield}>
            {(props) => (
                <TextField {...props}/>
            )}
        </InputMask>
    )
}

export default MaskedTextFieldWrapper;