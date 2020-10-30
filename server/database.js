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

app.get('/', (req, res, next) => {
    res.send('Experimenting')
})

app.post('/register', (req, res) => {
    values = Object.values(req.body);
    registerUser(values);
    res.send('Received!');
})
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function registerUser(values) {

    database.run(`INSERT INTO users(first_name, last_name, email, password, state, city, address, phone, cpf, birthdate, created_at)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, values, (error) => {
            if (error) {
                return console.log(error);
            }
            return console.log(`User registered: ${this.lastID}`);
    });
}

/* function insert(database, table, values) {

    let placeholders = "";

    for (let value in values)
        placeholders += '?,';

    placeholders = '(' + placeholders.slice(0, -1) + ')';

    database.run(`INSERT INTO ${table}(${Object.keys(values)}) VALUES${placeholders}`, Object.values(values), (error) => {
        if (error) {
            return console.log(error.message)
        }
    });

    return console.log(`Added 1 elements to the table ${user}`)
}

function select(database, tables, fields, conditions) {
    
    if (fields === '[]') {
        fields = '*'
    }

    if (conditions === '[]') {
        conditions = ''
    }

    else {
        condition = 'WHERE ' + conditions;
    }

    database.all(`SELECT * FROM ${tables} ${conditions}`, [], (error, rows) => {
        if (error) {
            return console.log(error.message)
        }
        return console.log(rows);
    });
} */