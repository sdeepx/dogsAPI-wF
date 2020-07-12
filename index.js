const server = require("http").createServer();
const fs = require("fs");
const superagent = require('superagent');


let temp = fs.readFileSync(`${__dirname}/index.html`, "utf-8");

const Replace = (tmp, data) => {
    let output = tmp.replace(/{%IMAGE%}/g, data);
    return output;
}

server.on("request", (req, res) => {
    const path = req.url;
    if (path === "/" || path === "/home" || path === "/index") {
        res.writeHead(200);
        res.end("Hello")

    } else if (path === "/dogs") {
        res.writeHead(200, {
            "Content-type": "text/html"
        });

        superagent
            .get("https://dog.ceo/api/breeds/image/random")
            .end((err, img) => {

                let page = Replace(temp, img.body.message);
                res.end(page)

            })

    } else {
        res.writeHead(404);
        res.end("page not found")

    }

})

server.listen()