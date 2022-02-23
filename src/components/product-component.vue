<template>
  <router-link :to="{name: 'product-detail', params: {id: this.id}}" class="product" :class="{'carousel-product': isCarousel}" :product="product">
      <div class="product-img-container">
        <img :src="product.images[0].url" alt="image">
        <FavoritesBtnComponent />
        <span v-if="product.discounted" class="discount-percentage">-{{product.discounted.percentage}}%</span>
      </div>
      <div class='info'>
          <span class="product-name">{{product.name}}</span>
          <span class="price-discount" v-if="product.discounted">{{this.getDiscountValue | numFormat}} &euro;</span>          
          <span class="product-price" :class="{discounted : product.discounted}">{{product.price}} &euro;</span>
          <span v-if="product.quantity==0" class="unavailable">Attualmente non disponibile</span>
      </div>           
  </router-link> 
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import FavoritesBtnComponent from './favorites-btn-component.vue';
import checkDiscountMixin from '../mixins/checkDiscount.js';

export default {
  name: 'ProductComponent',
  components: {FavoritesBtnComponent},
  mixins: [checkDiscountMixin],
  props: {
    id: {
      type: Number,
      required: true
    },
    isCarousel: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.product = this.getProductById(this.id);
  },
  computed: {
    ...mapState(['products']),
    ...mapGetters(['getProductById']),
    getDiscountValue() {
      return this.checkDiscount(this.product);
    }
  }

}
</script>

<style>
.product { 
  width: var(--product-width); 
  background: #fff;
  margin: 0 10px;
  cursor: pointer;
  box-sizing: border-box;
  flex-shrink: 0;
}

.product-img-container {
  position: relative;
}

.product-img-container > img {
  width: 100%;
  height: 50vh;
}

.product-img-container > span {
  position: absolute;
}

.product-img-container span.discount-percentage {
  bottom: 30px;
  left: 0;
  background: var(--red);
  color: #fff;
  padding: 3px 10px;
}

.info {
  padding: 10px;
}

.info > span {
  text-align: start; 
  display: block;
}

.info span.product-name {
  margin-bottom: 5px;
  font-family: cursive;  
  color: var(--black); 
  overflow: hidden;
}

.info span.price-discount {
  color: var(--red);
  font-weight: 600;
  display: inline;
  margin-right: 10px;
}

.unavailable {
  color: var(--red);
}

.carousel-product  {
  width: var(--product-width) !important;
}

@media screen and (max-width:645px) and (min-width: 501px) {  
  .product {
    white-space: nowrap;
    overflow: hidden;
  }
}

@media screen and (max-width:768px) {
  .carousel-product {    
    min-width: 190px;
    margin: 0 10px !important;
  }

  .product {
    flex-basis: 45%;
    margin: 0 2.5%;
  }
}

@media screen and (max-width:470px) {  
  .product {    
    width: 100%;
    margin: 0 auto;
    flex-basis: 80%;
  }
}




</style>