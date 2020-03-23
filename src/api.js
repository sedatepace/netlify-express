const express = require("express");
const cookieParser = require('cookie-parser');

const path  = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const pageRouter = require('./routes/page');
const app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({exteded: false}));
app.use(cookieParser('nodebirdsecret'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'nodebirdsecret',
    cookie:{
        httpOnly: true,
        secure: false,
    },
}));
app.use(flash());
//app.use('/', pageRouter);

const serverless = require('serverless-http');



const router = express.Router();
// router.get('/page', pageRouter);

router.get('/test', (req, res)=>{
    res.json({
        'hello': 'test922'

    });
});
router.get('/profile', (req, res)=>{
    res.render('profile', { title: '내 정보 - NodeBird', user: null});
});



app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
