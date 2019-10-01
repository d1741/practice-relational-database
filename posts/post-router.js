const express = require("express");

// database access using knex

const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  // get data from db and return to client using db object declared on line 4
  // select * from posts = sql

  // all db operations return a promise
  db.select("*") //also db('posts'); will do the same thing
    .from("posts")
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to GET posts", err });
    });
});

router.get("/:id", (req, res) => {});
// Think about what we'd want from the actual SQL query
// SELECT * FROM Posts WHERE id = param.id
const { id } = req.params;
db("posts")
  .where({ id })
  .then(posts => {
    const post = posts[0];

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "invalid post id" });
    }
  })
  .catch(error => {
    res.status(500).json({ message: "Failed to GET id", err });
  });

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
