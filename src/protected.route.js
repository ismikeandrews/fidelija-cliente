import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Dashboard } from './Layouts';

import { authService } from './services'

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Dashboard>
            <Route {...rest} render={
                (props) =>{
                    if(authService.isAuthenticated()){
                        return <Component {...props}/>
                    }else{
                        return <Redirect to={
                            {
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }
                        }/>
                    }
                }
            }/>
        </Dashboard>
    );
};