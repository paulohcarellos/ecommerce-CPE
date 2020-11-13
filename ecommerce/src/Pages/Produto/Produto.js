import React from "react";
import { Button, Form } from "react-bootstrap";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header";
import "./Produto.css"

function Produto(){
    return(
        <div id="divProduto">
            <Header />
            <div id="produtoPai">
                <div id="produtoDisplay">
                    <div id="nomeDoProduto"> 
                        <h1>Nome do produto</h1>
                    </div>
                    <div id="descriçaoComImagem">
                        <img id="imagemDoProduto" src="./imagens/Bolsa.png" alt="logo"></img>
                        <div id="desciçaoDoProduto">
                            TExssssssssssssss s s s s s s
                        </div>
                    </div>
                        <div>
                            <h3>Preço</h3>
                        </div>
                        <Button variant="outline-dark">Adicionar ao Carrinho</Button>
                </div>   
            </div>
            

            <Footer />
        </div>
    )
}

export default Produto;