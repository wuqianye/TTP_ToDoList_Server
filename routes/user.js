const express = require("express");

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userRoutes = express.Router();

//This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the users.
userRoutes.route("/users").get(function (req, res) {
  let db_connect = dbo.getDb("todo_list");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new user.
userRoutes.route("/user/add").post(function (req, res) {
  let db_connect = dbo.getDb("todo_list");
  let myobj = {
    username: req.body.username,
    password: req.body.password,
  };
  db_connect.collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
  });
});

// This section will help you update a user by id.
userRoutes.route("/update-user/:id").post(function (req, res) {
  let db_connect = dbo.getDb("todo_list");
  let myquery = { id: req.body.id };
  let newvalues = {
    $set: {
        username: req.body.username,
        password: req.body.password,
    },
  };
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 user updated");
    });
});

// This section will help you delete a user
userRoutes.route("/delete-user/:id").delete((req, res) => {
  let db_connect = dbo.getDb("todo_list");
  var myquery = { id: req.body.id };
  db_connect.collection("users").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 user deleted");
  });
});

module.exports = userRoutes;
