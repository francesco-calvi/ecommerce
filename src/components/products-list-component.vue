<template>
<div class="products-component" :class="{'less-than-3': filteredProducts && filteredProducts[index].length<3}">    
  <div class="products-list">
    <ProductComponent v-for="product in filteredProducts[index]" v-bind:key="product.id" :id="product.id" @click="goToDetail(product.id)" />
  </div>
  <ProductsListNav v-if="filteredProducts.length>1" v-on:updateIndex="onChildClick" :pages="filteredProducts.length" :index="this.index"/>
</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import ProductsListNav from './products-nav.vue';
import ProductComponent from './product-component.vue';

export default {
  name: 'ProductsListComponent',   
  components: {ProductsListNav, ProductComponent}, 
  props: {
      category: String,
      subcategories: {
        type: [],
        required: false
      },
      subcategory: {
        type: [],
        required: false
      },
      additionalFilters: []
  },
  data() {
    return {        
        sizeFilters: [],
        filteredProducts: []
    }
  },
  computed: {
    ...mapState(['searchValue', 'gender', 'index']),
    ...mapGetters(['filteredByGender']),        
  },
  async beforeMount() {
    const store = this.$store;
    if(store.state.products.length == 0) {     
      await store.dispatch('getProductsAction');
    }
    this.filteredProducts = this.filterProducts();    
  },
  created() {
    if(this.searchValue) {
      this.filterBySearchInput();
    }
  },
  watch: {
    gender: {
      immediate: true, 
      handler (val, oldVal) {
        if(val!=oldVal) {
          this.filteredProducts = this.filterProducts(this.filteredByGender);
        }
      }
    },
    searchValue: {
      immediate: true, 
      handler(val, oldVal) {
          if(val!=oldVal){
            this.filteredProducts = this.filterBySearchInput();
          }
      }
    },
    category: {
      immediate: false,
      handler(val, oldVal) {
        if(val!=oldVal) {        
          this.filteredProducts = this.filterProducts();
        }
      }
    },
    subcategories: {
      immediate: true,
      handler() {        
        this.filteredProducts = this.filterProducts();
      }
    },
    additionalFilters: {
      handler(val) {
        console.log(val)
        
        this.sizeFilters = [];
        let others = [];
        for(let i=0;i<val.length;i++) {          
          if(val[i].type == 'size') {
            this.sizeFilters.push(val[i]);
          } else {
              others.push(val[i]);
          }         
        } 
        if(this.sizeFilters.length===0) {
          this.filteredProducts = this.filterProducts();          
        } else {

        this.sizeFilters.forEach(el => this.filterByAdditionalFilter(el));
        }
        others.forEach(el => this.filterByAdditionalFilter(el));
      }     
    }
  },   
  methods: {
    filterProducts(list) {
      if(!list) {
        list = this.filteredByGender;
      }
      this.filteredProducts = [];
      let filteredByCat = this.filterByCategory(list);
      return this.mapFilteredProducts(filteredByCat);
    },
    mapFilteredProducts(array) {
      let filteredProducts = [];
      let max = 12;
      if(array.length>max) {
        let surpluses = array.splice(max, array.length-max);
        filteredProducts.push(array);
        if(surpluses) {
            this.mapFilteredProducts(surpluses);
        }
      } else {
        filteredProducts.push(array);
      }
      return filteredProducts;
    },
    filterBySearchInput() {
      let filtered = this.filteredByGender.filter(p => {
        if( p.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
            p.category.toLowerCase().includes(this.searchValue.toLowerCase())){
          return p;
        } 
      }
      );
      return this.filterProducts(filtered);
    },
    onChildClick(value) {
        this.updateIndex(value-1);
    },        
    filterByCategory(list) {       
      return list.filter(p => {
                    return this.subcategories.find(cat => {
                        return p.category.includes(cat)
                    });
      });
    },
    goToDetail(id) {
      localStorage.setItem("pageYOffset", window.pageYOffset);
      this.$router.push({name: 'product-detail', params: {id: id}})
    },
    filterByAdditionalFilter(filter) { 
      switch(filter.type) {
        case 'price': {
          this.orderByPrice(filter);
          break;
        }
        case 'size': {
          this.filterBySize();   
          break;
        }
        default: {
          this.filteredProducts = this.filterProducts();
        }
      }
    },
    orderByPrice(filter) {      
      let temp = [];
      this.filteredProducts.forEach(array => temp = [...temp, ...array]);
      switch(filter.value.toLowerCase()) {
        case 'prezzo crescente': {
          temp = temp.sort((a, b) => {
            return a.price - b.price;
          });
          break;
        }
         case 'prezzo decrescente': {
          temp = temp.sort((a, b) => {
            return b.price - a.price;
          });
          break;
        }
      }
      this.filteredProducts = this.filterProducts(temp);
    },
    filterBySize() {
      let products = [];
      let res = [];  
      this.filteredProducts = this.filterProducts();  
      this.filteredProducts.forEach(array => products = [...products, ...array]);      
      for(let i=0;i<this.sizeFilters.length;i++) {
        let filtered = products.filter(p => {
          return p.sizes.find(size => size.value == this.sizeFilters[i].value)
        });
        res = [...res, ...filtered];
      }
      this.filteredProducts = this.filterProducts(res);
    }
  } 
}
</script>

<style scoped> 
.products-component {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.less-than-3 {
  justify-content: flex-start;
}

.products-list {  
  display: flex;
  width: var(--product-grid-width);
  gap: 2rem 0;
  min-height: 60vh;
  flex-wrap: wrap;
  max-width: fit-content;
  min-width: var(--product-grid-width);
}

.product:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}

@media screen and (max-width: 700px) {
  .products-list {
     width: fit-content; 
  }
  
}


</style>