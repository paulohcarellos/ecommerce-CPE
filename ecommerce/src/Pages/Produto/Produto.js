import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { getUser, getProduct, addCart } from '../../Components/tools'
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header";
import "./Produto.css"

function Produto() {

    const productId = useParams().id;
    const [user, setUser] = useState(null);
    const [product, setProduct] = useState(null);
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
        const fetchProduct = async () => {
            getProduct(productId)
            .then(product=> setProduct(product))
            .catch((err) => (console.log(err)));
        }
        
        fetchProduct();
    }, []);

    useEffect(() => {
        if (product === undefined){
            history.push('/home')
        }
    }, [product]);

    const addCartFunc = async () => {
        if (await addCart(user.body.id, product.id, product.price, 0, 1))
            history.push('/carrinho')
        else
            alert('something went wrong!')
    }

    return(
        <div id="divProduto">
            <Header user={user}/>
            <div id="produtoPai">
                <div id="produtoDisplay">
                    <div id="nomeDoProduto"> 
                        <h1>{product !== null && product !== undefined && product.name}</h1>
                    </div>
                    <div id="descriçaoComImagem">
                        <img id="imagemDoProduto" src={product !== null && product !== undefined && ('http://localhost:3030/product/image/' + product.image)}></img>
                        <div id="desciçaoDoProduto">{product !== null && product !== undefined && product.description}</div>
                    </div>
                        <div>
                            <h3>{product !== null && product !== undefined && product.price}</h3>
                        </div>
                        <Button variant="outline-dark">Adicionar ao Carrinho</Button>
                </div>   
            </div>
            <Footer />
        </div>
    )
}

export default Produto;