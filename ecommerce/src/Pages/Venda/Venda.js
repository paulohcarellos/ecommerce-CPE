import React, { useState } from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import Header from '../../Header'
import './Venda.css';

function Venda() {

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
                        <Form.Control type="text" placeholder="Insira nome" />
                    </Form.Group>
                    
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Preço</Form.Label>
                                <Form.Control type="price" placeholder="Insira preço" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Quantidade em estoque</Form.Label>
                                <Form.Control as="select">
                                    {selectOptions()}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control as="select"> 
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" rows={5}> 
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div> 
    )
}

export default Venda;
