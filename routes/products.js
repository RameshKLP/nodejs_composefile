var express = require('express');

var router = express.Router();

var Product = require('../models/products');

/* GET Products */
router.get('/', function(req, res, next) {
  Product.find({}, function(err, docs) {
    res.json(docs);
  });
});


/* GET Product by id */
/* :id is pathparameter */
// http:... /products/4545
router.get('/:id', function(req, res, next) {
    Product.find({id:req.params.id}, function(err, docs) {
      res.json(docs);
    });
  });

/* CREATE a PRODUCT */
router.post('/',function(req, res, next) { 
    Product.create(req.body, function(err, docs) {
        res.send("Product added!!");
    });
});


module.exports = router;