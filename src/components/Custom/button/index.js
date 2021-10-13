import React from 'react';

import { MButton } from './buttonElements';

const Button = (props) => {
    return (
        <MButton variant="contained" onClick={props.onClick} primary={props.primary} large={props.large} endIcon={props.icon}>
            {props.children}
        </MButton>
    );
};

export default Button;
