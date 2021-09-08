import React, { useState, useEffect } from 'react';
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
  Wallet,
  CreatePrize,
  EditPrize,
  CreateCreditCard,
  Register,
  EditAddress,
  Employee
} from './pages';
import { SnackbarProvider } from 'notistack'

export default function App(props) {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'top', horizontal: 'right'}} hideIconVariant>
      <BrowserRouter>
          <Switch>
            <UnprotectedRoute path="/" exact component={Welcome}/>
            <UnprotectedRoute path="/login" component={Login}/>
            <UnprotectedRoute path="/register" component={Register}/>
            <UnprotectedRoute path="/plans" component={Plans}/>
            <UnprotectedRoute path="/about" component={About}/>
            <ProtectedRoute path="/dashboard/users" component={Users}/>
            <ProtectedRoute path="/dashboard/create-cc" component={CreateCreditCard}/>
            <ProtectedRoute path="/dashboard/prizes" component={Prizes}/>
            <ProtectedRoute path="/dashboard/create-prize" component={CreatePrize}/>
            <ProtectedRoute path="/dashboard/edit-prize/:id" component={EditPrize}/>
            <ProtectedRoute path="/dashboard/edit-address/:id" component={EditAddress}/>
            <ProtectedRoute path="/dashboard/profile" component={Profile}/>
            <ProtectedRoute path="/dashboard/services" component={Services}/>
            <ProtectedRoute path="/dashboard/home" component={Home}/>
            <ProtectedRoute path="/dashboard/history" component={History}/>
            <ProtectedRoute path="/dashboard/subscription" component={Subscription}/>
            <ProtectedRoute path="/dashboard/payment" component={Payment}/>
            <ProtectedRoute path="/dashboard/wallet" component={Wallet}/>
            <ProtectedRoute path="/dashboard/employee" component={Employee}/>
          </Switch>
        </BrowserRouter>
    </SnackbarProvider>
    );
};
