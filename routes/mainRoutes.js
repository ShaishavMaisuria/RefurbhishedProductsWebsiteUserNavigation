// contains all the user navigation site routes
const express= require('express');
const mainController= require('../controllers/mainController');
const {isLoggedIn} = require('../middlewares/auth');
const mainRouter = express.Router();

// prefix /
mainRouter.get('/',mainController.home);

//about page 
mainRouter.get("/about",mainController.about);

//contact page
mainRouter.get("/contact",mainController.contact);

// get from new trade
mainRouter.get('/newTrade',isLoggedIn,mainController.newTrade);

module.exports=mainRouter;