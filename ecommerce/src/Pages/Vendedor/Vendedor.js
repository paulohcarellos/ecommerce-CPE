import React, {useState, useEffect} from 'react';
import { Nav, Button, Dropdown, DropdownButton} from 'react-bootstrap'
import { FaShoppingCart } from "react-icons/fa";
import {useHistory} from 'react-router-dom';
import {fotos} from "./Fotos";
import Header from '../../Components/Header'
import {getUser} from '../../Components/tools'
import "./Vendedor.css"

function Vendedor() {

    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(async () => {
        getUser().then(user => setUser(user))
    }, [])

    function Compra(){
        history.push("venda")
    }

    return(
        <div id="paginaVendedor">
            <Header user={user}/>
            <div id="bodyVendedor">
                {fotos.map( (foto) => {
                        return(
                            <div id="componentesv">
                                <div id="informacao">
                                    <h4>Nome: {foto.nomev}</h4>
                                    <h4>Sobrenome: {foto.sobrenome}</h4>
                                    <h4>Email: {foto.email}</h4>
                                    <h4>Cidade: {foto.cidade}</h4>
                                    <h4>Telefone: {foto.telefone}</h4>
                                </div>
                                <div id="atributosv">
                                    <h3>{foto.nome}</h3>
                                    <img id="img" alt={foto.descricao} src={foto.url}></img>
                                    <h5>{foto.descricao}</h5>
                                    <h4>{foto.preco}</h4>
                                    <h4>Estoque - {foto.estoque}</h4>
                                </div> 
                                <div id="item1v">
                                    <Nav id="Botãov">
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
