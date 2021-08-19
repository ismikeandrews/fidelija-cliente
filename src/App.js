import React, { useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import 'fontsource-roboto';
import './App.css';

import { UnprotectedRoute } from './unprotected.route';
import { ProtectedRoute } from './protected.route';
import { 
  Welcome, 
  Login, 
  Home, 
  Users, 
  Prizes, 
  Profile, 
  Services, 
  Plans, 
  About, 
  NotFound, 
  History,  
  Subscription, 
  Payment,
  Wallet 
} from './pages';

import { getToken, onMessageListener } from './firebase';

export default function App(props) {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);

  getToken(setTokenFound);

  onMessageListener().then(payload => {
    setShow(true);
    setNotification({title: payload.notification.title, body: payload.notification.body})
    console.log(
      
    );
  }).catch(err => console.log('failed: ', err));

  return (
     <BrowserRouter>
        <Switch>
          <UnprotectedRoute path="/" exact component={Welcome}/>
          <UnprotectedRoute path="/login" component={Login}/>
          <UnprotectedRoute path="/plans" component={Plans}/>
          <UnprotectedRoute path="/about" component={About}/>
          <ProtectedRoute path="/dashboard/users" component={Users}/>
          <ProtectedRoute path="/dashboard/prizes" component={Prizes}/>
          <ProtectedRoute path="/dashboard/profile" component={Profile}/>
          <ProtectedRoute path="/dashboard/services" component={Services}/>
          <ProtectedRoute path="/dashboard/home" component={Home}/>
          <ProtectedRoute path="/dashboard/history" component={History}/>
          <ProtectedRoute path="/dashboard/subscription" component={Subscription}/>
          <ProtectedRoute path="/dashboard/payment" component={Payment}/>
          <ProtectedRoute path="/dashboard/wallet" component={Wallet}/>
        </Switch>
      </BrowserRouter>
    );
};
