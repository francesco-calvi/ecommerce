<template>
  <div id="productsNavigator">
    <span class="">
        <svg
            v-on:click="checkTotalPages('decrement')"
            height="1em"
            width="1em"
            focusable="false"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-labelledby="chevron-left-363357"
            role="img"
            aria-hidden="false">
            <title id="chevron-left-363357">chevron-left</title>
            <path
            d="M15.84 21.36a.748.748 0 0 1-.53-.22l-7.55-7.55a2.252 2.252 0 0 1 0-3.18l7.55-7.551a.75.75 0 1 1 1.06 1.06l-7.55 7.55a.751.751 0 0 0 0 1.061l7.55 7.55a.75.75 0 0 1-.53 1.28z"
            ></path>
        </svg>
    </span>
    <span style="font-size: 16px;">Pagina {{this.currentPage}} di {{pages}}</span>
    <span>
        <svg
            v-on:click="checkTotalPages('increment')"
            class=""
            height="1em"
            width="1em"
            focusable="false"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-labelledby="chevron-right-363358"
            role="img"
            aria-hidden="false">
                <title id="chevron-right-363358">chevron-right</title>
                <path
                d="M7.63 21.14a.75.75 0 0 1 0-1.06l7.55-7.55a.751.751 0 0 0 0-1.06L7.63 3.92a.75.75 0 1 1 1.06-1.061l7.55 7.55a2.252 2.252 0 0 1 0 3.182l-7.55 7.55a.748.748 0 0 1-1.06 0z"
                ></path>
        </svg>
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name:'ProductsListNav',
    props: {
        pages: Number,
        index: Number
    },
    computed: {
        currentPage: function() {
            return this.index+1;
        }
    },
    methods: {
        ...mapActions(['updateIndex']),        
        checkTotalPages(action) {
            switch(action) {
                case "increment": {
                    if((this.currentPage+1) > this.pages) break;
                    this.updateIndex(this.index+1);
                    break;
                }
                case "decrement": {
                    if((this.currentPage-1) <= 0) break;
                    this.updateIndex(this.index-1);
                    break;
                }
            }
        }
    }
};
</script>

<style scoped>
#productsNavigator {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px auto;    
}

#productsNavigator span:nth-child(2n+1) {
    margin: 0 5px;
    display: flex;
    justify-content: center;
    cursor: pointer;
}

</style>
