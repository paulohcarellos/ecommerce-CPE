import React, {useState, useEffect} from 'react';
import { Nav, Button, Dropdown, DropdownButton} from 'react-bootstrap'
import { FaShoppingCart } from "react-icons/fa";
import {useHistory} from 'react-router-dom';
import Header from '../../Components/Header'
import {getUser} from '../../Components/tools'
import "./Carrinho.css"

function Carrinho() {

    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const fetchUser = async () => {
            getUser()
            .then(user => setUser(user))
            .catch((err) => (console.log(err)));
        }
        
        fetchUser();
    }, [])

    function Compra(){
        alert("Pedido realizado com sucesso")
        history.push("home")
    }

    return(
        <div id="paginaCarrinho">
            <Header user={user}/>
            <div id="bodyCarrinho">
                <Nav id="nav3">
                    <Nav id="Inicio">
                        <FaShoppingCart id="fotoCarrinho" className="ml-2 mr-2"/>
                    </Nav>
                </Nav>
                <div id="linha1"/>
                <div id="Produto">
                    <div id="Produto1">
                        <div id="Imagem">
                            <h3>Playstation 5</h3>
                            <img src="/imagens/PlayStation5.jpg" alt="Item1" id="Item1"/>
                            <h4>R$ 4000,00</h4>
                        </div>
                        <div id="Atributos">
                            <Nav id="Vendedor">
                                Vendedor - Caio
                            </Nav>
                            <Nav id="Prazo">
                                Prazo - 7 dias
                            </Nav>
                            <Nav id="Estoque">
                                Estoque - 3
                            </Nav>
                            <Nav id="Compras">
                                Compras - 172
                            </Nav>
                        </div>
                        <DropdownButton id="dropdown-basic-button" title="Quantidade Itens" variant='Success'>
                            <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">4</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">5</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">6</Dropdown.Item>
                        </DropdownButton>
                        <Nav id="Botão">
                            <Button variant="outline-info" onClick={()=>history.push("carrinho")}>Remover Item</Button>
                        </Nav>
                    </div>
                </div>
                <div id="linha"/>
                <div id="Produto">
                    <div id="Produto2">
                        <div id="Imagem">
                            <h3>Samsung TV</h3>
                            <img src="/imagens/SamsungSmartTV50CrystalUHD.jpg" alt="Item2" id="Item2"/>
                            <h4>R$ 3000,00</h4>
                        </div>
                        <div id="Atributos">
                            <Nav id="Vendedor">
                                Vendedor - João
                            </Nav>
                            <Nav id="Prazo">
                                Prazo - 12 dias
                            </Nav>
                            <Nav id="Estoque">
                                Estoque - 2
                            </Nav>
                            <Nav id="Compras">
                                Compras - 72
                            </Nav>
                        </div>
                        <DropdownButton id="dropdown-basic-button" title="Quantidade Itens" variant="Secondary">
                            <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">4</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">5</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">6</Dropdown.Item>
                        </DropdownButton>
                        <Nav id="Botão">
                            <Button variant="outline-info" onClick={()=>history.push("carrinho")}>Remover Item</Button>
                        </Nav>
                    </div>
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
