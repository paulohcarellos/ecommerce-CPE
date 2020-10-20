import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import './Cadastro.css';

function Cadastro() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    return(
        <pagina className="page">
            <div className="cabecalho">
                <div className="titulo">
                    <p>Bem-vindo(a) ao e-commerce que mais satisfaz clientes!</p>
                </div>
            </div>
            <div className="geral">
                <div className="container">
                        <h1><b>Cadastrar Usuário</b></h1>
                        <Form className="inputs">
                            <Form.Group controlId="nome">
                                <Form.Control type="nome" placeholder="Nome" onChange={(e)=>{setEmail(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Control type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group controlId="senha">
                                <Form.Control type="password" placeholder="Senha" onChange={(e)=>{setPassword(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group controlId="endereço">
                                <Form.Control type="endereço" placeholder="Endereço" onChange={(e)=>{setEmail(e.target.value)}}/>
                            </Form.Group>
                            <Button variant="outline-dark" onClick={()=>history.push("home")}>Cadastrar</Button>
                        </Form>
                </div>
            </div>
            <div className="rodape">
                <p>Desenvolvido por CPEJr.</p>
            </div>
        </pagina>
    );
}

export default Cadastro;
