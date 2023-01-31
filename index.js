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


// users


app.get("/users/:username", async(req,res) => {
    try {
        const users = await pool.query("select * from users where username = $1", [req.params.username])
        res.json(users.rows);
    } catch (error) {
        console.error(error.message)
    }
})

app.post("/adduser", async(req,res) => {
    try {
        const {name, username, password, type} = req.body;
        const newUser = await pool.query("insert into users(name,username, password, type) values($1,$2,$3, $4)", [name,username,password, type])
        res.json(newUser)
    } catch (error) {
        console.error(error.message)
    }
})


// admin

app.get("/admin/:username", async(req,res) => {
    try {
        const admin = await pool.query("select * from admin where username = $1", [req.params.username])
        res.json(admin.rows)
    } catch (error) {
        console.error(error.message)

    }
})

app.post("/addAdmin", async(req,res) => {
    try {
        const {name, username, password, type} = req.body
        const addAdmin = await pool.query("insert into admin(name, username, password, type) values($1, $2, $3, $4)", [name, username, password, type])
        res.json(addAdmin)
    } catch (error) {
        console.error(error.message)
    }
})



// todo

app.get("/getAll", async(req,res) => {
    try {
        const allTask = await pool.query("select * from todo")
        res.json(allTask.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.get("/gettask/:username", async(req,res) => {
    try {
        const getTasks = await pool.query("select * from todo where username = $1", [req.params.username])
        res.json(getTasks.rows)        
    } catch (error) {
        console.error(error.message)
    }
})


app.post("/addtask", async(req,res) => {
    try {
        const {username, activity, status} = req.body;
        const newTask = await pool.query("insert into todo(username, activity, status) values($1,$2,$3)", [username, activity, status]) 
        res.json(newTask)    
    } catch (error) {
        console.error(error.message)
    }
})

app.put("/updatestatus/:id", async(req,res) => {
    try {
        const {status} = req.body
        const updateStatus = await pool.query("update todo set status = $1 where id = $2", [status, req.params.id])       
        res.json(updateStatus) 
    } catch (error) {
        console.error(error.message)
    }
})


app.put("/updatetask/:id", async(req,res) => {
    try {
        const {activity} = req.body
        const updateTask = await pool.query("update todo set activity = $1 where id = $2", [activity, req.params.id])
        res.json(updateTask)
    } catch (error) {
        console.error(error.message)
    }
})

app.delete("/deletetask/:id", async(req,res) => {
    try {
        const deleteTask = await pool.query("delete from todo where id = $1", [id = req.params.id])
        res.json(deleteTask)
    } catch (error) {
        console.error(error.message)
    }
})


























// // get all todos
// app.get('/user', async(req,res) => {
//     try {
//         const allTodos = await pool.query("select * from users where username = $1");
//         res.json(allTodos.rows);
//     } catch (error) {
//         console.error(error.message);
//     }
// })



// // get a todo
// app.get("/:username", async(req,res) => {
//     try {
//         const todo = await pool.query("select * from todo where username = ($1)", [req.params.username]);
//         res.json(todo.rows[0]);
//     } catch (error) {
//         console.error(error.message);
//     }
// })


// // create a todo
// app.post("/",async(req,res) => {
//     try{
//         // await
//         const {name} = req.body;
//         const {username} = req.body;
//         const {password} = req.body;
//         const newTodo = await pool.query("insert into todo(name,username,password) values ($1,$2,$3) RETURNING *",[name, username, password]);
//         res.json(newTodo);
//     }
//     catch(err){
//         console.error(err.message)
//     }
// })


// // update a todo
// app.put("/addTask/:username", async(req,res) => {
//     try {
//         const {username} = req.params;
//         const {activity} = req.body;
//         const {status} = req.body; 
//         const updateTodo = await pool.query("update todo set activity = $1 where username = $2", [activity, username])
//         const update = await pool.query("update todo set status = $1 where username = $2", [status, username])
//         res.json("Task was updated");
//     } catch(error) {
//         console.error(error.message)
//     }
// })


// app.put("/updatestatus/:username", async(req,res) => {
//     try {
//         const {username} = req.params;
//         const {status} = req.body;
//         const updatestatus = await pool.query("update todo set status = $1 where username = $2",[status,username])
//         res.json("status was updated")
//     } catch (error) {
//         console.error(error.message)
//     }
// })

// // delete a todo

// app.delete("/deletetask/:username", async(req,res) => {
//     try {
//         const {username} = req.params;
//         const deleteTodo = await pool.query("delete from todo where username = $1",[username]);
//         res.json("todo was successfully deleted");
//     } catch (error) {
//         console.error(error.message);
//     }
// })










// app.post("/", async(req,res) => {
//     try {
//         const {name} = req.body;
//         const {username} = req.body;
//         const {password} = req.body;
//         const newUser = await pool.query("insert into todo(name,username,password) values ($1,$2,$3) RETURNING *",[name, username, password]);
//         res.json(newUser.rows);

//     } catch (error) {
//         console.error(error.message);
//     }
// })


// // get all users
// app.get("/users", async(req,res) => {
//     try {
//         const allUsers = await pool.query("select * from todo");
//         res.json(allUsers.rows);
//     } catch (error) {
//         console.error(error.message);
//     }
// })

// // get a specific user by username

// app.get("/users/:username", async(req,res) => {
//     try {
//         const {username} = req.params;
//         const user = await pool.query("select * from todo where username = $1",[username])
//         res.json(user.rows);
//     } catch (error) {
//         console.error(error);
//     }
// })  


const PORT = 5000;

app.listen(PORT, function(){console.log(`Server started on Port ${PORT}`)})