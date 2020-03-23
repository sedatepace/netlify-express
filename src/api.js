const express = require("express");
const cookieParser = require('cokie-parser');

const path  = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const pageRouter = require('./routes/page');


app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({exteded: false}));
app.use(cookiesParser('nodebirdsecret'));
app.use(seesion({
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

const app = express();

const router = express.Router();
router.get('/', pageRouter);

router.get('/test', (req, res)=>{
    res.json({
        'hello': 'test12345'

    });
});


app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
