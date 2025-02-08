//define imports
const express = require("express");
const mongoose = require("mongoose");
app = express();
const PORT = 3000;


app.get('/', (request, response) => {
    console.log("GET /");
    console.log("its working!")
    response.send(request.body);
})

app.get('/api/identify', (request, response) => {
    response.send({message: "api endpoint for identifing the books"});
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})
