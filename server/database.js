const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt')

let database = new sqlite3.Database('db.sqlite3', (err) => {
    if (err) {console.error(err.message);}
    
    console.log('Connected to the database!');
});

async function get(id) {
    
    return new Promise(resolve => { 
        database.get(`SELECT * FROM users WHERE id = ?`, id, (error, match) => {
            
            if (error) {return console.log(error);}
            
            if (match) {resolve(match)}
            else {resolve(false)}
        });
    });
}

async function registerUser(body) {
    
    body.password = await bcrypt.hash(body.password, 10);   
    values = Object.values(body);

    database.run(`INSERT INTO users(first_name, last_name, email, password, state, city, address, phone, cpf, birthdate, created_at)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, values, (error) => {
            if (error) {console.log(error);}
    });
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
    get,
    registerUser,
    login
}