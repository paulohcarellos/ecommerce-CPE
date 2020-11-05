import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    function login(){
        if(email === "Hélio" && password === "123"){
            alert("Bem-vindo! " + email);
            history.push("home");
        }else{
            alert("Email ou senha incorretos");
        };
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
                            <Button variant="outline-dark" onClick={login}>Login</Button><hr/>
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
