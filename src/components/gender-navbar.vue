<template>
  <nav class="nav-section gender-nav">
    <ul class="nav-ul" :class="{'justify-center': isMobile}">
      <li class="list-item" @click="updateGender('donna')">
        <router-link v-bind:class="{ active: isWomanActive }" 
                     :to="{path:'/donna/',params:{gender:'donna'}}" class="gender-selector"
                     >
          <span>Donna</span>
        </router-link>
      </li>
      <li class="list-item" @click="updateGender('uomo')">
        <router-link v-bind:class="{ active: isManActive }" 
                     :to="{path:'/uomo/',params:{gender:'uomo'}}" class="gender-selector"           
                     >
          <span>Uomo</span>
        </router-link>
      </li>     
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: "GenderNavbar", 
    data() {
      return {
        isManActive: false,
        isWomanActive: true
      }
    },
    props: {
      isMobile: {
        type: Boolean,
        default: false
      }
    },
    beforeCreate() {
      const store = this.$store;
      if(!store.state.gender) {
        store.state.gender = 'donna';
      }
    },
    computed: {     
      ...mapState(['gender'])     
    },
    watch: {
      gender: {
        handler(val, oldVal) {
          if(val != oldVal) {
            this.updateGender(val);
          }
        }
      }
    },
    methods: {
      ...mapActions(['updateGenderValue']),
      updateGender(value) {
        this.updateGenderValue(value);
        this.toggleActivity();
      },
      toggleActivity() {        
        if(this.gender === 'uomo') {
          this.isManActive = true;
          this.isWomanActive = false;
        } else if(this.gender === 'donna') {
          this.isWomanActive = true;
          this.isManActive = false;
        } else {
          this.isManActive = false;
          this.isWomanActive = false;
        }
      }
    },
};
</script>

<style scoped>
.nav-ul {
    display: flex;
    justify-content: start;
    list-style: none;
    margin: 0;
    padding: 0;
}

.justify-center {
  justify-content: center;
}

.list-item a{
    padding: 10px;
    font-weight: bold;
}

.list-item > a:hover {
    background: var(--hover-background);
}

.list-item > a.router-link-exact-active  {
    background: var(--black);
}

.list-item > a.router-link-exact-active:hover {
    background: var(--black);
    color: #fff;
}

.list-item > a.active {
    background: var(--black);
    color: #fff;
}

.list-item > a.active:hover {
    background: var(--black);
    color: #fff;
}

</style>