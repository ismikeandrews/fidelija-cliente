import React from 'react'
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Protected } from './protected.routes';
import { Unprotected } from './unprotected.routes'
import {
    Login, 
    Home, 
    Users, 
    Prizes, 
    Profile, 
    Services, 
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
<<<<<<< HEAD
    Sales,
    CreateSale,
    EditSale,
    SendSale
=======
    Recover,
    Redeem
>>>>>>> 38f90048ed3676129c15ec2337114c7f71088e4c
} from '../Pages';

const Index = () => {
    return <Redirect to="/"/>
}

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Unprotected path="/" exact component={Login}/>
                <Unprotected path="/register" component={Register}/>
                <Unprotected path="/recover" component={Recover}/>
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
                <Protected path="/dashboard/payment/:productId" component={Payment}/>
                <Protected path="/dashboard/wallet" component={Wallet}/>
                <Protected path="/dashboard/employee" component={Employee}/>
                <Protected path="/dashboard/points" component={Points}/>
<<<<<<< HEAD
                <Protected path="/dashboard/sales" component={Sales}/>
                <Protected path="/dashboard/sale/new" component={CreateSale}/>
                <Protected path="/dashboard/sale/edit/:id" component={EditSale}/>
                <Protected path="/dashboard/send/sale" component={SendSale}/>
=======
                <Protected path="/dashboard/redeem" component={Redeem}/>
                <Route path="*" component={Index}/>
>>>>>>> 38f90048ed3676129c15ec2337114c7f71088e4c
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
