const express = require('express');

// express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

//Listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    //res.send('<p>Home Page</p>');
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet.' },
        {title: 'Mario finds starts', snippet: 'Lorem ipsum dolor sit amet.' },
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet.' }
    ]
    res.render('index', { title: 'Home' , blogs });
}); 
app.get('/about', (req, res) => {
    //res.send('<p>About Page</p>');
    res.render('about', { title: 'About' })
}); 

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
})

// 404 page
app.use((req,res) => {
    res.status(404).render('404', { title: '404' });
});