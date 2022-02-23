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
          <p v-if="isMobile">Prezzo: {{total | numFormat}} &euro; </p>
        </div>
        <QtyDropdownComponent :text="true" :qty="cartItem.quantity" @updateQty="updateQty"/>
      </div>
      <div class="detail-bottom">
        <div class="buttons">
          <button class="del-btn">
            <svg v-if="isMobile"  @click="removeCartItem" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#666666"><path d="M71.66667,14.33333l-7.16667,7.16667h-35.83333v14.33333h114.66667v-14.33333h-35.83333l-7.16667,-7.16667zM35.83333,50.16667v93.16667c0,7.88333 6.45,14.33333 14.33333,14.33333h71.66667c7.88333,0 14.33333,-6.45 14.33333,-14.33333v-93.16667zM57.33333,64.5h14.33333v78.83333h-14.33333zM100.33333,64.5h14.33333v78.83333h-14.33333z"></path></g></g></svg>
            <span v-else @click="removeCartItem">Elimina</span>
          </button>
          <button :class="{'icons-container': isMobile}">
            <svg v-if="isMobile" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#666666"><path d="M118.25,21.5c-20.7475,0 -32.25,14.97833 -32.25,14.97833c0,0 -11.5025,-14.97833 -32.25,-14.97833c-21.77233,0 -39.41667,17.64433 -39.41667,39.41667c0,29.89217 35.20267,58.85983 45.01383,68.01167c11.30183,10.535 26.65283,24.08 26.65283,24.08c0,0 15.351,-13.545 26.65283,-24.08c9.81117,-9.15183 45.01383,-38.1195 45.01383,-68.01167c0,-21.77233 -17.64433,-39.41667 -39.41667,-39.41667zM106.1455,115.455c-1.2685,1.14667 -2.37217,2.14283 -3.268,2.98133c-5.38217,5.01667 -11.74617,10.7715 -16.8775,15.3725c-5.13133,-4.601 -11.5025,-10.363 -16.8775,-15.3725c-0.903,-0.8385 -2.00667,-1.84183 -3.268,-2.98133c-10.17667,-9.19483 -37.18783,-33.61883 -37.18783,-54.53833c0,-13.83167 11.25167,-25.08333 25.08333,-25.08333c13.0935,0 20.683,9.1375 20.88367,9.374l11.36633,12.126l11.36633,-12.126c0.07167,-0.09317 7.79017,-9.374 20.88367,-9.374c13.83167,0 25.08333,11.25167 25.08333,25.08333c0,20.9195 -27.01117,45.3435 -37.18783,54.53833z"></path></g></g></svg>

            <span v-else>Aggiungi ai preferiti</span>
          </button>
        </div>
        <div class="product-price" v-if="!isMobile">
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
    },
    isMobile() {
      return window.innerWidth<400;
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

.icons-container {
  border-bottom: 2px solid gray;
  margin: 0 auto;
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