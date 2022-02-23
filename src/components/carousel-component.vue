<template>
  <div class="carousel-container">
    <div class="carousel" v-if="listType=='products'" ref="carousel" id="carousel">          
      <ProductComponent :id="product.id" 
                        v-for="product in list" 
                        :key="product.id"
                        :isCarousel="true"/>        
    </div> 
    <div class="carousel" v-else-if="listType=='product images'" ref="carousel" id="carousel">
      <div class="img" v-for="img in list" 
                        :key="img.url">
        <img :src="img.url" alt="">
      </div>
    </div>
    <button class="btn left-btn" v-if="!isStartPos" @click="slide('left')">
      <span>
        <img src="https://img.icons8.com/material-rounded/24/000000/chevron-left.png"/>
      </span>
    </button>
    <button class="btn right-btn" v-if="!isEndPos" @click="slide('right')">
      <span>
        <img src="https://img.icons8.com/material-rounded/24/000000/chevron-right.png"/>
      </span>
    </button>
  </div>
</template>

<script>
import ProductComponent from './product-component.vue';
export default {
  name: 'CarouselComponent',
  components: {ProductComponent},
  props: {
    list: {
      type: [],
      required: true
    },
    listType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isStartPos: true,
      isEndPos: false
    }
  },
  mounted() {
    let carousel = this.$refs.carousel;
    if(carousel.scrollWidth==carousel.clientWidth) {
        this.isEndPos = true;
    } 
  },
  methods: {
    isCarouselStartPos(position) {
      this.isStartPos = position<=0;
    },
    isCarouselEndPos(position) {
      let carousel = this.$refs.carousel; 

      // calc => el total width - visible width of the el - position i'm at
      let res = (carousel.scrollWidth - carousel.clientWidth - position) <= 0;
      this.isEndPos = res; 
    },
    slide(direction) {
      let carousel = this.$refs.carousel;
      let newPosition;
      switch(direction) {
        case 'left': {
          newPosition = carousel.scrollLeft -= 270;
          this.isCarouselStartPos(newPosition);
          this.isCarouselEndPos(newPosition);
          break;
        }
        case 'right': {
          newPosition = carousel.scrollLeft += 270;
          this.isCarouselStartPos(newPosition);
          this.isCarouselEndPos(newPosition);
          break;
        }
      }      
    },
  }

}
</script>

<style scoped>
.carousel-container {
  height: 80%;
  position: relative;
}

.carousel {
  display: flex;
  padding: 0;
  overflow-x: scroll;
  scroll-padding-left: 24px;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.carousel::-webkit-scrollbar {
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

.img img {
  width: 100%;
}

</style>