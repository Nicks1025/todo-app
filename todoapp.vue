<template>
    <div class="container">
      <h2 class = "text-center mt-5" >My Vue Todo App</h2>
      <div class = "d-flex" style = "margin-top : 25px">
        <input type = "text" class ="form-control" id = "name" placeholder = "Enter Your Name" v-model = "task.name" required = true/>
        <input type = "text" placeholder = "Enter Task" class = "form-control" v-model.lazy = "task.activity" required = true/>
        <button class = "btn btn-warning rounded-0" @click = "submitTask">Submit</button>
      </div>

      <p v-show = "show" style = "margin:5px; color:red">{{ alert }}</p>
      <div id = "edit_input">
        <input type = "text" v-show = "edit" class = "form-control" placeholder = "edit your task here.." v-model = "editContent">
        <button @click = "showInput">Edit</button>
      </div>

      <input type = "text" id = "search" v-model = "search" placeholder = "Search..." class = "form-control">
      <table class ="table table-bordered mt-5">
        <thead class="text-center" >
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Task</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        
        <tbody v-for = "(task, index) in filteredTasks" :key = "index">
          <tr>
            <td>{{index+1}}</td>
            <td>{{task.name}}</td>
            <td>{{task.activity}}</td>
            <td id = "status" @click = "changeStatus(task.id,index)">{{task.status}}</td>
            <td>
              <div class = "text-center" @click = "changeTask(task.id, index)">
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
  </template>
  
  <script>
  const API_URL = "http://localhost:5000/todos";
  const API_URL_STATUS = "http://localhost:5000/updatestatus"
  const API_URL_TASK = "http://localhost:5000/updateTask"
  import searchMixins from "../mixins/searchMixins";
  export default {
    beforeCreate() {
      fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        this.tasks = result;
        // console.log(result)
      })
      
    },
    beforeUpdate(){
    },
    data () {
      return {
        tasks:[],
        task :{
          name : '',
          activity : '',
          status : 'Not Completed'
        },

        alert : 'enter valid input!!',
        show : false,

        edit : false,
        editContent : '', 
        search : ''
      }
    },
    methods: {
      submitTask : function(){
        if(this.task.name.length!=0 && this.task.activity.length!= 0) {
          this.show = false;
        fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(this.task),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(result => {
          this.tasks.push({
            id : (this.tasks.length) + 1,
            name : result.rows[0].name,
            activity : result.rows[0].activity,
            status : result.rows[0].status
          });
          location.reload()
        });
      }
        else{
          this.show = true;
        }
      },
      deleteTask : function(id,index){
        console.log("task executed : " + id);
        fetch(API_URL+"/" + (id), {
          method : "DELETE",
          params : id,
          headers: {
            "content-type": "application/json"
          }
        })
        .then(() => {
          delete this.tasks[index];
          location.reload();
        })

      },
      changeStatus : function(id,index){
        if(this.tasks[index].status == "Completed") {
          this.tasks[index].status = "Not Completed";
          // console.log(this.changed)
        }
        else{
          this.tasks[index].status = "Completed";
        }

        fetch(API_URL_STATUS + "/" + (id), {
          method : "PUT",
          params : id,
          body : JSON.stringify({status : this.tasks[index].status}),
          headers : {
            "content-type" : "application/json",
          }
        })
        .then(response => response.json())
        
      },

      changeTask : function(id, index) {
        if(this.edit) {
          fetch("http://localhost:5000/updateTask/" + (id), {
            method : "PUT",
            params : id,
            body : JSON.stringify({activity : this.editContent}),
            headers : {
              "content-type" : "application/json"
            }
          })
          .then(()=> {
            response => response.json()
            this.tasks[index].activity = this.editContent;
          })
        }
      },
      // changeTask : function(id, index){
      //   fetch(API_URL_TASK + "/" + (id), {
      //     method : "PUT",
      //     params : id,
      //     body : JSON.stringify({activity : this.editContent}),
      //     header : {
      //       "content-type" : "application/json"
      //     },
      //   })
      //   .then(()=> {
      //     response => response.json()
      //     console.log(this.editContent)
      //   })
      //   this.edit = false;
      // // location.reload();
      // },

      showInput : function(){
        this.edit = true;

      },
    },
    mixins : [searchMixins]
  }
  </script>
  <style>
  #name{
    width:200px;
    margin-right:15px;
  }

  #delete:hover{
    cursor:pointer;
  }

  #status:hover{
    cursor:pointer;
  }

  #edit_input{
    display:flex;
    justify-content:center;
    margin-top:10px;
  }

  #edit_input input{
    width:300px;
  }

  #search{
    margin:10px 0;
  }
  </style>
  