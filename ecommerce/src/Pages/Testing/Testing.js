import React from 'react';

function Testing() {
    
    fetch('http://localhost:3030/auth', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(response => {console.log(response.body)});

    return (
        Testing
    );
}

export default Testing;
