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
                    <div id="nomeDoProduto">Nome do produto</div>
                    <div id="descriçaoComImagem">
                        <img id="imagemDoProduto" src="./imagens/Bolsa.png" alt="logo"></img>
                        <div id="desciçaoDoProduto">
                            TExtinho ddddddddd ddddddddddddddddg gggggggggg gggggs ssssssssssss sssssssals kdlkajsdlkj alksj skjaklsjd lasksdlajs lshl djalksjd lajsdlj alsdjasljdhaslj asldjasljh dsssssssss
                        </div>
                    </div>
                        <div>
                            Preço
                        </div>
                        <Button variant="outline-dark">Adicionar ao Carrinho</Button>
                </div>   
            </div>
            

            <Footer />
        </div>
    )
}

export default Produto;