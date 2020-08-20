const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// Connect to mogodb
const dbURI = 'mongodb+srv://nodeTutorial:@cluster0.sbq0s.mongodb.net/node-tutorial?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) =>  app.listen(3000))
    .catch((err) => console.log(err));

// Register view engine
app.set('view engine', 'ejs');


// Middleware & static files
app.use(express.static('public'));

app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.redirect('/blogs');
}); 
app.get('/about', (req, res) => {
    //res.send('<p>About Page</p>');
    res.render('about', { title: 'About' })
}); 

// Blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result})
        })
        .catch((err) => console.log(err));
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
})

// 404 page
app.use((req,res) => {
    res.status(404).render('404', { title: '404' });
});
