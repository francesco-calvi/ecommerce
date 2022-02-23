<template>
  <div id="app">
    <HeaderBar />
    <router-view id="view" />
    <BackToTopButtonComponent />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderBar from "./components/header-bar.vue";
import BackToTopButtonComponent from './components/back-to-top-button.vue';
import FooterComponent from './components/footer-component.vue';

export default {
  name: 'App',
  components: {HeaderBar, BackToTopButtonComponent, FooterComponent },
  beforeCreate() {
    const store = this.$store;
    store.replaceState({
      products: [],
      loggedUser: undefined,
      searchValue: undefined,
      gender: undefined,
      index: 0,
      cart: [],
      isLoginForm: false
    });
  },
  watch: {
    $route(from, to) {
      if(from.path!=to.path) {
        window.scrollTo({top: 0});
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--black);
}

:root {
  --hover-background: #efeff0;
  --primary-color: #2c3e50;
  --black: #1a1a1a;
  --red: #eb0037;
  --product-width: calc(22vw);
  --product-grid-width: calc(var(--product-width) * 3 + 60px); 
  --shadow:0 0 5px rgba(0, 0, 0, 0.515);
}

* {
  -webkit-tap-highlight-color: transparent;
}

body {
  margin:0;
}

a {
  text-decoration: none;
  color: inherit;
}
  
a:visited {
  color:inherit;
}

.link {
  cursor: pointer;
}

.underline:hover {
  border-bottom: 2px solid;
  border-color: inherit;
}

ul {
  list-style: none;
}

.container {
  padding: 0 50px;
}

.container.products{
  padding-top: 30px;
  padding-bottom: 100px;
  border-top: 1px solid lightgray;
  box-shadow: 0 3px 5px #000; 
}

.hover-focus-border:hover {
  box-shadow: inset 0 0 0 1px var(--black);
}

.hover-focus-border:focus {
 box-shadow: inset 0 0 0 1px var(--black);
}

/** buttons & inputs */
.btn {
  background: var(--black);
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: 600;  
  letter-spacing: 1px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 16px;  
}

.btn:hover {
  background: var(--hover-background);
  transition: background-color .2s ease-in;
  color: var(--primary-color);
}

input.toggler, button.toggler {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;    
    border: 1px #000 solid;   
    background: #fff;
    color: gray;
    background: #fff;
    height: 50px;}

input.toggler:focus, button.toggler:focus {
    background:#f1f1f1;
}

/** product */
.discounted {
  text-decoration: line-through;
  color: rgb(146, 146, 146);
  display: inline;
}

/** dropdown */
.dropdown-wrapper {
  position: relative;
}

.dropdown-toggler {
  width: 100%;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  border: 1px #000 solid;
  background: #fff;
  cursor: pointer;
}

.dropdown { 
  display: none;
  overflow: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
  -ms-scroll-snap-type: y mandatory;
  scroll-snap-type: y mandatory;
  scrollbar-width: thin;
  position: absolute;
  background: #fff;
  text-align: start;
  margin-bottom: 5px;
  border: 1px #ccc solid;  
  z-index: 1;
}



@media screen and (max-width: 850px) {
  .container {
    padding: 0 20px;
  }

}



</style>
