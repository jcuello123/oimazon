const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async(req, res) => {
    try {
        const petsupplies = await Product.find({ category: 'Pet Supplies' }).lean();
        res.render('petsupplies', { petsupplies });
    } catch (error) {
        res.render('error');
    }
});

module.exports = router;