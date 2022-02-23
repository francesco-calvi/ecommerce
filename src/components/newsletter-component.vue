<template>
  <div class="newsletter-container container">
    <div class="left">
      <h4>Non vuoi perderti l'ultima moda?</h4>
      <h4>Resta sempre aggiornato sulle novità</h4>
      <p>Iscriviti alla newsletter</p>
    </div>
    <div class="right">
      <form>
        <label  for="email-input" 
                :class="{'is-focused' : isEmailInputFocus, 'invalid-input': !emailInputValidity}" 
                class="email-label">Il tuo indirizzo email</label>
        <input  type="text" 
                id="email-input" 
                class="email hover-focus-border"
                :class="{'is-empty': !emailInputValidity}" 
                value="" 
                @focus="isEmailInputFocus=true" 
                @blur="isEmailInputFocus=false"
                ref="emailInput"
                >
        <span class="error-msg" :class="{'visible': !emailInputValidity}">Inserisci un indirizzo email valido</span>
        <div class="preferences">
          <div class="paragraphs">
            <p><strong>Gestisci le tue preferenze</strong></p>
            <p>Cosa preferisci?</p>
          </div>        
          <div>
            <div>
              <input type="radio" name="category" id="category-1" ref="radio1">
              <label for="category-1">Moda uomo</label>
            </div>
            <div>
              <input type="radio" name="category" id="category-2" ref="radio2">
              <label for="category-2">Moda donna</label>
            </div>
            <span class="error-msg" :class="{'visible': !radioButtonsValidity}">Scegli un'opzione</span>
          </div>
        </div>
        <input type="button" value="Iscrivimi" class="btn submit-btn" @click="checkInputsValidity">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsletterComponent',
  data() {
    return  {
      isEmailInputFocus: false,
      emailInputValidity: true,   
      radioButtonsValidity: true    
    }
  },
  methods: {
    checkInputsValidity() {
      const emailInput = this.$refs.emailInput;
      const radio1Value = this.$refs.radio1.checked;
      const radio2Value = this.$refs.radio2.checked;

      if(this.checkEmailValidity(emailInput.value)) {        
        this.emailInputValidity = true;
      } else {
        this.emailInputValidity = false;
        emailInput.focus();
      }

      if(radio1Value || radio2Value) {
        this.radioButtonsValidity = true;
      } else {
        this.radioButtonsValidity = false;
      }

    },
    checkEmailValidity(value) {
      return  value &&
              value != "" &&
              value.trim() != "" &&
              value.includes(".") && 
              value.includes("@") &&
              value[0] != (".") &&
              value[0] != ("@") &&
              value[value.length-1] != (".") &&
              value[value.length-1] != ("@");
    }
  }

}
</script>

<style scoped>
.newsletter-container {
  background-color: #efeff0;
  display: flex;
  margin: 100px 0;
}

.newsletter-container > div {  
  padding-top: 25px;
 
}

.left {
  padding-bottom: 25px;
  width: 40%;
}

.left > h4 {
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
}

.left h4:nth-child(2) {
  font-weight: 400;
  font-size: 1.3rem;
}

.left p {
  letter-spacing: 1px;
}

.right {
  padding-bottom: 0;
  width: 60%;
}

.right form {
  background: #fff;
  padding: 5% 10%;
}

.right form > label.email-label {  
  border: 1px solid var(--black);
  border-bottom-width: 0;
  padding: 2px 6px;
  font-size: .9rem;
  width: 45%
}

.right form > input.email {
  width: 100%;
  outline: none;
  padding: 10px;
  box-sizing: border-box;
  font-size: 16px;  
  margin: 0;
  background: #fff;
}

.right form input.email {
  border: 1px solid var(--black);
}

.right form input.email:focus {  
  box-shadow: inset 0 0 0 1px var(--black);
}

.is-focused {
  background: var(--black);
  color: #fff;
}

.right form label.invalid-input {
  background: var(--red);
  color: #fff;
  border-color: var(--red);
}

.right form input.email.is-empty {
  box-shadow: inset 0 0 0 1px var(--red);
  border-color: var(--red);
}

.error-msg {
  color: var(--red);
  font-size: .75rem;
  visibility: hidden;
}

.visible {
  visibility: visible;
}

.preferences {
  display: flex;
  padding: 15px 0;
  align-items: center;
}

.preferences > div {
  width: 50%;
  margin-bottom: 15px;
}

.preferences > div:nth-child(2) {
  margin-top: 15px;
}

.preferences .paragraphs > p {
  padding: 0;
  margin: 5px 0;
}

form > input.submit-btn {  
  margin-bottom: 20px;
}

@media screen and (max-width:850px) {
  .newsletter-container {
    flex-direction: column;
  }

  .newsletter-container > div {
    width: auto;
  }

  .right form {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

}

@media screen and (max-width:420px) {
  .left > h4 {
    font-size: 1.2rem;
  }

  .left h4:nth-child(2) {    
    font-size: 1rem;
  }
  
}

@media screen and (max-width:390px) {
  
  .preferences {
    flex-direction: column;
  }

  .preferences div {
    width: 100%;
  }

  .right form > label.email-label {
    width: auto;
  }
}



</style>