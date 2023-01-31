
import register from '../components/registration_form.vue'
import login from '../components/loginForm.vue'
import user from '../components/userProfile.vue'


export default [
    {
        path : '/',
        component : register
    },
    {
        path : '/login',
        component : login
    },
    {
        path : '/userprofile',
        component : user
    }
    ]
