let fs = require('fs');

let data = fs.readFileSync('tasks.json');

let tasksList = JSON.parse(data);
const express = require('express');
const app = express();

app.use(express.json());

// when get request is made, res() is called
app.get('/tasks', (req, res) => {
  
    res.send(tasksList|| "No tasks");
});

app.get('/tasks/new', (req, res) => {
    let newID = req.query.id

    tasksList.tasks[newID] = {
        "name": req.query.name,
        "id": req.query.id,
        "description": req.query.description,
        "owner": req.query.owner,
        "members": req.query.members,
        "sub": req.query.sub,
        "date": req.query.date
    }

    fs.writeFile("tasks.json", JSON.stringify(tasksList, null, 1), added)
    function added() {
        res.send("New task added");
    }
});

app.get('/tasks/remove', (req, res) => {
    let badID = req.query.id
    delete tasksList.tasks[badID]

    fs.writeFile("tasks.json", JSON.stringify(tasksList, null, 1), removed)
    function removed() {
        res.send("Task removed from TODO List")
    }
})

app.listen(3000,() => {
  console.log('Listening on port 3000!');
});
