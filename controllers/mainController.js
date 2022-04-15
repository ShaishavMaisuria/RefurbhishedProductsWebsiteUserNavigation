const model =require('../models/item');
//site navigation

exports.home= (req,res)=>{
    res.render('./index');
};
//about
exports.about=(req,res)=>{
    res.render('./others/about');
};

// contact
exports.contact = (req,res)=>{
    res.render('./others/contact');
};
// newTrade
exports.newTrade = (req,res)=>{

    res.render('./trade/newTrade');

};


