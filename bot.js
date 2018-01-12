"use strict";

// const API = require("node-vk-bot-api");
// const bot = new API(process.env.TOKEN);

const api_host = "https://api.vk.com/method/";

const app = require("express")();
const parser = require("body-parser");
const request = require("request");
const encoder = require("urlencode");

app.use(parser.json());

app.use((req, res, next) => {
    u.log(req.body);
    next();
})

app.post("/", handler);
app.get("/", (req, res, next) => {
    res.status(200).contentType("text/html").send("<!DOCTYPE html>" +
        "<meta charset=utf8><title>The secret project..</title><h1>Goodbye, World!!!</h1>" +
        "<h2>Coming soon...</h2><h4>Congratulations! Server is running!</h4>");
});

function handler(req, res) {
    let body = req.body;
    if (body.type in u.types) {
        u.types[body.type](req, res);
    } else {
        u.send_ok(res);
    }
};

app.listen(process.env.PORT);

////////////////////////////////////////////////////////////////////////////////

const u = {
        types: {
            confirmation: (req, res) => {
                res.status(200).send(process.env.CONFIRMATION_TOKEN);
            },
            message_new: (req, res) => {
                let user_id = req.body.object.user_id;
                let message = req.body.object.body;
                
                u.use_method("message.send", {
                    user_id: user_id,
                    message: "HELLO_EPTA"
                });
                u.send_ok(res);
            }
        },
        date: () => {
            let date = new Date();
            return "[ " + date.toUTCString() + " ]";
        },
        log: (...args) => {
            console.log(u.date(), ...args);
        },
        send_ok: (res) => {
            res.status(200).send("ok");
        },
        stringify_params: (params) => {
            params.v = "5.0";
            params.access_token = process.env.TOKEN;
            let result = [];
            for (let i in params) {
                result.push("" + i + "=" + params[i]);
            }
            return result.join("&");
        },
        use_method: (method, params) => {
            let url = api_host + method + "?" + encoder(u.stringify_params(params));
            console.log(url);
            request.get(url, function (error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode);
                });
            }
        }