const express = require("express");
const cors = require("cors");
require('./db/config')
const products = require('./db/product.js')
const jwt = require("jsonwebtoken")
const jwtkey = "e-comm "
const users = require('./db/users')

const app = express();
app.use(cors());
app.use(express.json())

app.post("/register", async (req, resp) => {
    let user = new users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send("Something went wrong")
        }
        resp.send({ result, auth: token })
    })
})
app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await users.findOne(req.body).select("-password");
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (error, token) => {

                if (error) {
                    resp.send("Something went wrong")

                }
                else {
                    resp.send({ user, auth: token })
                }

            })
        }
        else {
            resp.send({ result: 'No user found' })
        }
    }
    else resp.send({ result: 'No user found' })

})

app.post("/add-products", verfiytoken, async (req, resp) => {

    let pro = new products(req.body);
    let result = await pro.save();
    resp.send(result)
})
app.get("/products", verfiytoken, async (req, resp) => {
    let productz = await products.find();
    if (productz.length > 0) {
        resp.send(productz)
    } else {
        resp.send({ result: "No Product found" })
    }
});
app.delete("/product/:id", verfiytoken, async (req, resp) => {
    let result = await products.deleteOne({ _id: req.params.id });
    resp.send(result)
});

app.get("/product/:id", verfiytoken, async (req, resp) => {
    let result = await products.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    } else {
        resp.send({ "result": "No Record Found." })
    }
})

app.put("/product/:id", verfiytoken, async (req, resp) => {
    let result = await products.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});
app.get("/search/:key", verfiytoken, async (req, resp) => {
    let result = await products.find({
        "$or": [
            {
                name: { $regex: req.params.key }
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    resp.send(result);
})
function verfiytoken(req, resp, next) {
    let token = req.headers["authorization"];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, jwtkey, (err, valid) => {

            if (err) {
                resp.status(401).send({result:"Please provide valid token"})


            }
            else { next(); }
        })
    }
    else {
        resp.status(403).send({ result: "Please add token with header" })

    }
}

app.listen(4500);
