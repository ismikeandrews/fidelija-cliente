import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'fontsource-roboto';
import './App.css';

import { ProtectedRoute } from './protected.route';
import { Welcome, Login, Register, Home, History, Prizes, Profile, Services, Plans, About, NotFound } from './pages';

export default function App(props) {
  return (
     <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/plans" component={Plans}/>
          <Route path="/about" component={About}/>
          <ProtectedRoute path="/dashboard/history" component={History}/>
          <ProtectedRoute path="/dashboard/home" component={Home}/>
          <ProtectedRoute path="/dashboard/prizes" component={Prizes}/>
          <ProtectedRoute path="/dashboard/profile" component={Profile}/>
          <ProtectedRoute path="/dashboard/services" component={Services}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </BrowserRouter>
    );
};
