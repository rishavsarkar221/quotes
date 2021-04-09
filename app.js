const express = require('express');
const https = require('https');
const app = express();

app.use(express.urlencoded());

app.set('view engine', 'pug');

app.get("/", (req, res) => {
    res.render('index', {quote: "Get Quote"});
});

app.post("/quotes", (req, res) => {
    const request = https.request(`https://type.fit/api/quotes`, (response) => {
        let data = "";

        response.on("data", (chunk) => {
            data += chunk.toString();
        })

        response.on("end", () => {
            const api = JSON.parse(data);
            const selectRandomQuote = Math.floor(Math.random() * api.length);

            console.log(api[selectRandomQuote].text, "\n", api[selectRandomQuote].author);
            res.render('index', {quote: api[selectRandomQuote].text, author: api[selectRandomQuote].author});
        })
    })
    
    request.end();
});

app.listen(80, () => {
    console.log("Server Started on Port 80");
});