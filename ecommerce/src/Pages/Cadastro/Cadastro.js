import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import './Cadastro.css';

function Cadastro() {
    const [primeiroNome, setPrimeiroNome] = useState();
    const [ultimoNome, setUltimoNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [estado, setEstado] = useState();
    const [cidade, setCidade] = useState();
    const [endereco, setEndereco] = useState();
    const [celular, setCelular] = useState();
    const [cpf, setCPF] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const history = useHistory();

    function register() {
        fetch('http://localhost:3030/register', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                first_name: primeiroNome,
                last_name: ultimoNome, 
                email: email, 
                password: senha, 
                state: estado, 
                city: cidade, 
                adress: endereco, 
                phone: celular, 
                cpf: cpf, 
                birthdate: dataNascimento, 
                created_at: 'TODO'
            })
        }).catch((error) => console.log(error));
    }

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
                            <Form.Group controlId="primeiroNome">
                                <Form.Control type="text" placeholder="Primeiro Nome" onChange={(e)=>{setPrimeiroNome(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group controlId="ultimoNome">
                                <Form.Control type="text" placeholder="Ultimo Nome" onChange={(e)=>{setUltimoNome(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Control type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group controlId="senha">
                                <Form.Control type="password" placeholder="Senha" onChange={(e)=>{setSenha(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group controlId="estado">
                                <Form.Control type="text" placeholder="Estado" onChange={(e)=>{setEstado(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group controlId="cidade">
                                <Form.Control type="text" placeholder="Cidade" onChange={(e)=>{setCidade(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group controlId="endereço">
                                <Form.Control type="text" placeholder="Endereço" onChange={(e)=>{setEndereco(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group controlId="celular">
                                <Form.Control type="text" placeholder="Celular" onChange={(e)=>{setCelular(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group controlId="cpf">
                                <Form.Control type="text" placeholder="CPF" onChange={(e)=>{setCPF(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group controlId="dataNascimento">
                                <Form.Control type="text" placeholder="Data de Nascimento" onChange={(e)=>{setDataNascimento(e.target.value)}}/>
                            </Form.Group>
                            <Button variant="outline-dark" onClick={register}>Cadastrar</Button>
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
