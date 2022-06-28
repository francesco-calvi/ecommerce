<template>
  <div class="carousel-container">
    <div
      class="carousel"
      v-if="this.listType === 'products'"
      ref="carousel"
      id="carousel"
    >
      <ProductComponent
        :id="product.id"
        v-for="product in list"
        :key="product.id"
        :isCarousel="true"
      />
    </div>
    <div class="carousel" v-else ref="carousel" id="carousel">
      <div class="img" v-for="img in this.list" v-bind:key="img.url">
        <img :src="img.url" alt="" />
      </div>
    </div>
    <button class="btn left-btn" v-if="!isStartPos" @click="slide('left')">
      <span>
        <img
          src="https://img.icons8.com/material-rounded/24/000000/chevron-left.png"
        />
      </span>
    </button>
    <button class="btn right-btn" v-if="!isEndPos" @click="slide('right')">
      <span>
        <img
          src="https://img.icons8.com/material-rounded/24/000000/chevron-right.png"
        />
      </span>
    </button>
  </div>
</template>

<script>
import ProductComponent from "./product-component.vue";
export default {
  name: "CarouselComponent",
  components: { ProductComponent },
  props: {
    list: {
      type: [],
      required: true,
    },
  },
  data() {
    return {
      isStartPos: true,
      isEndPos: false,
    };
  },
  mounted() {
    if (this.listType !== "products") {
      this.isEndPos = false;
    } else {
      this.checkCarouselWidth();
    }
  },
  computed: {
    listType() {
      if (this.list) {
        if (this.list[0].url) {
          return "images";
        } else {
          return "products";
        }
      } else {
        return null;
      }
    },
  },
  methods: {
    checkCarouselWidth() {
      setTimeout(() => {
        let carousel = this.$refs.carousel;
        if (carousel.scrollWidth === carousel.clientWidth) {
          this.isEndPos = true;
        }
      }, 500);
    },
    isCarouselStartPos(position) {
      this.isStartPos = position <= 0;
    },
    isCarouselEndPos(position) {
      let carousel = this.$refs.carousel;

      // calc => carousel total width - visible width of the carousel - position i'm at
      let res = carousel.scrollWidth - carousel.clientWidth - position <= 0;
      this.isEndPos = res;
    },
    slide(direction) {
      let carousel = this.$refs.carousel;
      let newPosition;
      switch (direction) {
        case "left": {
          newPosition = carousel.scrollLeft -= carousel.clientWidth;
          this.isCarouselStartPos(newPosition);
          this.isCarouselEndPos(newPosition);
          break;
        }
        case "right": {
          newPosition = carousel.scrollLeft += carousel.clientWidth;
          this.isCarouselStartPos(newPosition);
          this.isCarouselEndPos(newPosition);
          break;
        }
      }
    },
  },
};
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
  top: calc(50% - 20px);
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

.img {
  min-width: fit-content;
}

.img img {
  width: 100%;
}
</style>
