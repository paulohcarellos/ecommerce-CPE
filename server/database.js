const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt')

let database = new sqlite3.Database('db.sqlite3', (err) => {
    if (err) {console.error(err.message);}
    
    console.log('Connected to the database!');
});

async function getUser(id) {
    
    return new Promise(resolve => { 
        database.get(`SELECT * FROM users WHERE id = ?`, id, (error, match) => {
            
            if (error) {return console.log(error);}
            
            if (match) {resolve(match)}
            else {resolve(undefined)}
        });
    });
}

async function getProduct(id) {

    return new Promise(resolve => { 
        database.get('SELECT * FROM products WHERE id = ?', id, (error, match) => {
            
            if (error) {return console.log(error);}
            
            if (match) {resolve(match)}
            else {resolve(undefined)}
        });
    });
}

async function getProductsAll() {

    return new Promise(resolve => { 
        database.all('SELECT * FROM products', (error, match) => {
            
            if (error) {return console.log(error);}
            
            if (match) {resolve(match)}
            else {resolve(undefined)}
        });
    });
}

async function getProductsVendor(id) {

    return new Promise(resolve => { 
        database.all('SELECT * FROM products WHERE vendor_id = ?', id, (error, match) => {
            
            if (error) {return console.log(error);}
            
            if (match) {resolve(match)}
            else {resolve(undefined)}
        });
    });
}

async function getProductsCat(category) {

    return new Promise(resolve => { 
        database.all('SELECT * FROM products WHERE category = ?', category, (error, match) => {
            
            if (error) {return console.log(error);}
            
            if (match) {resolve(match)}
            else {resolve(undefined)}
        });
    });
}

async function getCart(id) {

    return new Promise(resolve => { 
        database.all('SELECT * FROM cart_item WHERE user_id = ?', id, (error, match) => {
            
            if (error) {return console.log(error);}
            
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
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, values, (error) => {
                if (error) {
        
                    console.log(error);
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
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, values, (error) => {
            if (error) {console.log(error);}
    });
}

async function addCart(body) {
     
    values = Object.values(body);
    
    const stock = await updateStock(body.product_id, (body.quantity * -1));

    if (stock){
        return new Promise(resolve => { 
            database.run(`INSERT INTO users(user_id, product_id, price, discount, quantity, created_at)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, values, (error) => {
                    if (error) {
    
                        console.log(error);
                        resolve(false);
    
                    } else {resolve(true);}
            });
        });
    }
    
    return false;
}

async function removeCart(id) {

    const stock = await updateStock(body.product_id, body.quantity);

    if (stock){
        return new Promise(resolve => { 
            database.run('DELETE FROM cart_item WHERE id = ?', id, (error) => {
                if (error) {

                    console.log(error);
                    resolve(false);

                } else {resolve(true);}
            });
        });
    }

    return(false)
}

async function updateStock(id, quantity) {

    inStock = await getProduct(id);

    if (inStock !== undefined) {
        if (instock.quantity + quantity >= 0) {
            database.run('UPDATE products SET quantity = ? WHERE id = ?', [instock.quantity + quantity, id], (err) => {
                if (error) {

                    console.log(error);
                    resolve(false);

                } else {resolve(true);}
            })
        }
    }

    return false
}

async function login(email, password) {

    return new Promise(resolve => { 
        database.get(`SELECT * FROM users WHERE email = ?`, email, (error, match) => {
            if (error) {return console.log(error);}

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