const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
//Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/products', require('./routes/products'));

//View
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.get('/', (req, res) => {
    res.render('index');
});

//Connect to DB
try {
    const url = process.env.MONGODB_URI || 'mongodb://heroku_db6q7m08:b9a5ejhok32cimpt8a4hqnnfkq@ds125255.mlab.com:25255/heroku_db6q7m08';
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const con = mongoose.connection;

    con.on('open', () => console.log('Connected to DB'));

} catch (error) {
    res.render('error');
}

//Server port & start
const PORT = process.env.PORT || 5000;
app.listen(PORT);