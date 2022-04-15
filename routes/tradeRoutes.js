// contains all the trade site routes
const express= require('express');
const controller= require('../controllers/tradeController');
const router = express.Router();

//Prefix /trades
//Trade Navigation
// GET /trades/ : send all stories
router.get('/',controller.index);

//POST get any post method sent throw start tradding
// post /trades: create new trade Request coming from submitting the new trade form
router.post('/',controller.create);

//GET page from 
router.get('/:id',controller.showEachTrade);

// GET the edit page when clicked on edit
router.get('/:id/edit',controller.edit)

// PUT is used when edit page sent request to be change the object
router.put('/:id',controller.update);

//Delete is used to delete object 
router.delete('/:id',controller.delete);
module.exports=router;