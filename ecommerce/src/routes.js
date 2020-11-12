import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Cadastro from './Pages/Cadastro';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Carrinho from './Pages/Carrinho';
import Venda from './Pages/Venda'
import Vendedor from './Pages/Vendedor'
import Testing from './Pages/Testing'

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro" component={Cadastro}/>
                <Route path="/home" component={Home}/>
                <Route path="/testing" component={Testing}/>
                <Route path="/carrinho" component={Carrinho}/>
                <Route path="/venda" component={Venda}/>
                <Route path="/vendedor" component={Vendedor}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
