import React from 'react';

import { 
    BLink, 
    MButton 
} from './lButtonElements';

const LButton = (props) => {
    return (
        <BLink to={props.redirectTo} onClick={props.onClick}>
            <MButton variant="contained" primary={props.primary} large={props.large}>
                {props.children}
            </MButton>
        </BLink>
    )
}

export default LButton;
