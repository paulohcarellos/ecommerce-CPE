const express = require('express')
const sqlite3 = require('sqlite3');
const cors = require('cors');
const bcrypt = require('bcrypt')

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

    loginRes = await login(email, pass);
    
    if (!loginRes) {
        res.send({
            found: false
        });
    } else {
        res.send({
            found: true,
        });
    }
})

app.post('/register', (req, res) => {
    registerUser(req.body);
    res.send('User registered!');
})

app.listen(port, () => {
    console.log(`Ecommerce server listening at http://localhost:${port}`)
})

async function registerUser(body) {
    
    body.password = await bcrypt.hash(body.password, 10);
    
    values = Object.values(body)

    database.run(`INSERT INTO users(first_name, last_name, email, password, state, city, address, phone, cpf, birthdate, created_at)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, values, (error) => {
            if (error)
                return console.log(error);
            console.log(`User registered: ${this.lastID}`);
    });
}

async function login(email, pass) {

    return new Promise(resolve => { 
        database.get(`SELECT * FROM users WHERE email = ?`, email, (error, match) => {
            if (error)
                return console.log(error);

            bcrypt.compare(pass, match.password, (err, same) => {
                if (err)
                    console.log(err)
                
                if (same)
                    resolve(true)

                else
                    resolve(false)
            })
        });
    });
}