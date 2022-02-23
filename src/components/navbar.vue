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
        <form class="searchForm" role="search">
          <span class="search-icon">
            <svg
              height="1em"
              width="1em"
              focusable="false"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-labelledby="searchIcon"
              role="img"
              aria-hidden="false"
            >
              <path
                d="m23.03 21.97-7.164-7.164A8.969 8.969 0 0 0 18 9a9 9 0 1 0-9 9 8.969 8.969 0 0 0 5.806-2.134l7.164 7.164a.748.748 0 0 0 1.06 0 .75.75 0 0 0 0-1.06zM1.5 9A7.5 7.5 0 0 1 9 1.5 7.509 7.509 0 0 1 16.5 9a7.5 7.5 0 1 1-15 0z"
              ></path>
            </svg>
          </span>
          <div class="searchInputContainer">
            <input
              type="search"
              class="searchInput"
              value=""
              placeholder="Ricerca"
              name="searchInput"
              autocomplete="off"
              v-model="searchInput"
            />
          </div>
        </form>
      </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import NavbarItemsComponent from './navbar-items.vue';
export default {
  name: "NavBar",
  components: {NavbarItemsComponent},
  data() {
    return {
      searchInput: ""
    }
  },
  computed: {
    ...mapState(['gender', 'isLoginForm'])
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
    updateSearchValueState: function() {
      this.updateSearchValue(this.searchInput);
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
  color: #000;
  height: 30px;
}

.searchForm span svg {
  margin: 7px 5px 2px;
}

.searchInputContainer input{
  height: 30px;  
  width: 100%;
  font-size: 16px;
  border: none;
  outline: none;  
  background: #efeff0;
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

}

</style>