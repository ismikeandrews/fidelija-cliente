import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button }  from '@material-ui/core';

import { colorSchema } from '../../../Styles/colorSchema';

export const BLink = styled(Link)`
    text-decoration: none;
`;

export const MButton = styled(Button)`
    &&{
        background: ${(props) => (props.primary ? colorSchema.lprimary : colorSchema.lsecondary)};
        font-size: 15px;
        border-radius: 50px;
        padding: ${(props) => (props.large ? '15px 50px' : '9px 25px;')};
        font-weight: 900;
        color: ${colorSchema.white};
        ${props => props.block && 'display: block;'}

        &:hover{
            background: ${(props) => (props.primary ? colorSchema.white : colorSchema.dsecondary)};
            color: ${(props) => (props.primary ? colorSchema.black : colorSchema.white)};
        };
    };
`;