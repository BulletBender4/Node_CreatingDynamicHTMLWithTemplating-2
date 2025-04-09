const express = require('express');
const app = express();
const path = require('path')

app.set('view engine', 'ejs')
// app.set: This is a method in Express that sets up a setting or configuration for the app.
// 'view engine': This tells Express which template engine to use to render views (like HTML pages).
// 'ejs': This is the name of the template engine being used. EJS stands for Embedded JavaScript, and it's a simple way to generate HTML with embedded JavaScript.

app.set('views', path.join(__dirname, '/views'));
// path is a built-in module in Node.js, so it doesn't need to be installed separately. You can directly use it like this:

app.use(express.static('public'))
app.set('public', path.join(__dirname, '/public'));

// app.use(express.static(path.join(__dirname, '/public')))

const dataList = require('./data.json');

// app.get('/', (req, res) => {
//     res.send("Welcome to home page");
// })

app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/random', (req, res) => {
    let randomNum = Math.floor(Math.random() * 5) + 1;
    res.render('random', { num: randomNum });
})

app.get('/oddEven', (req, res) => {
    let num = Math.floor(Math.random() * 100) + 1;
    res.render('oddEvenChecker', { num })
})

app.get('/family', (req, res) => {
    const family = ['VinodKumar Mishra', 'Rekha Mishra', "Akash topa", "Shree topi", "nangu pota", "pangu nati"];
    res.render('family', { family })
})

app.get('/q/:userEnteredData', (req, res) => {
    const { userEnteredData } = req.params;
    const searchedData = dataList[userEnteredData];
    // object[key] will give you value
    if (searchedData) {
        res.render('contentDisplay', { ...searchedData });
    } else {
        res.render('notfound', { userEnteredData })
    }

})

app.get('/s/:search', (req, res) => {
    const { search } = req.params;
    res.render('randomSearch', { search })
})


app.listen(8080, () => {
    console.log("Listening on port 8080")
})