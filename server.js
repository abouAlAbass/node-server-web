const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    var now =  new Date().toString();
    var log = `a user connect at ${now} : ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log +'\n', (err) => {
        if(err)
        console.log('unable to writle in the file server.log');
    });
    next();
});
app.use((req, res, next) => {
    res.render('maintenance',{
        title: 'Maintentance',
        pageTitle : 'Maintentance Page',
        paragraphe: 'sorry the sit is in Maintentance mode'
    });
});
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',() => {
    return  new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.get('/',(req, res) => {

    res.render('home',{
        title: 'HOME',
        pageTitle : 'Home Page',
        paragraphe: 'Welcome Page'
    });
});

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'ABOUT',
        pageTitle : 'About Page',
        paragraphe: 'some paragraphe and let me write what i want'
    });
});

app.get('/bad', (req, res) => {

    res.send({
       errors : ['qsdqssdqs,qsdqsdqs,qsdqsd'],
       msg: 'why this erros',
       why : 'i dont know you are the devloper' 
    });
})
app.listen(8080 , () => {
    console.log('Server is up on port 8080');
})