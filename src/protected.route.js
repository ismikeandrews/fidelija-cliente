import React, {useState, useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Dashboard } from './Layouts';

import { authService } from './services'

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const [stablishment, setStablishment] = useState('');

    useEffect(() => {
        const user = authService.getLoggedUser();
        const stablishment = user.stablishment;
        setStablishment(stablishment);
    }, [])

    return (
        <>
            {/* {stablishment ? (
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
            </Dashboard>) : (
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
            )} */}
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
        </>
    );

    

};