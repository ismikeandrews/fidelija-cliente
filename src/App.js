import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'fontsource-roboto';
import './App.css';

import { Dashboard } from './Layouts';
import { UnprotectedRoute } from './unprotected.route';
import { ProtectedRoute } from './protected.route';
import { Welcome, Login, Register, Home, History, Prizes, Profile, Services, Plans, About, NotFound } from './pages';
import { authService } from './services';


export default function App(props) {
  const [stablishment, setStablishment] = useState('');

  useEffect(() => {
    const user = authService.getLoggedUser();
    const stablishment = user.stablishment;
    console.log(stablishment);
    setStablishment(stablishment);
  }, [])

  return (
     <BrowserRouter>
        <Switch>
          <UnprotectedRoute path="/" exact component={Welcome}/>
          <UnprotectedRoute path="/login" component={Login}/>
          {/* <UnprotectedRoute path="/register" component={Register}/> */}
          <UnprotectedRoute path="/plans" component={Plans}/>
          <UnprotectedRoute path="/about" component={About}/>
          <ProtectedRoute path="/dashboard/history" component={History}/>
            <ProtectedRoute path="/dashboard/register" component={Register}/>
            <ProtectedRoute path="/dashboard/home" component={Home}/>
            <ProtectedRoute path="/dashboard/prizes" component={Prizes}/>
            <ProtectedRoute path="/dashboard/profile" component={Profile}/>
            <ProtectedRoute path="/dashboard/services" component={Services}/>
        <Route path="*" component={NotFound}/>
        </Switch>
      </BrowserRouter>
    );
};
