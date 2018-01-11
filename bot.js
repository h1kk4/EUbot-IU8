"use strict";

const app = require("express")();

app.use((req, res, next) => {
    console.log("[ " + new Date().toUTCString() + " ]",
        "Received request:\n\t", req.method, req.url);
    next();
});

app.get("/", (req, res, next) => {
    res.status(200).contentType("text/html").send("<!DOCTYPE html>" +
        "<meta charset=utf8><title>Demo page</title><h1>Hello World!!!</h1>" +
        "<h4>this is a demo page</h4>");
});

app.post("/", (req, res, next) => {
    res.status(200).send("a5efe228");
});

app.listen(process.env.PORT || 80, () => {
    console.log("Server listening on port " + (process.env.PORT || 80));
});