import React from 'react'
import { Switch, BrowserRouter } from 'react-router-dom';
import { Protected } from './protected.routes';
import { Unprotected } from './unprotected.routes'
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
    Employee,
    EditStablishment,
    Notifications,
    Points,
    Sales,
    CreateSale,
    EditSale,
    SendSale
} from '../Pages';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Unprotected path="/" exact component={Welcome}/>
                <Unprotected path="/login" component={Login}/>
                <Unprotected path="/register" component={Register}/>
                <Unprotected path="/plans" component={Plans}/>
                <Unprotected path="/about" component={About}/>
                <Protected path="/dashboard/users" component={Users}/>
                <Protected path="/dashboard/notifications" component={Notifications}/>
                <Protected path="/dashboard/create-cc" component={CreateCreditCard}/>
                <Protected path="/dashboard/prizes" component={Prizes}/>
                <Protected path="/dashboard/create-prize" component={CreatePrize}/>
                <Protected path="/dashboard/edit-prize/:id" component={EditPrize}/>
                <Protected path="/dashboard/edit-stablishment" component={EditStablishment}/>
                <Protected path="/dashboard/edit-address/:id" component={EditAddress}/>
                <Protected path="/dashboard/profile" component={Profile}/>
                <Protected path="/dashboard/services" component={Services}/>
                <Protected path="/dashboard/home" component={Home}/>
                <Protected path="/dashboard/history" component={History}/>
                <Protected path="/dashboard/subscription" component={Subscription}/>
                <Protected path="/dashboard/payment" component={Payment}/>
                <Protected path="/dashboard/wallet" component={Wallet}/>
                <Protected path="/dashboard/employee" component={Employee}/>
                <Protected path="/dashboard/points" component={Points}/>
                <Protected path="/dashboard/sales" component={Sales}/>
                <Protected path="/dashboard/sale/new" component={CreateSale}/>
                <Protected path="/dashboard/sale/edit/:id" component={EditSale}/>
                <Protected path="/dashboard/send/sale" component={SendSale}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
