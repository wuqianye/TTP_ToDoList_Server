const express = require("express");

// Routes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const Routes = express.Router();

//This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the tasks.
Routes.route("/tasks").get(function (req, res) {
    let db_connect = dbo.getDb("todo_list");
    db_connect
        .collection("tasks")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new task.
Routes.route("/task/add").post(function (req, res) {
    let db_connect = dbo.getDb("todo_list");
    let myobj = {
        user_id: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date,
        isDone: req.body.isDone,
    };
    db_connect.collection("tasks").insertOne(myobj, function (err, res) {
        if (err) throw err;
    });
});

// This section will help you update a task by id.
Routes.route("/update-task/:id").post(function (req, res) {
    let db_connect = dbo.getDb("todo_list");
    let myquery = { id: req.body.id };
    let newvalues = {
        $set: {
            user_id: req.body.user_id,
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            isDone: req.body.isDone,
        },
    };
    db_connect
        .collection("tasks")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 task updated");
        });
});

// This section will help you delete a task
Routes.route("/delete-task/:id").delete((req, res) => {
    let db_connect = dbo.getDb("todo_list");
    var myquery = { id: req.body.id };
    db_connect.collection("tasks").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 task deleted");
    });
});

// This section will help you get a list of all the users.
Routes.route("/users").get(function (req, res) {
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
Routes.route("/user/add").post(function (req, res) {
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
Routes.route("/update-user/:id").post(function (req, res) {
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
Routes.route("/delete-user/:id").delete((req, res) => {
    let db_connect = dbo.getDb("todo_list");
    var myquery = { id: req.body.id };
    db_connect.collection("users").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 user deleted");
    });
});

module.exports = Routes;
