const express = require('express');
const router = express.Router();
const Product = require('../models/product');

//Specific product routes
router.use('/electronics', require('./electronics'));
router.use('/petsupplies', require('./petsupplies'));
router.use('/toysandgames', require('./toysandgames'));
router.use('/moviesandtv', require('./moviesandtv'));
router.use('/officesupplies', require('./officesupplies'));

router.get('/', async(req, res) => {
    try {
        const products = await Product.find().lean();
        res.render('products', { products });
    } catch (error) {
        res.render('error');
    }
});

router.get('/add', (req, res) => {
    res.render('addproduct');
});

router.get('/delete', async(req, res) => {
    try {
        const products = await Product.find().lean();
        res.render('deleteproduct', { products });
    } catch (error) {
        res.render('error');
    }
});

router.get('/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.render('error');
    }
});

router.post('/', async(req, res) => {
    const newProduct = new Product({
        product: req.body.product,
        price: req.body.price,
        category: req.body.category
    });

    try {
        await newProduct.save();
        const { product } = newProduct;
        res.render('addproduct', { product, successful: true });
    } catch (error) {
        res.render('error');
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const removedProduct = await product.remove();
        res.json(removedProduct);
    } catch (error) {
        res.render('error');
    }
});

router.put('/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        product.product = req.body.product;
        product.price = req.body.price;
        const p1 = await product.save();
        res.json(p1);
    } catch (error) {
        res.render('error');
    }
});

router.patch('/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        product.price = req.body.price;
        const p1 = await product.save();
        res.json(p1);
    } catch (error) {
        res.render('error');
    }
});


module.exports = router;