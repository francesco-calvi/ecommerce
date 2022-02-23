<template>
  <div class="cart-item">
    <div class="product-img">
      <img :src="cartItem.product.images[0].url" alt="">
    </div>
    <div class="product-detail">
      <div class="detail-top">
        <div class="product-info">
          <h3 style="font-weight: normal;">{{cartItem.product.name}}</h3>
          <p>Marca: </p>
          <p>Colore: </p>
          <p>Taglia: </p>
        </div>
        <QtyDropdownComponent :text="true" :qty="cartItem.quantity" @updateQty="updateQty"/>
      </div>
      <div class="detail-bottom">
        <div class="buttons">
          <button class="del-btn"><span @click="removeCartItem">Elimina</span></button>
          <button><span>Aggiungi ai preferiti</span></button>
        </div>
        <div class="product-price">
          {{total | numFormat}} &euro;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkDiscountMixin from '../mixins/checkDiscount.js';
import QtyDropdownComponent from '../components/dropdown-qty-component.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'CartItemComponent',  
  components: {QtyDropdownComponent},
  props: {
    cartItem: {
      type: Object,
      required: true
    }
  },
  mixins: [checkDiscountMixin],
  computed: {
    ...mapGetters(['getCartItem']),     
    total() {
      return this.checkDiscounted() * this.cartItem.quantity;
    }  
  },
  methods: {
    ...mapActions(['updateCartItemQty', 'removeFromCart']),    
    updateSelectedCartItem(cartItem) {
      console.log(cartItem);
      this.selectedCartItem = cartItem;
    },
    updateQty(value) {
      let cartItem = this.getCartItem(this.cartItem);      
      if(cartItem) {
        cartItem.quantity = value;
      }     
      this.updateCartItemQty(cartItem);
    }, 
    removeCartItem() {
      this.removeFromCart(this.cartItem);
    },
    checkDiscounted() {
      return this.checkDiscount(this.cartItem.product);      
    }
  }
}
</script>

<style scoped>
.cart-item {
  display: flex;
  margin-top: 30px;
}

.product-detail {
  margin-left: 10px;
  width: 80%;
  padding: 10px;
}

.product-img {
  width: 20%;
}

.product-img > img {
  width: 100%;
}

.product-info> p {
  padding: 0;
  margin: 0 0 3px 0;
  font-size: 0.8em;
}

.product-info > h3 {
  padding: 0;
  margin: 0 0 5px 0;
}

.product-detail > div {
  display: flex; 
  justify-content: space-between;  
}

.detail-bottom {
  margin-top: 10px;
  align-items: center;
}

.buttons > button {
  background: #fff;
  color: gray;
  border: none;
  padding: 0;
  cursor: pointer;
}

.del-btn::after {
  content: '|';
  margin: 5px;  
}

@media screen and (max-width:510px) {

  .product-detail > div.detail-top {
    flex-direction: column;
  }

  .product-detail > div.detail-bottom {
    flex-direction: column-reverse;
    align-items: start;
    position: relative;
    margin-top: 20px;
  }
 
  .product-info {
    margin-bottom: 10px;
  }

  .product-img {
    width: 50%;
  }

  .product-price {
    position: absolute;
    right: 0;
    top: -37px;
  }
}
</style>