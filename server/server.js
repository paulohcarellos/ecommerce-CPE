const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const uuid = require('uuid/v4');
const FileStore = require('session-file-store')(session);
const LocalStrategy = require('passport-local').Strategy;

const db = require('./database');
const files = require('./files');

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
      return uuid() // use UUIDs for session IDs
    },
    store: new FileStore({logFn: () => {}}),
    secret: 'keyboard cat',
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

app.get('/product', (req, res) => {
    db.getProduct()
    .then(products => res.send(products));
});

app.get('/product/:filename', (req, res) => {
    res.sendFile(__dirname + '/images/' + req.params.filename + '.jpg')
});

app.get('/products/all', (req, res) => {
    db.getProductsAll()
    .then(products => res.send(products));
});

app.get('/products/vendor', (req, res) => {
    db.getProductsVendor(req.body)
    .then(products => res.send(products));
});

app.get('/products/category', (req, res) => {
    db.getProductsCat(req.body)
    .then(products => res.send(products));
});

app.get('/cart', (req, res) => {
    db.getCart(req.user.id)
    .then(cart => res.send(cart));
});

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
    db.registerUser(req.body).then(() => {
        console.log('User registered!')
        res.send('User registered!');
    });
});

app.post('/announce', (req, res) => {
    db.registerProduct(req.body).then(() => {
        console.log('Product registered!');
        res.send('Product registered!');
    });
});

app.post('/announce/upload', (req, res) => {
    files.upload(req, res, (err) => {
        if (err) {console.log(err)}
        else {
            console.log('File successfully uploaded!')
            res.send('Image uploaded!');
        }
    });
});

app.post('/cart/add', (req, res) => {
    db.addCart(req.body).then(() => {
        console.log('Item added to cart!')
        res.send('Item added to cart!');
    });
})

app.post('/cart/remove', (req, res) => {
    db.addCart(req.body).then(() => {
        console.log('Item removed from cart!')
        res.send('Item removed from cart!');
    });
})

app.listen(port, () => {
    console.log(`Ecommerce server listening at http://localhost:${port}`)
});