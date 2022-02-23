<template>
  <div class="container">
    <div class="info-box">
      <h2>Le migliori offerte</h2>
      <p>Scegli tra i prodotti in sconto</p>
    </div>
    <CarouselComponent :list="this.discountedProducts" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import CarouselComponent from './carousel-component.vue';
export default {
  name: 'ProductsListSaleComponent',  
  components: {CarouselComponent},
  watch: {
    gender: {
      immediate: true,
      handler(val, oldVal) {
        if(val != oldVal) {
          this.filterByDiscounted();
        }
      }
    }
  },
  computed: {
    ...mapState(['products', 'gender']),
    ...mapGetters(['filteredByGender']),
    discountedProducts: function() {
      return this.filterByDiscounted();
    }  
  },
  methods: {
    slide(direction) {
      let carousel = this.$refs.carousel;
      switch(direction) {
        case 'left': {
          carousel.scrollLeft -= 260;
          break;
        }
        case 'right': {
          carousel.scrollLeft += 260;
          break;
        }
      }
    },
    filterByDiscounted() {
      return this.filteredByGender.filter(p => p.discounted);
    }
  }
}
</script>

<style scoped>
.container {
  background-color: rgba(38, 131, 130, 0.5);
  color: white;
  padding-top: 50px;
  padding-bottom: 50px;
}

.info-box h2 {
  margin: 0;
}

.info-box p {
  margin-top: 5px;
}

.products-list {
  height: 80%;
  position: relative;
}

.products-carousel {
  display: flex;
  padding: 0;
  overflow-x: scroll;
  scroll-padding-left: 24px;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.products-carousel::-webkit-scrollbar {
  display: none;
}



.btn {
  width: 40px;
  position: absolute;
  top: 50%;
  cursor: pointer;
  padding: 8px;
  background: #f1f1f1;
  border: none;
  opacity: 0.85;
}

.btn:hover {
  opacity: 1;
}

.left-btn {
  left: 0;
}

.right-btn {
  right: 0;
}


</style>