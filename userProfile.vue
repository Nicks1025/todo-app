<template>
    <div>
      <button id = "logout" @click.prevent = "logout">logout</button>
      <button id = "addAdmin" @click.prevent = "addAdmin">Add Admin</button>
      
      <div v-show = "addTasks" id = "registerAdmin" class = "text-center">
        <form @submit.prevent = "registerAdmin">
          
          <div class = "form-group">
            <label>Name : </label>
            <input type = "text" class = "form-control" placeholder = "name" v-model = "admin.name">
          </div>

          <div class = "form-group">
            <label>Username : </label>
            <input type = "text" class = "form-control" placeholder = "username" v-model = "admin.username">
          </div>

          <div class = "form-group">
            <label>password : </label>
            <input type = "password" class = "form-control" placeholder = "password" v-model = "admin.password">
          </div>    
          
          <p>{{ ErrMsg }}</p>
          
          <button>Register</button>
        </form>
      </div>

      <div v-show = "!addTasks">

        <div id = "box" class = "text-center">
              <h1 clas = "text-center mt-2 mb-3"><slot name = "title"></slot></h1>
              <div id = "info">
                  <div id = "circle"></div>
                  <div>
                      <p> user : {{this.$session.get("username")}} </p>
                      <p>Name : {{this.$session.get("name")}}</p>
                  </div>
              </div>
          </div>
  
          <div class = "form-group" v-show = "!addTasks">
            <input type = "text" class = "form-control" placeholder = "add task" v-model = "task" />
            <button type = "submit" class = "btn btn-warning" @click = "addTask">Add Task</button>
          </div>

          <div id = "table">
              <table class ="table table-bordered mt-5">
              <thead class="text-center" >
              <tr>
                  <th>S.No.</th>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
              </tr>
              </thead>
  
              <tbody v-for = "(task, index) in Tasks" :key = "index">
              <tr>
                  <td>{{index+1}}</td>  
  
                  <td>
                    <div id = "task">
                      <div>{{task.activity}}</div>
                      <input type = "text" v-show = "updatetask" v-model = "editTask">
                    </div>
                  </td>
  
                  <td id = "status" @click = "changeStatus(task.id,index)">{{task.status}}</td>                
  
                  <td>
                    <div class = "text-center" @click = "changeTask(task.id, index)" id = "edit">
                      <span class = "fa fa-pen"></span>
                    </div>
                  </td>
  
                  <td>
                    <div class = "text-center" @click = "deleteTask(task.id, index)" id = "delete">
                      <span class = "fa fa-trash"></span>
                    </div>
                  </td>
              </tr>
            
              </tbody>
          </table>
        </div>

      </div>
    </div>
</template>

<script>
const API_URL = "http://localhost:5000"

export default{

    beforeCreate() {
      this.addTasks = this.$session.get("addTask")
      if(this.$session.exists()){
        if(this.$session.get("type") == "admin") {
          this.$http.get(API_URL + "/getAll")
          .then(result => {
            // console.log(result.body)
            this.Tasks = result.body
          })
        }

        else if(this.$session.get("type") == "user"){
          this.$http.get(API_URL + "/gettask"+ "/" + this.$session.get("username"))
          .then(result => {
            this.Tasks = result.body
          })

        }
      }
      else{
        this.$router.push("/login")
      }
    },

    data() {
        return{
          admin:{
            username : '',
            password : '',
            name : '',
            type : "admin"
          },

          username : this.$session.get("username"), //to make get request
          
          Tasks : [],

          task :'',
          
          editTask : '',  
          updatetask : false,

          addTasks : false,
          ErrMsg : ''
        }
    },

    methods: {
      registerAdmin : function(){
        this.$http.get(API_URL + "/admin/" + this.admin.username)
        .then(data => {
          if(data.body.length != 0) {
            this.ErrMsg = "username exists"
            this.$router.push("/userProfile")
          }
          else{
            this.$http.post(API_URL + "/addAdmin", this.admin)
            .then(data => {
              this.$router.push("/login")
            })
          }
        })
      },

      addAdmin : function(){
        if(this.$session.get("type") == "admin") {
          this.addTasks = !this.addTasks;
        }
      },

      logout : function(){
          if(this.$session.exists()){
            this.$session.destroy()
            this.$router.push("/login")
            console.log("Session destroyed")
          }
      },

      addTask : function(){
        const user = {
          username : this.username,
          activity : this.task,
          status : "Not Completed"
        }
        this.$http.post(API_URL + "/addtask", user)
        .then(data => {
          console.log(data)
          this.Tasks.push({
            id : (this.Tasks.length) + 1,
            activity : user.activity,
            status : user.status
          })
        })
      },


      deleteTask : function(id,index){
        console.log("task executed : " + id);
        fetch(API_URL+"/deletetask/" + (id), {
          method : "DELETE",
          params : id,
          headers: {
            "content-type": "application/json"
          }
        })
        .then(() => {
          delete this.Tasks[index];
          location.reload();
        })
      },

      changeStatus : function(id,index){
        
        if(this.Tasks[index].status == "Completed") {
          this.Tasks[index].status = "Not Completed";
          // console.log(this.changed)
        }
        else{
          this.Tasks[index].status = "Completed";
        }

        fetch(API_URL + "/updatestatus/" + (id), {
          method : "PUT",
          params : id,
          body : JSON.stringify({status : this.Tasks[index].status}),
          headers : {
            "content-type" : "application/json",
          }
        })
        .then(response => response.json())
        
      },


      changeTask : function(id, index) {
        if(this.updatetask) {
          if(this.editTask.length != 0) {
            this.Tasks[index].activity = this.editTask;
            this.editTask = ''
            fetch(API_URL + "/updatetask/" + (id), {
              method : "PUT",
              params : id,
              body : JSON.stringify({activity : this.Tasks[index].activity}),
              headers : {
                "content-type" : "application/json"
              }
            })
            .then(response => response.json())
          }
          this.updatetask = false;
        }
        else{
          this.updatetask = true;
        }


      }

    },
    
}
</script>

<style>
#box{
    border:0.1px solid lightgrey;
    margin:0 auto;
    width:500px;
    margin-top:50px;
    padding:20px;
}
#info{
    display:flex;
    align-items: center;
}

#table {
    width:90%;
    margin:0 auto;
}
#circle{
    width:200px;
    height:200px;
    border:1px solid black;
    border-radius:50%;
    margin-right:20px;
}

#logout {
  text-align: end;
  display:flex;
}

.form-group{
  margin-top:15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width:800px;
  margin: 0 auto;
}

.form-group button{
  margin : 10px;
  width:100px;
}

#status, #edit, #delete{
  cursor: pointer;
}

#task{
  display:flex;
  align-items: center;
  justify-content: space-around;
}


#registerAdmin{
  border:1px solid black;
  margin:auto;
  width:500px;
  margin-top:100px;
  padding:20px;
}
#registerAdmin input{
  width:200px;
  margin-left:20px;
}

#registerAdmin .form-group{
  margin-bottom:10px;
    display: flex;
    align-items: center;
    width:auto;
}
#registerAdmin button{
  border-radius: 8px;
  margin-top:10px;
}


</style>