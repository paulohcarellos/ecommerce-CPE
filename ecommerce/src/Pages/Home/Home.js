import React, {useState} from 'react';
import { Nav, Navbar, FormControl, InputGroup, Button, Dropdown}from 'react-bootstrap'
import { VscAccount } from "react-icons/vsc";
import { FaShoppingCart } from "react-icons/fa";
import "./Home.css"
import { Link } from 'react-router-dom';

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
            <div id="cabecalhoHome">
                <Navbar id="navbar" fixed="top" expand="lg">
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
        
    );

}

export default Home;
