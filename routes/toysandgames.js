const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async(req, res) => {
    try {
        const toysandgames = await Product.find({ category: 'Toys & Games' }).lean();
        res.render('toysandgames', { toysandgames });
    } catch (error) {
        res.render('error');
    }
});

module.exports = router;