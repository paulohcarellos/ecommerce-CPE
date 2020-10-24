import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Cadastro from './Pages/Cadastro';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Testing from './Pages/Testing'

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro" component={Cadastro}/>
                <Route path="/home" component={Home}/>
                <Route path="/testing" component={Testing}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
