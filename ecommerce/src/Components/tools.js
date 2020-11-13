export async function getUser() {
    return await fetch('http://localhost:3030/user', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(user => {return user})
    .catch((error) => console.log(error));
}

export async function getProduct(id) {
    return await fetch('http://localhost:3030/product/' + id, {
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

export async function getProductsVendor(id) {
    return await fetch('http://localhost:3030/products/vendor/' + id, {
        method: 'GET',
        credentials: 'include',
    })
    .then(response => response.json())
    .then(products => {return products})
    .catch((error) => console.log(error));
}

export async function addCart(user, product, price, discount, quantity) {
    return new Promise (resolve => {
        fetch('http://localhost:3030/cart/add', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            user_id: user,
            product_id: product,
            price: price,
            discount: discount,
            quantity: quantity,
            created_at: Date.now()
        })
        })
        .then(response => response.json())
        .then(response => resolve(response.result))
        .catch((error) => console.log(error));
    });
}   

export async function removeCart(cartItem) {
    console.log(cartItem);
    return await fetch('http://localhost:3030/cart/remove', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cartItem)
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