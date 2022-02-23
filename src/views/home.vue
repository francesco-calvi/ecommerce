<template>
  <div>
      <BannerComponent />
      <ProductsListSaleComponent />
      <NewsletterComponent />
  </div>
</template>

<script>
import ProductsListSaleComponent from '../components/products-discounted-carousel-component.vue';
import NewsletterComponent from '../components/newsletter-component.vue';
import BannerComponent from '../components/banner-component.vue';
export default {  
  name: 'HomeComponent',
  components: { ProductsListSaleComponent, NewsletterComponent, BannerComponent },
  async beforeMount() {
    const store = this.$store;
    if(store.state.products.length == 0) {     
        await store.dispatch('getProductsAction');
    }
  }
}
</script>

