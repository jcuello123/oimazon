const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async(req, res) => {
    try {
        const electronics = await Product.find({ category: 'Electronics' }).lean();
        res.render('electronics', { electronics });
    } catch (error) {
        res.render('error');
    }
});

module.exports = router;