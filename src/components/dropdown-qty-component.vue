<template>
  <div class="dropdown-wrapper" v-click-outside="closeDropdown">
    <div v-if="over10" class="manual-picker dropdown-toggler hover-focus-border" :class="{'bigger': !text}">
      <input type="text" v-model="qtyFromInput" :class="{'bigger': !text}" ref="input"/>   
      <button @click="toggleDropdown" class="over10" :class="{'bigger': !text}">
        <span class="icon">
            <svg v-if="!text" class="arrow-down over10" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"  style=" fill:gray;" clip-rule="evenodd"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></svg>
            <svg v-if="text" class="over10" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 172 172" style=" fill:#000000;"><g transform="translate(25.8,25.8) scale(0.7,0.7)"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g id="original-icon" fill="#000000"><path d="M143.27734,51.52161c-1.51229,0.03575 -2.94918,0.66766 -3.99765,1.75807l-53.27969,53.27969l-53.27969,-53.27969c-1.07942,-1.10959 -2.56163,-1.73559 -4.10963,-1.73568c-2.33303,0.00061 -4.43306,1.41473 -5.31096,3.57628c-0.8779,2.16155 -0.3586,4.6395 1.31331,6.26669l57.33333,57.33333c2.23904,2.23811 5.86825,2.23811 8.10729,0l57.33333,-57.33333c1.70419,-1.63875 2.22781,-4.1555 1.31865,-6.33798c-0.90916,-2.18248 -3.06468,-3.58317 -5.42829,-3.52739z"></path></g></g></g></svg>
        </span>
      </button>
    </div>
    <button v-else class="dropdown-toggler hover-focus-border" :class="{'bigger': !text}" @click="toggleDropdown">   
      <p><span>{{qty}}</span></p>                 
      <span class="icon">
          <svg v-if="!text" class="arrow-down" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"  style=" fill:gray;" clip-rule="evenodd"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></svg>
          <svg v-if="text" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 172 172" style=" fill:#000000;"><g transform="translate(25.8,25.8) scale(0.7,0.7)"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g id="original-icon" fill="#000000"><path d="M143.27734,51.52161c-1.51229,0.03575 -2.94918,0.66766 -3.99765,1.75807l-53.27969,53.27969l-53.27969,-53.27969c-1.07942,-1.10959 -2.56163,-1.73559 -4.10963,-1.73568c-2.33303,0.00061 -4.43306,1.41473 -5.31096,3.57628c-0.8779,2.16155 -0.3586,4.6395 1.31331,6.26669l57.33333,57.33333c2.23904,2.23811 5.86825,2.23811 8.10729,0l57.33333,-57.33333c1.70419,-1.63875 2.22781,-4.1555 1.31865,-6.33798c-0.90916,-2.18248 -3.06468,-3.58317 -5.42829,-3.52739z"></path></g></g></g></svg>
      </span>
    </button>       
      <div class="dropdown" ref="dropdown">
        <ul class="qty-selector" ref="qtySelector">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10+</li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'QtyDropdownComponent',
  props: {
    text: {
      type: Boolean,
      required: true
    },
    qty: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      over10: false,
      qtyFromInput: 10
    }
  },
  mounted() {
    let qtySelector = this.$refs.qtySelector;
    qtySelector.childNodes.forEach(e => {
      e.onclick = () => {
        let value = parseInt(e.innerHTML);
        this.$emit("updateQty", value);
        this.closeDropdown();
        this.over10 = false;

        if(e==qtySelector.lastChild) {
          this.over10 = true;
          if(this.$refs.input) {
            this.$refs.input.focus();
          }
        }
      };
      if(!this.text) {
        e.classList.add('bigger');     
      }
    });
  },
  watch: {
    qtyFromInput: {
      handler(val) {
        this.$emit("updateQty", parseInt(val));
      }
    }
  },
  methods: {
    toggleDropdown() {      
      let dropdown = this.$refs.dropdown;      
      dropdown.style.display = dropdown.style.display == 'block' ? 'none' : 'block';
    }, 
    closeDropdown() {
      let dropdown = this.$refs.dropdown;
      dropdown.style.display = 'none';
    }   
  }

}
</script>

<style scoped>

.dropdown {
  left: 0;
  right: 0;
  scrollbar-width: none;
}

.dropdown-toggler {
  justify-content: space-between;
  width: 84px;
}

.dropdown-toggler:focus {  
  background:#f1f1f1;
}

.dropdown-toggler.bigger {
  width: 100%;
  padding: 20px;
  height: 50px;
  color: gray;
  font-size: 18px;
}

.dropdown-toggler > p {
  padding: 0;
  margin: 0;
}

.dropdown > ul {
  padding: 0;
  margin: 0;
}

.dropdown > ul > li {
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.79em;
}

.dropdown > ul > li.bigger {
  padding: 10px 20px;
  color: gray;
}

.dropdown > ul > li:hover{
  background: var(--hover-background);
  cursor: pointer;
}

.dropdown-toggler {
  display: flex;
  align-items: center;
  padding: 5px 10px;
}

.dropdown-toggler > .icon {
  margin: 3px 0 0 5px;
}

.toggler {  
  width: 100%;
  margin: 5px 0px;
  height: 50px;
  cursor:pointer;
  font-size: 18px;   
}

.manual-picker {
  display: flex;
  padding: 5px;
  border: 1px solid black;
  box-sizing: border-box;
  height: 40px;
}

.manual-picker.bigger {
  height: 50px;
}

.manual-picker > * {
  background: #fff;
  border: none;
}

.manual-picker > button { 
  border-left-width: 0;
  cursor: pointer;
  background: transparent;
  margin-top: 1px;
}

.manual-picker > button.bigger {
  margin-top: 0;
}

.manual-picker > input {
  border-right-width: 0;
  outline: none;
  width: 40px;
}

.manual-picker > input.bigger {
  width: 100%;
  font-size: 18px;
  color: gray;
}

</style>