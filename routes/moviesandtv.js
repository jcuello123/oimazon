const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async(req, res) => {
    try {
        const moviesandtv = await Product.find({ category: 'Movies & TV' }).lean();
        res.render('moviesandtv', { moviesandtv });
    } catch (error) {
        res.render('error');
    }
});

module.exports = router;