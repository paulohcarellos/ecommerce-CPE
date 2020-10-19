import React from 'react';
import {Form, Button} from 'react-bootstrap';
import './Login.css';

function Login() {
    return(
        <pagina>
            <div className="cabecalho">
                <div className="logo">
                    <img src="/imagens/BHTP.png" alt="logo"></img>
                </div>
            </div>
            <div className="geral">
                <div className="container">
                    <h1><b>ENTRAR</b></h1>
                    <h3>E-commerce</h3>
                    <Form className="inputs">
                        <Form.Group controlId="email">
                            <Form.Control type="email" placeholder="Email"/>
                        </Form.Group>
                        <Form.Group controlId="senha">
                            <Form.Control type="password" placeholder="Senha"/>
                        </Form.Group>
                        <Button variant="info">Login</Button>{' '}
                        <Button variant="secondary">Criar conta</Button>{' '}
                    </Form>
                </div>
            </div>
        </pagina>
    );
}

export default Login;
