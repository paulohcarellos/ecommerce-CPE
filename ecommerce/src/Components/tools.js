export async function getUser() {
    return await fetch('http://localhost:3030/user', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(user => {return user})
    .catch((error) => console.log(error));
}

export async function getProductsAll() {
    return await fetch('http://localhost:3030/products/all', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(products => {return products})
    .catch((error) => console.log(error));
}

export async function getCart() {
    return await fetch('http://localhost:3030/cart', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(products => {return products})
    .catch((error) => console.log(error));
}