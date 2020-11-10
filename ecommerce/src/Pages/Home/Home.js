import React, {useState} from 'react';
import { Nav, Navbar, FormControl, InputGroup, Button, Dropdown, ResponsiveEmbed}from 'react-bootstrap'
import { VscAccount } from "react-icons/vsc";
import { FaShoppingCart } from "react-icons/fa";
import "./Home.css"
import { Link } from 'react-router-dom';

import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import {fotos} from "./Fotos"

function Home() {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href="/home"
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
    const [name, setName] = useState('Entrar');

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

    const breakPoints = [
        { width: 1, itemsToShow: 2 },
        { width: 550, itemsToShow: 3, itemsToScroll: 2 },
        { width: 768, itemsToShow: 4 },
        { width: 1200, itemsToShow: 5 }
    ];

    let user;

    fetch('http://localhost:3030/user', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(response => {
        user = response.body

        if (response.logged) {
            setName(user.first_name);
            document.querySelector('#login-icon').href = '/profile'
        }
    });

    console.log(user);

    return(
        <div id="paginaHome">
            <div id="cabecalhoHome">
                <Navbar id="navbar" expand="lg">
                    <Navbar.Brand href="/home">LOGO</Navbar.Brand>
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
                                <Link to="/venda" className="ml-1 mr-2">Venda aqui!</Link>
                            </div>
                        </Nav>
                        <Nav id="nav2">
                            <Navbar.Brand href="/login" id="login-icon">
                                <VscAccount id="fotoPerfil" className="ml-2 mr-2"/>
                                {name}
                            </Navbar.Brand>
                            <Navbar.Brand href="#carrinho">
                                <FaShoppingCart id="fotoCarrinho" className="ml-2 mr-2"/>
                                Carrinho
                            </Navbar.Brand>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>

            <div className="Carousel">
                <Carousel breakPoints={breakPoints}>
                    {fotos.map( (foto) => {
                        return(
                        <Item>
                            <h2>{foto.nome}</h2>
                            <img id="img" alt={foto.descricao} src={foto.url}></img>
                            <h5>{foto.descricao}</h5>
                            <h4>{foto.preco}</h4>
                        </Item> 
                        )
                    })}
                </Carousel>
            </div>

        </div>
        
    );

}


export default Home;
