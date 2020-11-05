const express = require('express')
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express()
const port = 3030

app.use(cors());
app.use(express.json());

let database = new sqlite3.Database('db.sqlite3', (error) => {
    if (error) {
        console.error(error.message);
    }
    
    console.log('Connected');
});

app.get('/', async (req, res) => {
    res.send('Experimenting')
})

app.post('/login', async (req, res) => {
    email = req.body.email;
    pass = req.body.password;

    user = await login(email, pass);
    
    if (user === undefined) {
        res.send({
            found: false
        });
    }

    else {
        res.send({
            found: true,
        });
    }
})

app.post('/register', (req, res) => {
    values = Object.values(req.body);
    registerUser(values);
    res.send('User registered!');
})

app.listen(port, () => {
    console.log(`Ecommerce server listening at http://localhost:${port}`)
})

function registerUser(values) {
    database.run(`INSERT INTO users(first_name, last_name, email, password, state, city, address, phone, cpf, birthdate, created_at)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, values, (error) => {
            if (error)
                return console.log(error);
            console.log(`User registered: ${this.lastID}`);
    });
}

async function login(email, pass) {
    return new Promise(resolve => { 
        database.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, pass], (error, match) => {
            if (error)
                return console.log(error);

            console.log(`User query: ${match}`);
            resolve(match)
        });
    });
}