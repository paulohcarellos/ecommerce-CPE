import React, {useState, useEffect} from 'react';
import { Nav, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { FaShoppingCart } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import { getUser, getCart, removeCart, getProduct } from '../../Components/tools'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer/Footer'
import "./Carrinho.css"

function Carrinho() {

    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([])
    const history = useHistory();

    useEffect(() => {
        const fetchUser = async () => {
            getUser()
            .then(user => setUser(user))
            .catch((err) => (console.log(err)));
        }
        
        fetchUser();
    }, [])

    useEffect(() => {
        const fetchCart = async () => {
            getCart()
            .then(cart => setCart(cart))
            .catch((err) => (console.log(err)));
        }
        
        fetchCart();
    }, []);

    useEffect(() => {
        if (user !== null) {
            if (!user.logged)
                history.push('login')
        }
    }, [user]);

    function Compra(){
        alert("Pedido realizado com sucesso")
        history.push("home")
    }

    const removeCartFunc = (id) => {
        const cartItem = cart.find(item => item.id == id);
        removeCart(cartItem);
    }

    console.log(cart);

    return(
        <div id="paginaCarrinho">
            <Header user={user}/>
            <div id="bodyCarrinho">
                <Nav id="nav3">
                    <Nav id="Inicio">
                        <FaShoppingCart id="fotoCarrinho" className="ml-2 mr-2"/>
                        <h1>Meu carrinho</h1>
                    </Nav>
                </Nav>
                <div id="linha1"/>
                    {cart.map((item, index) => {
                        console.log(index);
                        return(
                            <div id="componentes">
                                <div id="atributos">
                                    <h3>{item.name}</h3>
                                    <img id="img" src={'http://localhost:3030/product/image/' + item.image}></img>
                                    <h4>R${item.price}</h4>
                                    <h4>Estoque: {item.quantity}</h4>
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
                                        <Button variant="outline-info" onClick={e => removeCartFunc(item.id)}>Remover Item</Button>
                                    </Nav>
                            </div> 
                        )
                    })}
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
            <Footer />
        </div>
        
    );
        
}

export default Carrinho;
