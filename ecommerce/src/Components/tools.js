export async function getUser() {
    return await fetch('http://localhost:3030/user', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(user => {return user})
    .catch((error) => console.log(error));
}

export async function getProducts() {
    return await fetch('http://localhost:3030/products', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(products => {return products})
    .catch((error) => console.log(error));
}