const express = require('express');
const mongoose = require('mongoose');
const indexRoute = require('./routes/index');
const productRoute = require('./routes/products');
var Product = require('./models/products');

mongoose.connect("mongodb://localhost:27017/expressdb")
    .then(() => {
        const app = express();
        app.set('view engine', 'ejs');
        app.use(express.json());
        app.use("/api", indexRoute); //http://localhost:5000/api
        app.use("/api/products", productRoute); //http://localhost:5000/api/products
        app.get("/products", (req,res) => {
            Product.find({},  function(err, docs) {
                res.render('products', { products: docs});
            });
        })
        app.use((req,res,next) => {
            res.render('error', {msg:'Page Not Found!!'})
        });
        app.listen(5000, () => {
            console.log("server started [ http://localhost:5000/api]");
        })
    })
    .catch(err => console.log(err));