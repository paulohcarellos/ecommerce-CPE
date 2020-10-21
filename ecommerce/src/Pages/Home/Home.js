import React from 'react';
import { Nav, Navbar, FormControl, InputGroup, Button}from 'react-bootstrap'
import { VscAccount } from "react-icons/vsc";
import { FaShoppingCart } from "react-icons/fa";
import "./Home.css"

function Home() {
    return(
            <div id="cabecalhoHome">
                <Navbar id="navbar" fixed="top">
                    <Navbar.Brand href="/home">LOGO</Navbar.Brand>
                    <Nav id="nav1">
                        <InputGroup id="Pesquisar" className="mb-2">
                            <FormControl
                                id="formControl"
                                placeholder="Encontre os melhores produtos..."
                                aria-label="Pesquisar"
                                aria-describedby="basic-addon2"
                                
                            />
                            <InputGroup.Append>
                                <Button variant="outline-dark">Pesquisar</Button>{' '}
                            </InputGroup.Append>
                        </InputGroup>
                    </Nav>
                    <Nav id="nav2">
                        <VscAccount id="fotoPerfil"/>
                        <h4>Entrar</h4>
                        <FaShoppingCart id="fotoCarrinho" className="ml-2"/>
                        <h4>Carrinho</h4>
                    </Nav>
                </Navbar>
    
            </div>
        
    );
}

export default Home;
