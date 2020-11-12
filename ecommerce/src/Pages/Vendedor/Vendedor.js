import React, {useState, useEffect} from 'react';
import { Nav, Button, Dropdown, DropdownButton} from 'react-bootstrap'
import { FaShoppingCart } from "react-icons/fa";
import {useHistory} from 'react-router-dom';
import {fotos} from "./Fotos";
import Carousel from "react-elastic-carousel";
import Header from '../../Components/Header'
import {getUser} from '../../Components/tools'
import "./Vendedor.css"

function Carrinho() {

    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(async () => {
        getUser().then(user => setUser(user))
    }, [])

    function Compra(){
        alert("Pedido realizado com sucesso")
        history.push("home")
    }

    return(
        <div id="paginaVendedor">
            <Header user={user}/>
            <div id="bodyVendedor">
                <Nav id="nav3">
                    <Nav id="Inicio">
                        <FaShoppingCart id="fotoPerfil" className="ml-2 mr-2"/>
                    </Nav>
                </Nav>
                <div id="linha1"/>
                    {fotos.map( (foto) => {
                        return(
                            <div id="componentes-vendedor">
                                <div id="atributos">
                                    <h3>{foto.nome}</h3>
                                    <img id="img" alt={foto.descricao} src={foto.url}></img>
                                    <h5>{foto.descricao}</h5>
                                    <h4>{foto.preco}</h4>
                                    <h4>Estoque - {foto.estoque}</h4>
                                </div> 
                            </div> 
                        )
                    })}
                    <div id="item1">
                        <DropdownButton id="dropdown-basic-button" title="Quantidade Itens" variant='Success'>
                            <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">4</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">5</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">6</Dropdown.Item>
                        </DropdownButton>
                        <Nav id="Botão">
                            <Button variant="outline-info" onClick={()=>history.push("home")}>Remover Item</Button>
                        </Nav>
                    </div>
                <div id="linha2"/>
                <div id="Rodape">
                    <div id="entrega">
                        <h2>Envio para Belo Horizonte-MG</h2>
                        <h5>12 dias úteis para entrega</h5>
                    </div>
                    <Nav id="Comprar">
                        <Button variant="outline-primary" size="lg" onClick={Compra}>Finalizar Pedido</Button>
                    </Nav>
                </div>
            </div>
        </div>
        
    );
        
}

export default Carrinho;
