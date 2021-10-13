import React from 'react';
import { Button } from '@material-ui/core';
import { useFormikContext } from 'formik';

const ButtonWrapper = ({children, ...otherProps}) => {

    const configButton = {
        ...otherProps,
        variant: 'contained',
        color: 'primary',
    }

    return (
        <Button {...configButton} onClick={otherProps.onClick}>
            {children}
        </Button>
    )
}

export default ButtonWrapper