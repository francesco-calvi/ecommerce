<template>
    <div>
        <h2 class="form-title">Accedi</h2>
        <form id="login-form" class="form">
            <hr>
            <label for="email" class="label"><b>Email</b></label>
            <input 
                type="text" 
                placeholder="Inserisci l'email"
                name="email" 
                id="email" 
                class="email"
                required 
                v-model="formData.email"    
                @focus="showErrorMsg=false" 
            />
            <label for="psw" class="label"><b>Password</b></label>
            <input 
                type="password" 
                placeholder="Inserisci la password" 
                name="psw" 
                id="psw" 
                class="password"
                required 
                v-model="formData.password"
                @focus="showErrorMsg=false"
            /> 
            <button 
                type="submit" 
                class="loginbtn btn"
                @click="handleClick">
                Login
            </button>
            <p v-if="showErrorMsg" style="color: var(--red);">Email o password errati, riprova.</p>
            <hr>
            <div class="go-to">
                <span>Non sei registrato?</span>        
                <router-link :to="{name:'sign-up'}">
                    <span style="color:lightblue;font-weight:bold"> Inizia qui</span>
                </router-link>
            </div>
        </form>
        
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        name: 'LoginComponent',
        data() {
            return {
                formData: {
                    email: '',
                    password: ''
                },
                showErrorMsg: false
            }
        },
        beforeMount() {
          this.isLoginForm(true);
        },
        beforeDestroy() {
          if(this.$route.path!=='/sign-up') {
            this.isLoginForm(false);
          }
        },
        computed: {
            ...mapState(['loggedUser'])
        },
        methods: {
            ...mapActions(['updateCurrentUserAction', 'isLoginForm']),
            async handleClick(event) {
                event.preventDefault();  
                await this.updateCurrentUserAction(this.formData);         
                if(this.loggedUser == undefined) {
                    this.showErrorMsg = true;
                } else {
                    this.$router.push({ path: '/' })
                }
                this.resetForm();              
            },
            resetForm() {
                this.formData.email = ''; 
                this.formData.password = '';
            }
        }
    }
</script>

<style>

.form-title {
    text-align: center; 
    padding: 0;
    margin: 0;
}

.form {
    width: 40%;
    margin: 0 auto;
    text-align: start;
    padding: 10px 200px;
    margin-bottom: 100px;
}

label.label {
    display: inline-block;
    width: 100%;
}

input[type=text].email, input[type=password].password {
  width: calc(100% - 30px);
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text].email:focus, input[type=password].password:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.loginbtn {
  background-color: #04AA6D;
  padding: 16px 20px;
  margin: 8px 0;
  opacity: 0.9;
  font-size: 18px;
}

.loginbtn:hover {
  opacity: 1;
}

.go-to {    
    text-align: center;
}
</style>