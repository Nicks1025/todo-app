const express = require('express');

const cors = require('cors');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');

const app = express();

const pool = require('./db')
app.use(express.json())

app.use(cors());
// app.use(morgan('tiny'));
// app.use(bodyParser.json());
// routes


// get all todos
app.get('/todos', async(req,res) => {
    try {
        const allTodos = await pool.query("select * from todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
})



// get a todo
app.get("/todos/:id", async(req,res) => {
    const {id} = req.params;
    try {
        const todo = await pool.query("select * from todo where id = ($1)", [id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})


// create a todo
app.post("/todos",async(req,res) => {
    try{
        // await
        const {name} = req.body;
        const {activity} = req.body;
        const {status} = req.body;
        const newTodo = await pool.query("insert into todo(name,activity,status) values ($1,$2,$3) RETURNING *",[name, activity, status]);
        res.json(newTodo);
    }
    catch(err){
        console.error(err.message)
    }
})


// update a todo
app.put("/updateTask/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const {activity} = req.body;
        const updateTodo = await pool.query("update todo set activity = $1 where id = $2", [activity, id])
        res.json("Task was updated");
    } catch(error) {
        console.error(error.message)
    }
})


app.put("/updatestatus/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const updatestatus = await pool.query("update todo set status = $1 where id = $2",[status,id])
        res.json("status was updated")
    } catch (error) {
        console.error(error.message)
    }
})

// delete a todo

app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("delete from todo where id = $1",[id]);
        // const {nextval} = pool.query("select nextval('todo_todo_id_seq'::regclass)");
        // pool.query("alter sequence todo_todo_id_seq restart with $1",[Number(nextval)-1]);
        res.json("todo was successfully deleted");
    } catch (error) {
        console.error(error.message);
    }
})

const PORT = 5000;

app.listen(PORT, function(){console.log(`Server started on Port ${PORT}`)})