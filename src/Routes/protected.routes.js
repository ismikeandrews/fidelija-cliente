import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Dashboard } from '../Components';

import { AuthService } from '../Services'

export const Protected = ({component: Component, ...rest}) => {
    return (
        <>
            <Dashboard>
                <Route {...rest} render={
                    (props) =>{
                        if(AuthService.isAuthenticated()){
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
        </>
    );
};