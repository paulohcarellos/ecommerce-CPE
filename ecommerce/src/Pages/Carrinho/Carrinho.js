import React, {useState} from 'react';
import { Nav, Navbar, FormControl, InputGroup, Button, Dropdown, DropdownButton}from 'react-bootstrap'
import { VscAccount } from "react-icons/vsc";
import { FaShoppingCart } from "react-icons/fa";
import {useHistory} from 'react-router-dom';
import "./Carrinho.css"
import { Link } from 'react-router-dom';

function Carrinho() {
    const history = useHistory();
    function Compra(){
        alert("Pedido realizado com sucesso")
        history.push("home")
    }
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href="/carrinho"
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
          &#x25bc;
        </a>
      ));

    const [value, setValue] = useState('');
    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            
        
        return (
            <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
            >
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Filtrar..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                    (child) =>
                        !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
            );
            },
      );

    return(
        <div id="paginaCarrinho">
            <div id="cabecalhoCarrinho">
                <Navbar id="navbar" expand="lg">
                    <Navbar.Brand id="logotipo" href="/home"><img src="/imagens/logo.svg" alt="Logo" id="Logo"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
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
                            <div id="tags">
                                <Dropdown className="mr-1 ml-2">
                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                    Categorias
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu as={CustomMenu}>
                                        <Dropdown.Item eventKey="1">Tecnologia</Dropdown.Item>
                                        <Dropdown.Item eventKey="2">Casa e eletrodomésticos</Dropdown.Item>
                                        <Dropdown.Item eventKey="3">Esporte e Lazer</Dropdown.Item>
                                        <Dropdown.Item eventKey="4">Moda e Beleza</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Link to="#ofertas" className="ml-2 mr-2">Ofertas do dia</Link>
                                <Link to="#vendas" className="ml-1 mr-2">Venda aqui!</Link>
                            </div>
                        </Nav>
                        <Nav id="nav2">
                            <Navbar.Brand href="/login">
                                <VscAccount id="fotoPerfil" className="ml-2 mr-2"/>
                                Entrar
                            </Navbar.Brand>
                            
                            <Navbar.Brand href="/carrinho">
                                <FaShoppingCart id="fotoCarrinho" className="ml-2 mr-2"/>
                                Carrinho
                            </Navbar.Brand>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <div id="bodyCarrinho">
                <Nav id="nav3">
                    <Nav id="Inicio">
                        <FaShoppingCart id="fotoCarrinho" className="ml-2 mr-2"/>
                    </Nav>
                </Nav>
                <div id="linha1"/>
                <div id="Produto">
                    <div id="Produto1">
                        <img src="/imagens/Tenis.png" alt="Tenis" id="Tenis"/>
                        <div id="Atributos">
                            <Nav id="Nome">
                                Tênis Adidas
                            </Nav>
                            <Nav id="Preco">
                                R$ 199,99
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
                        <img src="/imagens/Bolsa.jpeg" alt="Bolsa" id="Bolsa"/>
                        <div id="Atributos">
                            <Nav id="Nome">
                                Bolsa de Couro
                            </Nav>
                            <Nav id="Preco">
                                R$ 79,99
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
                <div id="linha1"/>
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
