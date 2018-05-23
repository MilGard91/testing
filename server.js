const express = require ('express');
const hbs = require ('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.render('maintenance');
})
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error){
            console.log('Unable to append log');
        }
    });
    next();
})

// HELPERS
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


// ROUTES
app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the home page'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About page'
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Something went wrong'
    });
});

app.listen(port, () => console.log(`Server started on port: ${port}...`));