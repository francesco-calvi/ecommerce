<template>
  <span class="favorites" :class="{'product': isProdAttached, 'hover-focus-border': !isProdAttached}">
    <img src="https://img.icons8.com/ios/48/000000/like--v2.png"/>
  </span>
</template>

<script>
export default {
  name: 'FavoritesBtnComponent',
  props: {
    isProdAttached: {
      type: Boolean,
      default: true
    }
  }

}
</script>

<style scoped>
.favorites.product {
  top: 10px;
  right: 0;  
  border: none;
  height: auto;
}

.favorites {
  background: #fff;
  padding: 2px 5px;
  width: 40px;
  border: 1px solid var(--black);
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 50px;
  box-sizing: border-box;
  margin-left: 6px;
}

.favorites img {
  width: 100%
}

</style>