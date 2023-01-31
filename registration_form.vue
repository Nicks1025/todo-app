<template>
    <div id = "box" class = "text-center">
        <h1 class = "text-center mt-3 mb-4"><slot name = "title">Register here</slot></h1>
        
        <form @submit.prevent = "handleSubmit">
            <div class = "form-group">
                <label for = "name">Name : </label>
                <input type = "text" class = "form-control" id = "name" v-model = "user.name" placeholder = "Name">
            </div>

            <div class = "form-group">
                <label for = "username">Username : </label>
                    <input type = "text" class = "form-control" id = "username" v-model = "user.username" placeholder = "username">
            </div>

            <div class = "form-group">
                <label for = "password">Password : </label>
                <input type = "password" class = "form-control" id = "password" v-model = "user.password" placeholder = "passsword">
            </div>

            <input type = "checkbox" value = "admin" id = "checkbox" v-model = "type">admin
            <br>

            <button type = "submit" class = "text-center btn btn-warning mt-2" @click.prevent = "registerUser()">Register here</button>
            <p v-show = "show" style = "color:red">{{username_auth}}</p>
            <p class = "mt-3">Already have an account? <a href = "/login">Log in</a></p>
        </form>
    </div>
</template>
<script>
import loginForm from './loginForm.vue'
const API_URL = "http://localhost:5000"
export default{

    beforeCreate(){
        if(this.$session.exists()){
            this.$session.destroy();
        }
    },

    name : "Register",
    component : {
      login : loginForm  
    },
    data(){
        return{
            users:[],
            user : {
                name : "",
                username : '',
                password : '',
                type : ''
            },
            show : false,
            username_auth : '',
            register : true,
            type : false
        }
    },
    methods :{
        registerUser : function(username){

            if(this.user.username && this.user.password) {

                this.$http.get(API_URL + "/users/" + this.user.username)
                .then(data => {
                    if(data.body.length != 0){
                        this.username_auth = this.user.username + " already exists as a user";
                        this.show = true;
                        this.$router.push("/login")
                    }
                    else{
                        this.$http.get(API_URL + "/admin/" + this.user.username)
                        .then(data => {
                            if(data.body.length != 0) {
                                this.username_auth = this.user.username + " exists as a admin";
                                this.show = true;
                                this.$router.push("/login")
                            }
                            else{
                                if(this.type == true){
                                    this.user.type = "admin"
                                    this.$http.post(API_URL + "/addAdmin", this.user)
                                    .then(data => {
                                        this.$router.push("/login")
                                    })
                                }
                                else{
                                    this.user.type = "user"
                                    this.$http.post(API_URL + "/adduser",  this.user)
                                    .then(data => {
                                        console.log("user added")
                                        this.$router.push("/login")
                                    })
                                }
                            }
                        })

                    }
                })


            }  
            else{
                this.show = true;
                this.username_auth = "enter valid details!! above field cannot be empty"
            }          
        }
    
    }
}
</script>


<style>
#box{
    border:1px solid black;
    margin:auto;
    width:500px;
    margin-top:100px;
    padding:20px;
}

#box #name, #usernae, #password{
    width:350px;
    margin-left:10px;
}

.form-group{
    margin-bottom:10px;
    display: flex;
    align-items: center;
    width:auto;
}

</style>