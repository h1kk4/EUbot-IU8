"use strict";

const app = require("express")();

app.use((req, res, next) => {
    console.log("[ " + new Date().toUTCString() + " ]",
        "Received request:\n\t", req.method, req.url);
    next();
});

app.post("/", (req, res, next) => {
    res.status(200).send("Hello World!!!");
});

app.listen(process.env.PORT, () => {
    console.log("Server listening on port " + process.env.PORT);
});