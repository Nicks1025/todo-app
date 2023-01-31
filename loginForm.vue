<template>
    <div id = "box" class = "text-center">
        <h1 class = "text-center mt-3 mb-4"><slot name = "title">Login</slot></h1>
        <form @submit.prevent = "loginUser(username)">
            <div class = "form-group">
                <label for = "username">Username : </label>
                <input type = "text" class = "form-control" id = "username" v-model = "username" placeholder = "username">
            </div>

            <div class = "form-group">
                <label for = "password">Password : </label>
                <input type = "password" class = "form-control" id = "password" v-model = "password" placeholder = "passsword">
            </div>

            <p v-show = "show" style = "color:red">{{ errMsg }}</p>

            <button type = "submit" class = "text-center btn btn-warning mt-2" >Login</button>
            <p class = "mt-3">Don't have an account? <a href = "/">Register here</a></p>
        </form>
    </div>
</template>

<script>
const API_URL = "http://localhost:5000";
export default{
    beforeCreate() {
        if (this.$session.exists()) {
            this.$router.push('/userProfile')
        }
    },
    data(){
        return{
            user : [],
            username : '', 
            password : '',
            show : false,
            errMsg : '',
            err : false
        }
    },
    methods : {

        loginUser : function(username) {
            this.$http.get(API_URL +"/users/" +  username)
            .then(data => {
                if(data.body.length != 0) {
                    if(data.body[0].password == this.password){
                        this.$session.start()
                        this.$session.set("username",this.username)
                        this.$session.set("name", data.body[0].name)
                        this.$session.set("type", data.body[0].type)
                        this.$session.set("addTask", true)
                        this.$router.push("/userprofile")
                    }
                    else{
                        this.errMsg = "username or password is incorrect"
                        this.show = true;
                    }
                }
                else{
                    this.$http.get(API_URL + "/admin/" + username)
                    .then(data => {
                        if(data.body.length != 0) {
                            if(data.body[0].password == this.password) {
                                this.$session.start()
                                this.$session.set("username",this.username)
                                this.$session.set("name", data.body[0].name)
                                this.$session.set("type", data.body[0].type)
                                this.$session.set("addTask", false)
                                this.$router.push("/userprofile")        
                            }
                            else{
                                this.errMsg = "incorrect password"
                                this.show = true
                            }
                        }
                        else{
                            this.errMsg = "user not exists"
                            this.show = true
                            this.$router.push("/")
                        }
                    })
                }
            })



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

#box input{
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