import React from 'react';
import {Form, Button} from 'react-bootstrap';
import './Login.css';

function Login() {
    return(
        <pagina>
            <div className="cabecalho">
                <div className="titulo">
                    <p>Bem-vindo(a) ao e-commerce que mais satisfaz clientes!</p>
                </div>
            </div>
            <div className="geral">
                <div className="container">
                    <h1><b>Entrar</b></h1>
                    <Form className="inputs">
                        <Form.Group controlId="email">
                            <Form.Control type="email" placeholder="Email"/>
                        </Form.Group>
                        <Form.Group controlId="senha">
                            <Form.Control type="password" placeholder="Senha"/>
                        </Form.Group>
                        <Button variant="light">Login</Button>{' '}
                        <Button variant="light">Criar conta</Button>{' '}
                    </Form>
                </div>
            </div>
            <div className="rodape">
                <p>Desenvolvido por CPEJr.</p>
            </div>
        </pagina>
    );
}

export default Login;
