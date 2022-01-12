const express = require('express');
const axios = require('axios');
// const redis = require('redis');
const Redis = require("ioredis");
const client = new Redis(); // uses defaults unless given configuration object

const app = express();

// const client = redis.createClient({
//     host: 'localhost',
//     port: 6379
// });


// http://localhost:1234/users/1

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    try {
        client.get(id, async (err, user) => {
            if (err) throw err;
            if (user) {
                res.status(200).send({
                    user: JSON.parse(user),
                    message: "got from redis cache"
                });
            } else {
                const user = await axios.get("https://jsonplaceholder.typicode.com/users/" + id);
                client.setex(id, 600,  JSON.stringify(user.data));
                res.status(200).send({
                    "user": user.data,
                    message: "cache Miss"
                });
            }
        });

    } catch (err) {
        console.log(err);
    }
});


app.listen(3000, () => console.log("cache code ready!!!"))