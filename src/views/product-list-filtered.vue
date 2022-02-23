<template>
  <div class="container products">
    <CategoryNavComponent :category="this.category" 
                          :gender="this.gender" 
                          :subCat="this.subCat"
                          @updateSubCat="updateSubCat"
                          @manualRedirect="updateSubCat" />
    <div class="products-subcategory-container">
      <div class="sub-category-container">
        <span><a class="link underline">{{this.category | capitalize}}</a></span>
        <ul class="sub-category-list">
          <li v-for="subCat in getSubCategories" v-bind:key="getSubCategories.indexOf(subCat)">
            <span>
              <a @click="updateSubCat(subCat)" class="link underline">{{subCat | capitalize}}</a>
            </span>
          </li>
        </ul>
      </div>
      <div class="products-container">
        <ProductsFiltersComponent :gender="gender" @sendActivedFilters="updateAdditionalFilters"/>
        <ProductsListComponent  :category="category" 
                                :gender="gender" 
                                :subcategories="subCategories" 
                                :additionalFilters="additionalFilters"                              
                                />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductsListComponent from '../components/products-list-component.vue';
import { clothing, shoes, accessories, sport } from '../shared/sizes.js'
import CategoryNavComponent from '../components/category-nav-component.vue';
import ProductsFiltersComponent from '../components/products-filters-component.vue';
export default {
  name: 'ProductsListFiltered',
  components: { ProductsListComponent,CategoryNavComponent, ProductsFiltersComponent },
  data() {
    return {
      subCat: "",
      additionalFilters: []
    }
  },
  props: {
    category: {
      type: String,
      required: true
    }
  },  
  computed: {
    ...mapState(['gender']),
    getSubCategories: function() {
      let cat = this.category;
      if(cat) {
        switch(cat) {
          case 'abbigliamento': {
              return clothing;
          }
          case 'accessori': {
              return accessories;
          }
          case 'scarpe': {
              return shoes;
          }
          case 'sport': {
              return sport;
          }
        }
      }   
      return undefined;
    },
    subCategories() {
      if(this.subCat) {
        return [this.subCat];
      } 
      return this.getSubCategories;
    }
  },  
  methods: {
     updateSubCat(subCat) {
      this.subCat = subCat;      
    },
    updateAdditionalFilters(value) {
      this.additionalFilters = value;
    }
  }
}

</script>
<style scoped>

.products-subcategory-container {
  display: flex;
}

.sub-category-container {
  flex-basis: 10%;
}

.sub-category-container ul.sub-category-list {
  padding: 0;
  margin: 10px;
} 

.sub-category-container ul.sub-category-list > li {
  font-size: .875rem;
  margin: 10px;
  color: #000;
  font-weight: 600;
}

.products-container {  
  margin-left: 5%;
}

@media screen and (max-width:1060px){  
  .products-subcategory-container {
    display: block;
  }
  .sub-category-container {
    /* flex-basis: 30%; */
    display: none;
  }

  .products-container {  
    margin: 0;
  }
}

@media screen and (max-width:730px){  
  .container {
    padding: 30px 15px;
  }
}

</style>
