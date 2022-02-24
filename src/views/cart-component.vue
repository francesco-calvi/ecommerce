<template>
  <div class="container products"> 
    <div class="background">
      <div class="order-details">
        <div class="cart">
          <h4>Carrello ({{cart.length}} articoli) </h4>
          <CartItemComponent v-for="cartItem in cart" :key="cartItem.product.id" :cartItem="cartItem" 
          @removeCartItem="showModal" />           
        </div>
        <div class="shipment-info">
          <h4>Consegna prevista tra</h4>
          <p><span>{{shippingTime[0]}}</span> - <span>{{shippingTime[1]}}</span></p>
        </div>
        <div class="payment-choises">
          <h4>Metodi di pagamento</h4>
          <PaymentChoisesComponent class="payment-choises"/>
        </div>
      </div>
      <div class="total">
        <h4>Totale</h4>
        <p class="total-info"><span>Subtotale</span><span>{{subtotal | numFormat}} &euro;</span></p>
        <p class="total-info"><span>Spedizione</span><span>{{shipment}} &euro;</span></p>
        <h5 class="total-info"><span>Totale (iva inclusa)</span><span>{{total | numFormat}} &euro;</span></h5>
        <button class="btn">Procedi con l'ordine</button>
      </div>
    </div>
    <Modal v-show="isModalVisible" @close="closeModal" :danger="true">
        <template v-slot:header>
          <img src="https://img.icons8.com/office/80/000000/high-risk.png"/>
        </template>
        <template v-slot:body>Stai per rimuovere il prodotto! Confermi?</template>
        <template v-slot:footer>
          <div class="modal-btn-container">
            <button
                type="button"
                class="modal-btn go-back"
                @click="closeModal"
                aria-label="Close modal">
                INDIETRO
            </button>
            <button
                type="button"
                class="modal-btn"
                @click="removeCartItem"
                aria-label="Close modal">
                OK
            </button>
          </div>
        </template>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PaymentChoisesComponent from '../components/payment-choices-component.vue';
import CartItemComponent from '../components/cart-item-component.vue';
import checkDiscountMixin from '../mixins/checkDiscount.js';
import Modal from '../components/modal.vue';

export default {
  name: 'CartComponent',
  components: {PaymentChoisesComponent, CartItemComponent, Modal},
  mixins: [checkDiscountMixin],
  data() {
    return {
      shipment: "2.99",
      isModalVisible: false,
      itemToRemove: {}
    }
  },
  computed: {
    ...mapState(['cart']),    
    subtotal() {
      let sum = 0;
      this.cart.forEach(e => {
        sum+=this.checkDiscount(e.product) * e.quantity;
      });
      return sum;
    },
    total() {
      return this.subtotal+parseFloat(this.shipment);
    },
    shippingTime() {
      let daysIT = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
      let first = new Date(new Date().getTime() + 3*24*60*60*1000); 
      let last = new Date(new Date().getTime() + 5*24*60*60*1000);
      let shippingTime = [first, last];
      for(let i = 0; i < shippingTime.length; i++) {
        let dayOfWeekIT = daysIT[shippingTime[i].getDay()];
        let stringDate = shippingTime[i].toDateString();
        let italianDate = stringDate.replace(stringDate.substring(0, 3), dayOfWeekIT);    
        shippingTime[i] = italianDate.substring(0, 10); 
      }
      return shippingTime;
    },     
  },
  methods: {
    ...mapActions(['removeFromCart']),
    showModal(cartItem) {    
      if(cartItem) {
        this.itemToRemove = cartItem;
      }
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    removeCartItem() {
      if(this.itemToRemove) {
        this.closeModal();
        this.removeFromCart(this.itemToRemove);
      }
    }
  }
}
</script>

<style scoped>
.background {
  background-color: #e6e6e6;
  display: flex;
  padding: 15px;
}

.order-details > div, .total {
  background: #fff;
  padding: 20px;
  margin: 15px;
}

.order-details {
  width: 70%;
}

.total {
  width: 30%;
  height: fit-content;
  position: sticky;
  top: 0;
}

.total-info {  
  display: flex;
  justify-content: space-between;
}

p.total-info {
  font-size: 0.9em;
}

h5.total-info {
  font-size: 1.01em;
  border-top: 1px solid #d6d6d6;
  padding: 20px 0;
  margin: 0;
}

.background h4 {
  padding: 0;
  margin: 0 0 20px 0;
  font-size: 22px;
}

.payment-choises {
  padding: 0
}

@media screen and (max-width:810px) {
  .background {
    display: block;
  }

  .background > div {
    width: auto;
  }
}

</style>
<style>
.modal-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-btn.go-back {
  color: gray;
}
</style>