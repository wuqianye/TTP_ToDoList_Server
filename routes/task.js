const express = require("express");

// taskRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const taskRoutes = express.Router();

//This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the tasks.
taskRoutes.route("/tasks").get(function (req, res) {
  let db_connect = dbo.getDb("todo_list");
  db_connect
    .collection("tasks")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// following functions still need to be modified --Wuqian Ye

// // This section will help you create a new task.
// taskRoutes.route("/task/add").post(function (req, res) {
//   let db_connect = dbo.getDb("todo_list");
//   let myobj = {
//     person_name: req.body.person_name,
//     person_position: req.body.person_position,
//     person_level: req.body.person_level,
//   };
//   db_connect.collection("tasks").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//   });
// });

// // This section will help you update a task by id.
// taskRoutes.route("/update/:id").post(function (req, res) {
//   let db_connect = dbo.getDb("todo_list");
//   let myquery = { id: req.body.id };
//   let newvalues = {
//     $set: {
//       person_name: req.body.person_name,
//       person_position: req.body.person_position,
//       person_level: req.body.person_level,
//     },
//   };
//   db_connect
//     .collection("tasks")
//     .updateOne(myquery, newvalues, function (err, res) {
//       if (err) throw err;
//       console.log("1 task updated");
//     });
// });

// // This section will help you delete a task
// taskRoutes.route("/:id").delete((req, res) => {
//   let db_connect = dbo.getDb("todo_list");
//   var myquery = { id: req.body.id };
//   db_connect.collection("tasks").deleteOne(myquery, function (err, obj) {
//     if (err) throw err;
//     console.log("1 task deleted");
//   });
// });

module.exports = taskRoutes;
