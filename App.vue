<template>
  <div>
    <router-view></router-view>
    
    <!-- <todo-app></todo-app> -->
    <!-- <registration-form>
      <h1 slot = title>Register With Us</h1>
    </registration-form> -->

    <!-- <login-form><h1 slot = title>Login</h1></login-form> -->
    <!-- <user-profile>
      <h1 slot = title>Welcome</h1>
    </user-profile> -->
    
  </div>
</template>

<script>
  import Todoapp from './components/todoapp.vue';
  import registration from './components/registration_form.vue';
  import login from './components/loginForm.vue';
  import user from './components/userProfile.vue';

export default {
  components : {
    'todo-app' : Todoapp,
    'registration-form' : registration,
    'login-form' : login,
    'user-profile' : user

  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
