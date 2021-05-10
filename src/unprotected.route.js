import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { authService } from './services'

export const UnprotectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) =>{
                if(!authService.isAuthenticated()){
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