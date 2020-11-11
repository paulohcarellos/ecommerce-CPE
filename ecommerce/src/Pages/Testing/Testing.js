import React, { useState, useEffect } from 'react';
import {Form, Button, Col} from 'react-bootstrap';

function Venda() {
    
    const [user, setUser] = useState(null);
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [categoria, setCategoria] = useState('Tecnologia');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');

    function selectOptions() {
        let options = []

        for (let i = 1; i < 100; i++)
            options.push(<option key={i}>{i}</option>);

        return options
    }

    function register() {

        console.log('calling');

        const fileInput = document.querySelector('#imageUpload') ;
        const formData = new FormData();

        formData.append('file', fileInput.files[0]);

        fetch('http://localhost:3030/announce', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: nome,
                vendor_id: 12,
                price: preco,
                quantity: quantidade,
                description: descricao,
                category: categoria,
                image: imagem,
                created_at: Date.now()
            })
        })
        .catch((error) => console.log(error));

        fetch('http://localhost:3030/announce/upload', {
            method: 'POST',
            body: formData
        })
        .catch((error) => console.log(error));
    }

    return (
        <div>
            <div id='form-wrapper'>
                <Form className='product-form' onSubmit={register}>
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
                    <Form.File label="Imagem" id="imageUpload" onChange={(e)=>{setImagem(e.target.value);console.log(imagem)}} />
                    <Button className="form-submit" variant="primary" type="submit">
                        Anunciar
                    </Button>
                </Form>
            </div>
        </div> 
    )
}

export default Venda;
