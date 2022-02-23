<template>
  <button class="backToTop" v-bind:class="{ show: show }" @click="backToTop">
    <span class="backToTopText" v-if="checkWindowWidth">Torna su</span>
    <span class="backToTopIcon">      
      <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="24" height="24"
            viewBox="0 0 172 172"
            style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M86,24.8325l-4.8375,4.945l-34.0775,33.97c-2.70094,2.70094 -2.70094,7.08156 0,9.7825c2.70094,2.70094 7.08156,2.70094 9.7825,0l22.2525,-22.36v86.43c-0.04031,2.48594 1.26313,4.78375 3.41313,6.03344c2.13656,1.26313 4.79719,1.26313 6.93375,0c2.15,-1.24969 3.45344,-3.5475 3.41312,-6.03344v-86.43l22.2525,22.36c2.70094,2.70094 7.08156,2.70094 9.7825,0c2.70094,-2.70094 2.70094,-7.08156 0,-9.7825l-34.0775,-33.97z"></path></g></g></svg>
    </span>
  </button>
</template>

<script>
export default {
  name: 'BackToTopButtonComponent',
  data() {    
    return {
      show: false,           
    }
  },
  mounted() {
    window.onscroll = () => {
      this.watchScroll(window.pageYOffset);      
    }
  },
  computed: {
    checkWindowWidth() {
      return window.innerWidth>750;
    }
  },
  methods: {
    watchScroll(value) {
      if(value > 200) {
          this.show = true;
      } else {
          this.show = false;
      }
    },
    backToTop() {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

}
</script>

<style scoped>
.backToTop {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: rgba(26,26,26,.8);
  color: #fff;
  border: 0;
  position: fixed;
  right: 20px;
  bottom: 20px;
  text-transform: uppercase;
  letter-spacing: .4px;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 12px;
  height: 40px;
  line-height: 1;
  opacity: 0;
  visibility: hidden;
  transition: opacity .2s ease-in-out;
  z-index: 1;
  cursor: pointer;
}

.backToTop.show {
  opacity: 1;
  visibility: visible;
}

.backToTop > span {
  margin: 0 2px;
  font-size: 12px;
  font-weight: bold;
}
</style>