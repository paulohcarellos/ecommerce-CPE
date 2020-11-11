import React, { useState, useEffect } from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import Header from '../../Components/Header'
import {getUser} from '../../Components/tools'
import './Venda.css';

function Venda() {
    
    const [user, setUser] = useState(null);
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [categoria, setCategoria] = useState('Tecnologia');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');
    const history = useHistory();

    useEffect(async () => {
        getUser().then(user => setUser(user))
    }, [])

    function selectOptions() {
        let options = []

        for (let i = 1; i < 100; i++)
            options.push(<option className="select-quantity">{i}</option>);

        return options
    }

    function register() {

        fetch('http://localhost:3030/sell', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: nome,
                vendor_id: user.body.id,
                price: preco,
                quantity: quantidade,
                description: descricao,
                category: categoria,
                image: imagem,
                created_at: Date.now()
                })
            })
        .then(alert('sent'))
        .catch((error) => console.log(error));
    }

    return (
        <div>
            <Header user={user}/>
            <div id='form-wrapper'>
                <div id="divPai">
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

                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control as="select" onChange={(e)=>{setQuantidade(e.target.value); console.log(quantidade)}}>

                                    {selectOptions()}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control as="select" onChange={(e)=>{setCategoria(e.target.value); console.log(categoria)}}>
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
                    <Button className="form-submit" variant="primary" type="submit" onClick={register}>
                        Anunciar
                    </Button>
                </Form>
                </div>
            </div>
        </div> 
    )
}

export default Venda;
