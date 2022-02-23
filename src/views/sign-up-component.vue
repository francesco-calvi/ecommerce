<template>
    <div>
        <h2 class="form-title">Crea un account</h2>
        <p style="margin-bottom:0;text-align:center">Inserisci i dati richiesti per creare un account.</p>
        <form id="registration-form" class="form">
            <hr>            
            <label for="email" class="label"><b>Email</b></label>
            <input  type="text" 
                    placeholder="Inserisci l'email" 
                    name="email" 
                    id="email"
                    class="email" 
                    required 
                    v-model="formData.email"
                    @focus="showErrorMsg=false"/>
                    
            <label for="psw" class="label"><b>Password</b></label>
            <input  type="password" 
                    placeholder="Inserisci la password" 
                    name="psw" 
                    id="psw"
                    class="password" 
                    required 
                    v-model="formData.password"
                    @focus="showErrorMsg=false"/> 
            <label for="psw-repeat" class="label"><b>Repeat Password</b></label>
            <input  type="password" 
                    placeholder="Ripeti la password" 
                    name="psw-repeat" 
                    id="psw-repeat"
                    class="password" 
                    required 
                    v-model="formData.repeatedPass"
                    @focus="showErrorMsg=false"/>
            <p v-if="showErrorMsg" style="color: var(--red);">Le password devono essere uguali.</p>            
            <hr>
            <p>Creando un account dichiari di accettare i nostri <a class="terms">Terms & Privacy</a>.</p>
            <button type="submit" class="loginbtn btn" @click="handleClick">Registrati</button>
            <hr>            
            <div class="go-to">
                <span>Hai già un account?</span>        
                <router-link :to="{name: 'login'}">
                    <span style="color:lightblue;font-weight:bold"> Login</span>
                </router-link>
            </div>
        </form>        
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        name: 'SignUpComponent',
        data() {
          return {
            formData: {
              email: '',
              password: '',   
              repeatedPass: ''           
            },
            showErrorMsg: false
          }
        },
        beforeMount() {
          this.isLoginForm(true);
        },
        beforeDestroy() {
          if(this.$route.path!=='/login') {
            this.isLoginForm(false);
          }
        },
        computed: {
          userFromForm() {            
            return {email: this.formData.email,password:this.formData.password};
          },
          validateData() {
            return this.formData.password === this.formData.repeatedPass;
          }
        },
        methods: {
          ...mapActions(['addUserAction', 'isLoginForm']),
          async handleClick(event) {
            event.preventDefault();
            if(this.validateData){
              const data = this.userFromForm;               
              await this.addUserAction(data);
            } else {
              this.showErrorMsg = true;
            }
            this.resetForm();     
          },
          resetForm() { 
              this.formData.email = '';
              this.formData.password = '';
              this.formData.repeatedPass = '';              
          },
          
        }
    }
</script>

<style scoped>

a.terms {
  pointer-events: none;
  color: rgb(76, 157, 238);
}

</style>