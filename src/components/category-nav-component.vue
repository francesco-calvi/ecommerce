<template>
  <div class="category-nav-container">
      <div class="category-nav" v-if="this.gender && this.category">
        <nav class="nav">
          <ul class="category-nav-list" ref="categoryNavList">
            <li class="category-list-leader">
              <span>
                <router-link :to="{path: '/'+this.gender, params: {gender: this.gender}}" 
                class="link underline">{{this.gender | capitalize}}</router-link>
              </span>
            </li>
            <li class="category-list-item">
              <img style="height: 13px;" src="https://img.icons8.com/ios/24/000000/forward--v1.png"/>
              <span>
                <a  class="link underline" 
                    :class="{disabled: this.subCat.length<=0}"
                    @click="updateSubCat(String())">
                  {{this.category | capitalize}}
                </a>
              </span>
            </li>
            <li class="category-list-item" v-if="this.subCat">
              <img style="height: 13px;" src="https://img.icons8.com/ios/24/000000/forward--v1.png"/>
              <span><a class="link underline disabled"> {{this.subCat | capitalize}}</a></span>
            </li>
          </ul>
        </nav>
        <div class="category-title">
          <h1>{{this.category | capitalize}} {{this.gender}}</h1>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CategoryNavComponent',
  props: {
    category: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    subCat: {
      type: String,
      required: false
    }
  },
  watch: {
    category: {
      handler() {
        this.updateSubCat(String());
      }
    }
  },
  methods: {
     updateSubCat(subCat) {
      this.$emit("updateSubCat", subCat);
    } 
  }
}
</script>

<style scoped>
.category-nav-container {
  margin: 0 0 40px 0;
  height: 80px;
}

.nav ul {
  display: flex;
  align-items: center;
  padding: 0;
}

.nav ul > li > * {
  margin-right: 15px;
}

.nav ul > li.category-list-item {
  display: flex;
  align-items: center;
}

.nav ul > li.category-list-item span a.disabled {
  pointer-events: none;
  color: #a2a3a8;
  font-weight: bold;
}

.nav ul > li span a {
  font-weight: bold;
}

.category-title {
  text-align: start;
  font-size: 22px;
  margin: 0 0 40px 0;
}

.category-title > h1 {
  margin: 0;
}

@media screen and (max-width:630px){
  
  .category-title {
    font-size: 18px;
  }
}

@media screen and (max-width:490px){
  
  .category-title {
    font-size: 14px;
  }
}

</style>