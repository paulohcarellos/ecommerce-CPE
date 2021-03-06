import React, { useState, useEffect } from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getUser } from '../../Components/tools'
import { v4 as uuid } from 'uuid'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer/Footer';
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

    useEffect(() => {
        const fetchUser = async () => {
            getUser()
            .then(user => setUser(user))
            .catch((err) => (console.log(err)));
        }
        
        fetchUser();
    }, [])

    useEffect(() => {
        if (user !== null) {
            if (!user.logged)
                history.push('login')
        }
    }, [user]);

    function selectOptions() {
        let options = []

        for (let i = 1; i < 100; i++)
            options.push(<option key={i}>{i}</option>);

        return options
    }

    function register() {

        const imageHash = uuid();
        const formData = new FormData();
        formData.append(imageHash, imagem);

        fetch('http://localhost:3030/announce', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: nome,
                vendor_id: user.body.id,
                price: preco,
                quantity: quantidade,
                description: descricao,
                category: categoria,
                image: imageHash,
                created_at: Date.now()
            })
        })

        fetch('http://localhost:3030/announce/upload', {
            method: 'POST',
            body: formData
        })
    }

    return (
        <div>
            <Header user={user}/>
            <div id='form-wrapper'>
                <div id="divPai">
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
                        <Form.File custom>
                            <Form.File.Input id="upload-image" onChange={e => {setImagem(e.target.files[0])}} />
                            <Form.File.Label data-browse="Pesquisar...">Imagem</Form.File.Label>     
                        </Form.File>
                        <Button className="form-submit" variant="primary" type="submit">
                            Anunciar
                        </Button>
                    </Form>
                </div>
            </div>
            <Footer />
        </div> 
    )
}

export default Venda;
