"use strict";

const app = require("express")();
const converter = require("html2canvas");
const dom = require("jsdom");

function saveToImage(name, canvas) {
    console.log("s2img");
    let img = canvas.toDataURL();
    var data = img.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFile(__dirname + images + name + ".png", buf);
}

app.use((req, res, next) => {
    console.log(req.body, "body");
    next();
});

app.post("/", (req, res, next) => {

    let element = dom.JSDOM.fragment("<h1>Hello world!</h1>");
    converter(element).then((canvas) => {
        saveToImage("img", canvas);
    });
    console.log("created image");
    res.sendStatus(200);
});

app.listen(5000);