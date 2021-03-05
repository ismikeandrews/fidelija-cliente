import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import 'fontsource-roboto';

import { Dashboard } from './Layouts';
import { Welcome, Login, Register, Home, History, Prizes, Profile, Services, Plans, About } from './pages';

export default function App(props) {
  return (
    // <BrowserRouter>
    //   <Dashboard>
    //       <Switch>
    //         <Route path="/dashboard/history" component={History}/>
    //         <Route path="/dashboard/home" component={Home}/>
    //         <Route path="/dashboard/prizes" component={Prizes}/>
    //         <Route path="/dashboard/profile" component={Profile}/>
    //         <Route path="/dashboard/services" component={Services}/>
    //         <Route path="/dashboard/subscription" component={Subscription}/>
    //       </Switch>
    //   </Dashboard>
    // </BrowserRouter>
     <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/plans" component={Plans}/>
          <Route path="/about" component={About}/>
        </Switch>
      </BrowserRouter>
    );
};
