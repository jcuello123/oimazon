const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async(req, res) => {
    try {
        const officesupplies = await Product.find({ category: 'Office Supplies' }).lean();
        res.render('officesupplies', { officesupplies });
    } catch (error) {
        res.render('error');
    }
});

module.exports = router;