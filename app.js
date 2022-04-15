// Require modules import here
const express = require('express');
const morgan = require("morgan");
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const userRoutes = require('./routes/userRoutes');
const tradeRoutes = require('./routes/tradeRoutes');
const mainRoutes = require('./routes/mainRoutes');

// create app
const app = express();

const res = require('express/lib/response');


// configure app
let port =3000;
let host = 'localhost';
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/trade',{useUnifiedTopology: true ,useNewUrlParser: true })
.then(()=>{
// start the server
app.listen(port,host,()=> {
    console.log('Server is running on the port',port);
});
})
.catch(err=> console.log(err.message));

//mount middlware
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/trade'}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user || null ;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});


// mount middleware functions
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// set up routes
app.use("/",mainRoutes);
app.use('/trades',tradeRoutes);
app.use('/users', userRoutes);


app.use((req,res,next)=>{

    let err = new Error('The server cannot locate '+req.url);
    err.status=404;
    next(err);
});
app.use((err,req,res,next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status=500;
        err.message=("Internal Server Error");

    }

    res.status(err.status);
    res.render('error',{error:err});
});




