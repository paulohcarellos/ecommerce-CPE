const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const FileStore = require('session-file-store')(session);
const LocalStrategy = require('passport-local').Strategy;

const db = require('./database');
const files = require('./files');

const { v4: uuid } = require('uuid');

const app = express()
const port = 3030

app.use(express.json());
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(session({
    genid: () => {
      return uuid()
    },
    store: new FileStore({logFn: () => {}}),
    secret: 'server cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge: (60 * 60 * 60 * 24 * 30) //30 days :)
    }
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    db.login(email, password).then(user => {

        if(user === undefined) {return done(null, false);}
        return done(null, user);
    })
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.getUser(id)
    .then(response => {done(null, response)});
});

app.get('/', (req, res) => {
    res.send(`Ecommerce backend server!\n`)
});

app.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.send({
            logged: true,
            body : req.user
        })
    }
    else {res.send({logged: false})}
});

app.get('/product/:id', (req, res) => {
    db.getProduct(req.params.id)
    .then(product => {
        if (product === undefined) {res.send('Produto não encontrado');}
        else {res.send(product);}
    });
});

app.get('/product/image/:filename', (req, res) => {
    res.sendFile(__dirname + '/images/' + req.params.filename + '.jpg')
});

app.get('/products/all', (req, res) => {
    db.getProductsAll()
    .then(products => res.send(products));
});

app.get('/products/vendor/:id', (req, res) => {
    db.getProductsVendor(req.params.id)
    .then(products => res.send(products));
});

app.get('/products/category/:category', (req, res) => {
    db.getProductsCat(req.params.category)
    .then(products => res.send(products));
});

app.get('/cart', (req, res) => {
    db.getCart(req.user.id)
    .then(cart => res.send(cart));
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {console.log(err);}
        if (info) {console.log(info);}
        if (!user) {return res.send({login: false})}

        req.login(user, (err) => {
            if (err) {console.log(err);}

            return res.send({login: true})
        })
    })(req, res, next);
});

app.post('/register', (req, res) => {
    db.registerUser(req.body).then(result => {
        if (result === true) {
            console.log('User registered!')
            res.send({result: true});
        }
        else {
            console.log(result)
            res.send({result: false});
        }
    });
});

app.post('/announce', (req, res) => {
    db.registerProduct(req.body).then(result => {
        if (result === true) {
            console.log('Product registered!')
            res.send({result: true});
        }
        else {
            console.log(result)
            res.send({result: false});
        }
    });
});

app.post('/announce/upload', (req, res) => {
    files.upload(req, res, (err) => {
        if (err) {
            console.log(err)
            res.send({result: false});
        }
        else {
            console.log('File successfully uploaded!')
            res.send({result: true});
        }
    });
});

app.post('/cart/add', (req, res) => {
    db.addCart(req.body).then(result => {
        if (result === true) {
            console.log('Item added to cart!')
            res.send({result: true});
        }
        else {
            console.log(result)
            res.send({result: false});
        }
    });
})

app.post('/cart/remove', (req, res) => {
    db.removeCart(req.body).then(result => {
        if (result === true) {
            console.log('Item removed from cart!')
            res.send({result: true});
        }
        else {
            console.log(result)
            res.send({result: false});
        }
    });
})

app.listen(port, () => {
    console.log(`Ecommerce server listening at http://localhost:${port}`)
});