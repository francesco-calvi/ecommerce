<template>
    <header class="container">
        <div id="nav-controller">
            <GenderNavbar v-if="!isLoginForm"/>
            <div class="nav-section">
                <h2 class="logo-container" :class="{'align-start': isLoginForm || windowLessThen900()}" @click="updateGender">
                    <a href="/#/">Ecommerce</a>
                    <img src="../assets/logo.png" alt="">
                </h2>
            </div>
            <div class="nav-section header-icons">
                <div class="usermenu-container" data-name="login" @mouseenter="toggleMenu" @mouseleave="toggleMenu">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#666666"><path d="M86,21.5c-15.74728,0 -28.66667,12.91939 -28.66667,28.66667c0,15.74728 12.91939,28.66667 28.66667,28.66667c15.74727,0 28.66667,-12.91939 28.66667,-28.66667c0,-15.74728 -12.91939,-28.66667 -28.66667,-28.66667zM86,35.83333c8.00097,0 14.33333,6.33237 14.33333,14.33333c0,8.00097 -6.33237,14.33333 -14.33333,14.33333c-8.00097,0 -14.33333,-6.33237 -14.33333,-14.33333c0,-8.00097 6.33237,-14.33333 14.33333,-14.33333zM86,100.33333c-12.5055,0 -27.32533,2.93678 -39.7806,7.85254c-6.22764,2.45788 -11.85741,5.37749 -16.36296,9.12631c-4.50554,3.74881 -8.35645,8.81674 -8.35645,15.27116v17.91667h129v-7.16667v-10.75c0,-6.45441 -3.8509,-11.52234 -8.35645,-15.27116c-4.50554,-3.74882 -10.13531,-6.66843 -16.36295,-9.12631c-12.45527,-4.91576 -27.2751,-7.85254 -39.7806,-7.85254zM86,114.66667c10.134,0 23.98006,2.68033 34.53157,6.84473c5.27576,2.0822 9.73665,4.56436 12.44369,6.81673c2.70702,2.25238 3.1914,3.78662 3.1914,4.25521v3.58333h-100.33333v-3.58333c0,-0.46859 0.48437,-2.00283 3.19141,-4.25521c2.70703,-2.25238 7.16793,-4.73453 12.44368,-6.81673c10.55152,-4.1644 24.39757,-6.84473 34.53158,-6.84473z"></path></g></g></svg>
                    </div>
                    <div id="login" class="menu" ref="loginMenu">
                        <ul class="login-options">
                            <li class="login-item">
                                <router-link :to="{name:'login'}" class="login-link">
                                    <span>Login</span>
                                </router-link>
                            </li>
                            <li class="login-item">
                                <router-link :to="{name:'sign-up'}" class="login-link">
                                    <span>Sign Up</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>                                       
                </div>   
                <div class="cart-container">
                    <router-link :to="{name:'cart'}" class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#666666"><path d="M54.88379,14.33333c-5.70944,0 -10.91987,3.43398 -13.17155,8.67839l-17.77669,41.48828h-9.58822c-2.24317,0 -4.34927,1.04297 -5.71094,2.82747c-1.34733,1.77733 -1.80544,4.08567 -1.21777,6.24284l18.35059,66.40365c1.71283,6.192 7.3941,10.52604 13.81543,10.52604h92.83073c6.42133,0 12.09577,-4.32721 13.80144,-10.51205l18.35059,-66.40365c0.59483,-2.15717 0.14356,-4.4795 -1.20378,-6.25684c-1.36167,-1.7845 -3.47494,-2.82747 -5.71094,-2.82747h-9.58822l-17.79069,-41.47428h0.014c-2.24814,-5.26874 -7.47611,-8.69238 -13.18555,-8.69238zM54.88379,28.66667h62.21843l15.35514,35.83333h-92.91471zM23.75358,78.83333h124.49284l-15.84506,57.33333h-92.81673zM57.33333,93.16667c-3.956,0 -7.16667,3.21067 -7.16667,7.16667v14.33333c0,3.956 3.21067,7.16667 7.16667,7.16667c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.33333c0,-3.956 -3.21067,-7.16667 -7.16667,-7.16667zM86,93.16667c-3.956,0 -7.16667,3.21067 -7.16667,7.16667v14.33333c0,3.956 3.21067,7.16667 7.16667,7.16667c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.33333c0,-3.956 -3.21067,-7.16667 -7.16667,-7.16667zM114.66667,93.16667c-3.956,0 -7.16667,3.21067 -7.16667,7.16667v14.33333c0,3.956 3.21067,7.16667 7.16667,7.16667c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.33333c0,-3.956 -3.21067,-7.16667 -7.16667,-7.16667z"></path></g></g></svg>
                    </router-link>
                    <div class="cart-products-icon" v-if="cart.length>0">
                        <span class="cart-products">{{cart.length}}</span>
                    </div>
                </div>     
            </div>
        </div>       
        <NavBar />
    </header>
</template>

<script>
import NavBar from './navbar.vue';
import GenderNavbar from './gender-navbar.vue';
import { mapActions, mapState } from 'vuex';

export default {
    name: 'HeaderBar',
    components: { NavBar, GenderNavbar },
    computed: {
        ...mapState(['cart', 'isLoginForm'])
    },  
    methods: {
        ...mapActions(['updateGenderValue']),        
        updateGender() {
            this.updateGenderValue('donna');
        },
        windowLessThen900() {
            return window.innerWidth<900;
        },
        toggleMenu(el) {
            let target = el.target;
            switch(target.dataset.name) {
                case 'login': {
                    let ref = this.$refs.loginMenu;
                    ref.style.display = ref.style.display == 'block' ? 'none' : 'block';
                    break;
                }
            }
        }    
    },
    
}
</script>

<style scoped>
header {    
    box-sizing: border-box;
}

.usermenu-container {
    display: flex;
    justify-content: end;
    position: relative;
}

.header-icons {
    display: flex;
    align-items: center;
    justify-content: end;
}

.header-icons > div {
    cursor: pointer; 
    margin: 3px;   
}

.menu {
    display: none;
    box-shadow: var(--shadow);
    z-index: 1;
}

.menu > * {
    cursor: pointer;
    width: fit-content;    
}

#login {
    position: absolute;
    top: 24px;
    background: #fff;     
}

.login-options {
    padding: 0;
    margin: 0;
}

#login > .login-options > li.login-item > a {
    display: block;
    padding: 10px 15px;
    white-space: nowrap;
    width: 8vw;
}

li.login-item:hover {
    background: var(--hover-background);
}

#login > a:hover {
    background: var(--hover-background);
}

.cart-container {
    position: relative;
}

.cart-container .cart-products-icon {
    position: absolute;
    right: 0;
    top: 40%;
    border-radius: 100%;
    color: #fff;
    background: var(--red);
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40%;
    width: 50%;
    margin-right: -5px;
}

.cart-products-icon .cart-products {
    font-size: 11px;
    font-weight: 600;
}

#nav-controller {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-section {
    width: 33.333%;
}

.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo-container > img {
    width: 15%;
}

.align-start {
    justify-content: start;
    margin-left: 20px;
}


@media screen and (max-width: 900px) {
    header.container {
        padding: 0;
    }

    #nav-controller {
        padding: 0 20px;
    }
    
    .gender-nav {
        display: none;
    }

    .logo-container > img {
        width: 38px;
    }

    /* .logo-container {
        justify-content: start;
        margin-left: 20px;
    } */

}

</style>