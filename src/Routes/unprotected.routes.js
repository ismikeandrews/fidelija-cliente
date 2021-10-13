import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthService } from '../Services'

export const Unprotected = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) =>{
                if(!AuthService.isAuthenticated()){
                    return <Component {...props}/>
                }else{
                    return <Redirect to={
                        {
                            pathname: "/dashboard/home",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }
            }
        }/>
    );
};