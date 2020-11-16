import React, {useState, useEffect} from 'react';
import { Nav, Button } from 'react-bootstrap'
import { FaShoppingCart } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import { getUser, getProductsVendor } from '../../Components/tools'
import Header from '../../Components/Header'
import "./Vendedor.css"

function Vendedor() {

    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchUser = async () => {
            getUser()
            .then(user => setUser(user))
            .catch((err) => (console.log(err)));
        }
        
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchProducts = async (id) => {
            getProductsVendor(id)
            .then(products => setProducts(products))
            .catch((err) => (console.log(err)));
        }

        if (user !== null) {
            if (!user.logged)
                history.push('login')
            else
                fetchProducts(user.body.id);
        }
    }, [user]);

    function Compra(){
        history.push("venda")
    }

    return(
        <div id="paginaVendedor">
            <Header user={user}/>
            <div id="bodyVendedor">
                    <div id="linha1"/>
                        {products !== undefined && products.map( (item) => {
                                return(
                                    <div id="componentes">
                                        <div id="atributos">
                                            <h3>{item.name}</h3>
                                            <img id="img" src={'http://localhost:3030/product/image/' + item.image}></img>
                                            <h4>R${item.price}</h4>
                                            <h4>Estoque: {item.quantity}</h4>
                                        </div> 
                                        <div id="item1">
                                            <Nav id="Botão">
                                                <Button variant="outline-info" onClick={()=>history.push("venda")}>Editar Produto</Button>
                                            </Nav>
                                        </div>
                                    </div> 
                                )
                        })}
                    <div id="linha2"/>
                <div id="Rodape">
                    <div id="entrega">
                        <h2>Envio para as Capitais do sudeste: São Paulo, Rio de Janeiro, Belo Horizonte, Vitória</h2>
                    </div>
                    <Nav id="Comprar">
                        <Button variant="outline-primary" size="lg" onClick={Compra}>Cadastrar Novo Produto</Button>
                    </Nav>
                </div>
            </div>
        </div>
        
    );
        
}

export default Vendedor;