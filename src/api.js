const express = require("express");
const cookieParser = require('cookie-parser');


const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const pageRouter = require('./routes/page');

const app = express();
const router = express.Router();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(cookieParser('nodebirdsecret'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(flash());

router.get('/', pageRouter);

router.get((req, res, next)=>{
    const err= new Error('Not Found');
    err.status = 404;
    next(err);
});

router.get((err, req, res)=>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : [];
    res.status(err.status || 500);
    res.render('error');
})


const serverless = require('serverless-http');


// router.get('/', (req, res)=>{
//     res.json({
//         'hello': 'hi!'

//     });
// });


router.get('/test', (req, res)=>{
    res.json({
        'hello': 'test1234'

    });
});


app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
