<template>
  <nav :class="{'sandwich-nav': isMobile}" v-click-outside="toggleNavbar" @click="toggleNavbar">
    <ul :class="{'block-list': isMobile, 'flex-list': !isMobile}">
      <li class="categoryListElement">
        <GenderNavbar v-if="isMobile" :isMobile="isMobile"/>
      </li>
      <li data-name="Abbigliamento" class="categoryListElement">
        <span>
          <router-link :to="{
                          path: '/abbigliamento/',
                          name: 'product-list-filtered',
                          params: {category: 'abbigliamento', gender: this.gender}
                        }">
            <span class="link underline">Abbigliamento</span>
          </router-link>
        </span>
      </li>
      <li data-name="Scarpe" class="categoryListElement">
        <span>
          <router-link :to="{
                          path: '/scarpe/',
                          name: 'product-list-filtered',
                          params: {category: 'scarpe', gender: this.gender}
                        }">
            <span class="link underline">Scarpe</span>
          </router-link>
        </span>
      </li>
      <li data-name="Sports">
        <span>
          <router-link :to="{
                          path: '/sport/',
                          name: 'product-list-filtered',
                          params: {category: 'sport', gender: this.gender}
                        }">
            <span class="link underline">Sport</span>
          </router-link></span>
      </li>
      <li data-name="Accessori">
        <span>
          <router-link :to="{
                          path: '/accessori/',
                          name: 'product-list-filtered',
                          params: {category: 'accessori', gender: this.gender}
                        }">
            <span class="link underline">Accessori</span>
          </router-link>
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
import GenderNavbar from './gender-navbar.vue';
export default {
  name: 'NavbarItemsComponent', 
  components: {GenderNavbar}, 
  props: {
    gender: String,
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleNavbar(event) {
      this.$emit('toggleNavbar', event.target);
    }
  }
}
</script>

<style scoped>

.sandwich-nav {
  position: absolute;
  z-index: 1;
  background: white;
  display: none;
  padding: 0 20px;
  width: fit-content;
  box-shadow: var(--shadow);
  left: 0;
  right: 0;
  top: 3.3em;
  text-align: center;
}

.flex-list {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 10px; 
}

.flex-list > li {
  margin: 0 20px;  
}

.block-list {
  padding: 0;
  margin: 0;
}

.block-list > li {
  padding: 16px 10px; 
  font-size: 18px 
}

.block-list > li:not(:last-child) {
  border-bottom: 1px solid #c0c0c0;  
}
</style>