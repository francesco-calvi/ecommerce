<template>
  <div id="nav" v-if="!isLoginForm"> 
      <div class="nav-section sandwich-container">
        <div class="sandwich-menu">
          <svg   
            @toggleNavbar="toggleNavbar"  
            ref="sandwichIcon"       
            height="2em"
            width="1.5em"
            focusable="false"
            viewBox="0 0 24 24"
            aria-labelledby="menù-18000801"
            role="img"
            aria-hidden="false">
            <title id="menù-18000801">Menù</title>
            <path
              d="M.75 2.25h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5zM23.25 21.75H.75a.75.75 0 0 0 0 1.5h22.5a.75.75 0 0 0 0-1.5zM.75 12.75h12a.75.75 0 0 0 0-1.5h-12a.75.75 0 0 0 0 1.5z"
            ></path>
          </svg>
          <NavbarItemsComponent  ref="sandwichNav" 
                                :gender="this.gender" 
                                :isMobile="true"
                                @toggleNavbar="toggleNavbar"/>
        </div>
      </div>
      <div class="nav-section inline-nav">
        <NavbarItemsComponent :gender="this.gender"/>
      </div>
      <div class="searchContainer nav-section">
        <form class="searchForm" role="search" @submit="search">
          <span class="search-icon">
            <svg
              height="1em"
              width="1em"
              focusable="false"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-labelledby="searchIcon"
              role="img"
              aria-hidden="false">
              <path d="m23.03 21.97-7.164-7.164A8.969 8.969 0 0 0 18 9a9 9 0 1 0-9 9 8.969 8.969 0 0 0 5.806-2.134l7.164 7.164a.748.748 0 0 0 1.06 0 .75.75 0 0 0 0-1.06zM1.5 9A7.5 7.5 0 0 1 9 1.5 7.509 7.509 0 0 1 16.5 9a7.5 7.5 0 1 1-15 0z"></path>
            </svg>
          </span>
          <div class="searchInputContainer">
            <input
              type="text"
              class="searchInput"
              value=""
              placeholder="Ricerca"
              name="searchInput"
              ref="searchInput"
              autocomplete="off"
              v-model="searchInput" />
          </div>
        </form>
      </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import NavbarItemsComponent from './navbar-items.vue';
import { clothing, shoes, accessories, sport } from '../shared/sizes.js'
export default {
  name: "NavBar",
  components: {NavbarItemsComponent},
  data() {
    return {
      searchInput: "",      
    }
  },
  computed: {
    ...mapState(['gender', 'isLoginForm', 'products']),
    clothing() {
      return [...clothing];
    },
    shoes() {
      return [...shoes];
    },
    accessories() {
      return [...accessories];
    },
    sport() {
      return [...sport];
    }
    
  },
  watch: {
    searchInput: {
      immediate: true,
      handler(val, oldVal) {
        if(val!=oldVal) {          
          this.updateSearchValueState();
        }
      }
    }
  },
  methods: {
    ...mapActions(['updateSearchValue']),
    updateSearchValueState() {
      if(this.searchInput.trim()==" ") return;
      if(this.searchInput != "") {
        this.updateSearchValue(this.searchInput);
      }
    },
    search(e) {
      e.preventDefault();
      let category;  
      let filtered = this.products.find(p => {
        if(p.category.toLowerCase().includes(this.searchInput.toLowerCase()) ||
           p.name.toLowerCase().includes(this.searchInput.toLowerCase())) {
          return p;
        }
      });
      if(!filtered) return;
        
      let clothing = this.clothing.filter(cat => filtered.category.includes(cat));
      let shoes = this.shoes.filter(cat => filtered.category.includes(cat));
      let accessories = this.accessories.filter(cat => filtered.category.includes(cat));
      let sport = this.sport.filter(cat => filtered.category.includes(cat));
      if(clothing.length) {
        category = 'abbigliamento';
      }
      if(shoes.length) {
        category = 'scarpe';
      }
      if(accessories.length) {
        category = 'accessori';
      }
      if(sport.length) {
        category = 'sport';
      }
        
      this.$router.push({name: 'product-list-filtered', params: {gender: this.gender, category: category}})
                  .catch(err => { 
                    if (err.name != "NavigationDuplicated") {
                      console.error(err);
                    }
                  });
      this.$refs.searchInput.value = "";      
    },
    toggleNavbar(value) {      
      let nav = this.$refs.sandwichNav.$el;      
      let navStyle = nav.style;
      if(value!=this.$refs.sandwichIcon) {
        navStyle.display = 'none';
      } else {
        navStyle.display = navStyle.display == "block" ? "none" : "block";
      }
    }
  }
};
</script>

<style scoped>
#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--black);
}

#nav > div.nav-section {
  flex-basis: 33.333%;
}

#nav a.router-link-exact-active {
  border-bottom: 2px solid #000;
}

.searchForm {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.searchForm .search-icon {
  margin: 0;      
  background: #efeff0;
  color: var(--black);
  height: 35px;
  display: flex;
  align-items: center;
}

.searchForm span svg {
  margin: 10px;
}

.searchInputContainer {
  width: 60%;
}

.searchInputContainer input{
  height: 35px;
  width: 100%;
  font-size: 16px;
  color: var(--black);
  border: none;
  outline: none;  
  background: #efeff0;
  box-sizing: border-box;
}

.sandwich-menu {
  display: none;
  width: 1.5em;
}

.sandwich-menu > svg {
  fill: gray;
}

/** MEDIA QUERIES */
@media screen and (max-width:900px) {
  .sandwich-menu {
    display: block;    
  }

  .sandwich-menu:hover {
    cursor: pointer;    
  }

  .inline-nav {
    display: none;
  }

  #nav > div.nav-section {
    flex-basis: unset;
    height: 2em;
    border: 1px solid #d0d1d3;
  }

  .sandwich-container {
    width: 1.5em;
    padding: 10px;
    position: relative;
  }  

  .searchContainer.nav-section {
    width: 100%;
    padding: 10px;
  }

  .searchForm {
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  .searchForm > .search-icon {
    background: #fff;
  }

  .searchInputContainer .searchInput {
    background: #fff;
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration { 
    display: none; 
  }

}

</style>