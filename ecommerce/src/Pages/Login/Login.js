import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const history = useHistory();

    function login() {
        fetch('http://localhost:3030/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(response => {
            if(!response.found) {
                setError('Usuário ou senha inválidos')
                document.querySelector('.notFound').style.display = 'block';
            }
        });
    }

    return(
        <div className="page">
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
                                <Form.Control type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group controlId="senha">
                                <Form.Control type="password" placeholder="Senha" onChange={(e)=>{setPassword(e.target.value)}}/>
                            </Form.Group>
                            <div className="notFound">
                                Usuário e senha inválidos
                            </div>
                            <Button variant="outline-dark" onClick={login}>Login</Button>
                            
                            <hr/>
                            
                            <Button variant="outline-dark" onClick={()=>history.push("cadastro")}>Criar conta</Button>
                        </Form>
                </div>
            </div>
            <div className="rodape">
                <p>Desenvolvido por CPEJr.</p>
            </div>
        </div>
    );
}

export default Login;
