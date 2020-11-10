import React, { useState } from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import Header from '../../Components/Header'
import './Venda.css';

function Venda() {

    const [nome, setNome] = useState();
    const [preco, setPreco] = useState();
    const [quantidade, setQuantidade] = useState();
    const [categoria, setCategoria] = useState();
    const [descricao, setDescricao] = useState();
    const [imagem, setImagem] = useState();

    function selectOptions() {
        let options = []

        for (let i = 1; i < 100; i++)
            options.push(<option className="select-quantity">{i}</option>);

        return options
    }

    

    return (
        <div>
            <Header />
            <div id='form-wrapper'>
                <Form className='product-form'>
                    <Form.Group controlId="product-name">
                        <Form.Label>Nome do produto</Form.Label>
                        <Form.Control type="text" placeholder="Insira nome" onChange={(e)=>{setNome(e.target.value)}}/>
                    </Form.Group>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Preço</Form.Label>
                                <Form.Control type="price" placeholder="Insira preço" onChange={(e)=>{setPreco(e.target.value)}}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Quantidade em estoque</Form.Label>
                                <Form.Control as="select" onChange={(e)=>{setQuantidade(e.target.value)}}>
                                    {selectOptions()}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control as="select" onChange={(e)=>{setCategoria(e.target.value)}}>
                            <option>Tecnologia</option>
                            <option>Casa e eletrodomésticos</option>
                            <option>Esporte e Lazer</option>
                            <option>Moda e Beleza</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(e)=>{setDescricao(e.target.value)}}> 
                        </Form.Control>
                    </Form.Group>
                    <Form.File label="Imagem" />
                    <Button className="form-submit" variant="primary" type="submit">
                        Anunciar
                    </Button>
                </Form>
            </div>
        </div> 
    )
}

export default Venda;
