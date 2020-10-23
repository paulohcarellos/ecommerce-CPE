const express = require('express')
const app = express()
const port = 3030

const sqlite3 = require('sqlite3').verbose();

let database = new sqlite3.Database('db.sqlite3', (error) => {
    if (error) {
        console.error(error.message);
    }
    console.log('Connected');
});

app.get('/', (req, res) => {
    res.send('Experimenting')
})
  
app.listen(port, () => {
 console.log(`Example app listening at http://localhost:${port}`)
})



function insert(database, table, values) {

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
}