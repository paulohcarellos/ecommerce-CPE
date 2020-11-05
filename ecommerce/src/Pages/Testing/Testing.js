import React from 'react';

function Testing() {
    jsonfy();

    return (
        <div>
            <form onSubmit={jsonfy}>
                <input type='text' placeholder="First Name"/>
                <input type='text' placeholder="Last Name"/>
                <input type='text' placeholder="Email"/>
                <input type='text' placeholder="Password"/>
                <input type='text' placeholder="State"/>
                <input type='text' placeholder="City"/>
                <input type='text' placeholder="Adress"/>
                <input type='text' placeholder="Phone"/>
                <input type='text' placeholder="CPF"/>
                <input type='text' placeholder="Birthdate"/>
                <input type='text' placeholder="First Name"/>
            </form>
        </div>
    );
}

function jsonfy() {
    console.log("Sending")

    
}

export default Testing;
