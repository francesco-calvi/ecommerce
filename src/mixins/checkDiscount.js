export default  {
  methods: {
    checkDiscount(product) {
      let price = product.price;
      if(product.discounted) {
        return product.price - (product.discounted.percentage * price / 100);
      }
      return price;
    }
  }
};