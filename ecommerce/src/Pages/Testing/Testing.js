import React, { useState, useEffect } from 'react';
import {Form, Button, Col} from 'react-bootstrap';

function Venda() {

    const [image, setImage] = useState(null);
    
    fetch('http://localhost:3030/products/1bfe2e8a-cc40-42a0-bc43-7f8337f71658', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.blob())
    .then(images => setImage(images))

    return (
        <div>
        </div> 
    )
}

export default Venda;
