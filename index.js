// define imports
const express = require("express");
const mainRouter = require("./routers/routerIdentify.js")

// initializing the app
app = express();
app.use(mainRouter);

//constants 
const PORT = 3000;


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})
