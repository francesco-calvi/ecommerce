<template>
  <div class="container background">
    <div class="text-container">
      <h1>Saldi stagionali</h1>
      <h4>Fino al 50% su tutti gli articoli</h4>      
    </div>
    <div class="img-container">
      <img src="https://cdn.pixabay.com/photo/2016/11/22/19/08/hangers-1850082_960_720.jpg">
    </div>
    <div class="icon-container">
        <span class="icon">
          <img src="https://img.icons8.com/ios/48/000000/low-importance.png" @click="scrollDown"/>          
        </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BannerComponent',
  methods: {
    scrollDown() {
      let position = document.getElementById("carousel").getBoundingClientRect().top;
      window.scrollTo({
        top: (position-100),
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
.background {
  background-color: hsl(42,87.5%,82.88000000000001%);  
  margin-bottom: 100px;
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  position: relative;
}

.text-container {
  flex-basis: 70%;
}

h1 {
  padding: 0;
  margin: 0;  
  font-size: 35px;
}

h4 {
  padding: 0;
  font-size: 35px;
  margin-bottom: 30px;
  margin-top: 0;
  font-weight: 400;
}

.icon-container {
  position: absolute;
  bottom: -25px;
}

.icon-container .icon {
  display: flex;
  justify-content: center;
}

.icon-container .icon > img {  
  cursor: pointer;
}

.img-container {  
  height: 60%;
  flex-basis: 30%;
}

.img-container > img {
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

@media screen and (max-width: 820px) {
  .text-container h1 {
    font-size: 30px;
  }

  .text-container h4 {
    font-size: 25px;
  }  
}

@media screen and (max-width: 425px) {
  .text-container h1 {
    font-size: 25px;
  }

  .text-container h4 {
    font-size: 20px;
  } 

  .background {
    padding-top: 40px;
    padding-bottom: 40px;
  }
}

@media screen and (max-width: 740px) {
  .background {
    display: block;
  }

  .img-container {
    width: 70%;
    margin: 0 auto;
  }
}

@media screen and (max-width: 530px) {
  .img-container {
    width: 100%;
  }
}



</style>