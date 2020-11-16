const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt')

let database = new sqlite3.Database('db.sqlite3', (err) => {
    if (err) {console.err(err.message);}
    
    console.log('Connected to the database!');
});

async function getUser(id) {
    
    return new Promise(resolve => { 
        database.get(`SELECT * FROM users WHERE id = ?`, id, (err, match) => {
            
            if (err) {return console.log(err);}
            
            if (match) {resolve(match)}
            else {resolve(undefined)}
        });
    });
}

async function getProduct(id) {

    return new Promise(resolve => { 
        database.get('SELECT * FROM products WHERE id = ?', id, (err, match) => {
            
            if (err) {return console.log(err);}
            
            if (match) {resolve(match)}
            else {resolve(undefined)}
        });
    });
}

async function getProductsAll() {

    return new Promise(resolve => { 
        database.all('SELECT * FROM products', (err, match) => {
            
            if (err) {return console.log(err);}
            
            if (match) {resolve(match)}
            else {resolve(undefined)}
        });
    });
}

async function getProductsVendor(id) {

    return new Promise(resolve => { 
        database.all('SELECT * FROM products WHERE vendor_id = ?', id, (err, match) => {
            
            if (err) {return console.log(err);}
            
            if (match) {resolve(match)}
            else {resolve(undefined)}
        });
    });
}

async function getProductsCat(category) {

    return new Promise(resolve => { 
        database.all('SELECT * FROM products WHERE category = ?', category, (err, match) => {
            
            if (err) {return console.log(err);}
            
            if (match) {resolve(match)}
            else {resolve(undefined)}
        });
    });
}

async function getCart(id) {

    return new Promise(resolve => { 
        database.all('SELECT * FROM cart_item WHERE user_id = ?', id, (err, match) => {
            
            if (err) {return console.log(err);}
            
            if (match) {resolve(match)}
            else {resolve(undefined)}
        });
    });
}

async function registerUser(body) {
    
    body.password = await bcrypt.hash(body.password, 10);   
    values = Object.values(body);

    return new Promise(resolve => {
        database.run(`INSERT INTO users(first_name, last_name, email, password, state, city, address, phone, cpf, birthdate, created_at)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, values, (err) => {
                if (err) {
        
                    console.log(err);
                    resolve(false);

                } else {resolve(true);}
        });
    })
}

async function registerProduct(body) {

    values = Object.values(body);

    for (let i = 0; i < values.length; i++){
        if (values[i] == '')
            values[i] = null;
    }

    database.run(`INSERT INTO products(name, vendor_id, price, quantity, description, category, image, created_at)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, values, (err) => {
            if (err) {
                console.log(err);
                return 'Database error'
            }
            else {return true;}
    });
}

async function addCart(body) {
     
    values = Object.values(body);
    const stock = await updateStock(body.product_id, -body.quantity).catch(err => console.log(err));

    if (stock === true){
        return new Promise(resolve => { 
            database.run(`INSERT INTO cart_item(user_id, product_id, price, discount, quantity, created_at)
                VALUES(?, ?, ?, ?, ?, ?)`, values, (err) => {
                    if (err) {
                        console.log(err);
                        updateStock(body.product_id, body.quantity).catch(err => console.log(err));
                        resolve('Database error');
                    
                    } else {resolve(true);}
            });
        });
    }
    
    updateStock(body.product_id, body.quantity).catch(err => console.log(err));
    return stock;
}

async function removeCart(body) {

    updateStock(body.product_id, body.quantity).catch(err => console.log(err));

    return new Promise(resolve => { 
        database.run('DELETE FROM cart_item WHERE id = ?', body.id, (err) => {
            if (err) {
                console.log(err);
                updateStock(body.product_id, -body.quantity).catch(err => console.log(err));
                resolve('Database error');

            } else {resolve(true);}
        });
    });
}

async function updateStock(id, quantity) {

    const inStock = await getProduct(id).catch(err => console.log(err));

    if (inStock !== undefined) {
        if (inStock.quantity + quantity >= 0) {
            database.run('UPDATE products SET quantity = ? WHERE id = ?', [inStock.quantity + quantity, id], (err) => {
                if (err) {
                    console.log(err);
                    return 'Database error';
                }
            });

            return true;
        }
        return 'Out of stock'
    }

    return 'Product not found';
}

async function login(email, password) {

    return new Promise(resolve => { 
        database.get(`SELECT * FROM users WHERE email = ?`, email, (err, match) => {
            if (err) {return console.log(err);}

            if (match === undefined) {
                resolve(undefined)

            } else {
                bcrypt.compare(password, match.password, (err, same) => {
                if (err) {console.log(err);}
                    
                if (same) {resolve(match);}                    
                else {resolve(undefined);}
                });
            }
        });
    });
}

module.exports = {
    getUser,
    getProduct,
    getProductsAll,
    getProductsVendor,
    getProductsCat,
    getCart,
    registerUser,
    registerProduct,
    addCart,
    removeCart,
    login
}