<template>
  <div class="filters" v-click-outside="closeAllOptions">
    <div  class="filter" v-for="filter in this.filters" :key="filters.indexOf(filter)" 
          @click="toggleDropdown(filters.indexOf(filter))">
      <button class="dropdown-toggler">
          <span class="filter-text" :class="{margin: countSelected(filter)>0}">{{filter.text}}</span>   
          <span class="selectedOpt-counter" v-if="countSelected(filter)>0">{{countSelected(filter)}}</span> 
          <div class="icons-container">
            <img src="https://img.icons8.com/ios-glyphs/24/000000/chevron-down.png" class="img" style="display:block;" ref="chevronDown" />  
            <img src="https://img.icons8.com/ios-glyphs/24/000000/chevron-up.png" class="img" style="display:none;" ref="chevronUp" />              
          </div>
      </button>      
        <div class="filter-options" style="display:none;" ref="filterOptions">                                  
            <div  class="option" 
                  v-for="opt in filter.options" 
                  :key="filter.options.indexOf(opt)"
                  @click="selectOpt(opt,filter)"> 
              <span>{{opt.value}}</span>
              <span v-show="opt.selected">
                <img src="https://img.icons8.com/ios-glyphs/24/000000/checkmark--v1.png"/>
              </span>       
            </div>
        </div>
    </div> 
  </div>
</template>

<script>
import { filters, sizeOptions } from '../shared/product-filters.js';
export default {  
  name: 'ProductsFiltersComponent',
  data() {
    return {
      selectedOptIndex: -1,
      selectedFilterIndex: -1,
      currentFilterOpts: undefined,
      activedFilters: []
    }
  },  
  props: {
    gender: String
  },
  beforeDestroy() {
    this.unselectOldOpt();
  },
  computed: {
    filters: function() {
      return this.mapSizeFilters();
    }
  },
  watch: {
    gender: {
      handler() {
        this.mapSizeFilters();
      }
    }
  },
  created() {
    
  },

  methods: {
    toggleDropdown(key) {   
      let clicked = document.querySelectorAll(".filter")[key];
      let button = clicked.childNodes[0];
      let images = button.querySelectorAll(".img");
      let options = button.nextSibling;
      
      if(this.currentFilterOpts && this.currentFilterOpts!==options) {
        this.closeAllOptions();
        this.currentFilterOpts = options;
      } 
      if(!this.currentFilterOpts) {
        this.currentFilterOpts = options;
      } 
      this.toggleDisplay(this.currentFilterOpts);
      images.forEach(img => this.toggleDisplay(img));      
    },
    closeAllOptions() {
      this.$refs.filterOptions.forEach(opt => opt.style.display = 'none');            
      this.$refs.chevronDown.forEach(icon => icon.style.display = 'block');
      this.$refs.chevronUp.forEach(icon => icon.style.display = 'none');
    },
    toggleDisplay(el) {
      el.style.display = el.style.display == 'block' ? 'none' : 'block';
    },
    mapSizeFilters() {
      const res = [...filters];
      const sizeFilter = {
        text: 'Taglia',
        options: []        
      }
      if(this.gender==='uomo') {
        sizeFilter.options = sizeOptions.sizeMaleOptions;
      }
      if(this.gender==='donna') {
        sizeFilter.options = sizeOptions.sizeFemaleOptions;
      }
      res.push(sizeFilter);
      return res;
    },
    selectOpt(opt,filter) {
      if(opt.type !== 'size' && this.getOldSelectedOpt() && this.getOldSelectedOpt().type !== 'size') {
        this.unselectOldOpt();
      }
      // deselect option
      if(this.getOldSelectedOpt() && this.getOldSelectedOpt().value==opt.value) {
        this.unselectOldOpt();
        this.selectedFilterIndex = -1;
        this.selectedOptIndex = -1;
        this.$emit('sendActivedFilters', this.activedFilters); 
        return;
      }
      // select new option
      this.selectedFilterIndex = this.filters.indexOf(filter);
      this.selectedOptIndex = filter.options.indexOf(opt);
      opt.selected = true;
      this.activedFilters.push(opt);
      this.$forceUpdate();
      this.$emit('sendActivedFilters', this.activedFilters);  
    },
    getOldSelectedOpt() {
      try {
        return this.filters[this.selectedFilterIndex].options[this.selectedOptIndex];
      } catch(e) {
        console.log('old option is undefined');
      }
    },
    unselectOldOpt() {
      if(this.selectedFilterIndex>=0 && this.selectedOptIndex>=0) {
        let opt = this.getOldSelectedOpt();
        opt.selected = false;
        this.activedFilters.splice(this.activedFilters.indexOf(opt),1);        
      }      
    },
    countSelected(filter) {
      let counter = 0;
      filter.options.forEach(opt => {        
        if(opt.selected && opt.type=='size') {
          counter++;
        }
      });
      return counter;
    }
  }

}
</script>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
  margin-bottom: 40px;
  width: var(--product-grid-width);
}

.filter {
  position: relative;
  margin-right: 10px;
}

.filter-text {
  font-size: 16px;
  color: var(--black);
}

.icons-container {
  margin-left: 10px;
}

.selectedOpt-counter {
  color: #fff;
  background: var(--black);
  padding: 2px 4px;
  font-weight: bold;
}

.filter-text.margin {
  margin-right: 10px;
}

.dropdown-toggler {
  margin-bottom: 0;
  display: flex;
  align-items: center;
  padding: 10px 15px;    
  border: 1px #000 solid;
  background: #fff;
  cursor: pointer;    
}

.icons-container img {  
  cursor: pointer;
}

.dropdown-toggler:hover {
  box-shadow: inset 0 0 0 1px var(--black);
}

.filter-options {
  text-align: start;   
  margin-bottom: 5px;
  border: 1px #ccc solid;
  display: none;
  overflow: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  scrollbar-width: thin;
  position: absolute;  
  left: 0;
  background: white;
  min-width: 300px;
  max-height: 350px;
  z-index: 1;
}

.option {
  padding: 15px 20px;
  border-top: 1px #ccc solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 50px;
}

.option:hover {
    background:#f1f1f1;
    cursor: pointer;
}

@media screen and (max-width: 1060px) {
  .filters {
    width: 100%;
  }
}

</style>