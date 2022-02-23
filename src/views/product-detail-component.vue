<template>
<div class="container products">       
    <div @click="goBackFunction" class="go-back">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/>
        </svg>
        <span>Torna indietro</span>
    </div>
    <div class="product-detail" :product="product">
        <CarouselComponent class="img-container" v-if="checkWindowWidth()" :list="product.images" :listType="'product images'"/>
        <div v-else class="img-container">
            <div class="images">
                <div class="img" :class="{selected: selectedImg==image.url}" 
                     @click="selectedImg=image.url" v-for="image in product.images" :key="image.url">
                    <img :src="image.url" alt="image">
                </div>
            </div>
            <img :src="selectedImg" alt="image" class="selected-img" />
        </div>
        <div class="info">
            <span>{{ product.name }}</span>
            <span :class="{discounted : product.discounted}">{{ product.price }} &euro;</span>
            <span class="price-discount" v-if="product.discounted">{{this.checkDiscount(product) | numFormat}} &euro;</span>
            <span v-if="product.quantity == 0" class="unavailable">
                Attualmente non disponibile
            </span>
            <div class="size-selector" v-click-outside="toggleSizes"> 
                <div class="sizes-picker"  @click="toggleSizes">   
                    <button id="size-toggler" class="hover-focus-border" ref="sizeToggler">
                        <span>{{selectedSize.text}}</span>                    
                        <svg class="arrow-down" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></svg>
                    </button>                
                    <div class="sizes-container" style="display:none;" ref="sizesContainer">
                        <div id="sizes-panel">
                            <span @click="italianSizes=true;USSizes=false" ref="ItSizes">Taglie Italiane</span>
                            <span @click="USSizes=true;italianSizes=false" ref="UsSizes">Taglie Americane</span>   
                        </div>                             
                        <div class="size-container" v-for="size in sizes" v-bind:key="size.id">
                            <div class="size">
                                <span :class="{gray: !size.available }" 
                                      v-show="italianSizes"
                                      @click="selectedSize.text=size.it;selectedSize.available=size.available">
                                    {{size.it}} 
                                </span>
                                <span :class="{gray: !size.available }"
                                    @click="selectedSize.text=size.us;selectedSize.available=size.available"
                                    v-show="USSizes">
                                    {{size.us}} 
                                </span>
                                <span class="unavailable">{{!size.available ? 'Esaurito' : ''}}</span>
                            </div>
                        </div>
                    </div>
                </div>               
                <p v-show='selectedSize.available==false' class="error">La taglia selezionata non è al momento disponibile!</p>
                <p v-show="showUnselectedSizeError" class="error">Nessuna taglia selezionata</p>
                <QtyDropdownComponent :text="false" :qty="this.selectedQty" @updateQty="updateSelectedQty" class="qty hover-focus-border"/>
                <div class="buttons">
                    <button @click="addToCart" class="btn addToCart-btn">Aggiungi al carrello</button>
                    <FavoritesBtnComponent :isProdAttached="false"/>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { sizes } from '../shared/sizes.js'
import FavoritesBtnComponent from '../components/favorites-btn-component.vue';
import CarouselComponent from '../components/carousel-component.vue';
import QtyDropdownComponent from '../components/dropdown-qty-component.vue';
import { mapGetters, mapActions } from 'vuex';
import checkDiscountMixin from '../mixins/checkDiscount.js';

export default {
    name: 'ProductDetailComponent', 
    components: {FavoritesBtnComponent, CarouselComponent, QtyDropdownComponent},   
    mixins: [checkDiscountMixin],
    props: {
        id: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {  
            product: {},                      
            sizes: [],
            italianSizes: true,
            USSizes: false,
            selectedSize: {
                text:'Scegli una taglia',
                available:undefined
            },
            selectedImg: undefined,
            showUnselectedSizeError: false,
            selectedQty: 1
        }
    },
    watch: {
        'selectedSize.text': {
            handler(newVal, oldVal) {                
                if(oldVal!==newVal && typeof newVal=='number') {
                    this.showUnselectedSizeError = false;
                }
            }
        }
    }, 
    async beforeMount() {
        const store = this.$store;
        if(store.state.products.length == 0) {     
            await store.dispatch('getProductsAction');
        }
        this.product = this.getProductById(this.id);
        this.selectedImg = this.product.images[0].url;
        this.availableSizes();
    },
    computed: {
        ...mapGetters(['getProductById'])
    },
    methods: {
        ...mapActions(['updateProductAction', 'addProductAction', 'updateIndex', 'addToCartAction']),
        toggleSizes(event) { 
            let sizesContainer = this.$refs.sizesContainer;
            let sizeToggler = this.$refs.sizeToggler;
            let ItSizes = this.$refs.ItSizes;
            let UsSizes = this.$refs.UsSizes;

            if(event.target==ItSizes || event.target==UsSizes) {
                return;
            }
            if( event.target!=sizeToggler && 
                event.target!=sizeToggler.childNodes[0] &&
                event.target!=sizeToggler.childNodes[1]) {
                    sizesContainer.style.display = 'none';
            } else {
                sizesContainer.style.display = sizesContainer.style.display== 'none' ? 'block' : 'none';               
            }
        },
        availableSizes() {            
            // TODO taglie miste; prodotti non disponibili
            let sizesWrapper = sizes.categories.find(cat => cat.name == this.product.category);            
            this.sizes = this.product.gender == 'M' ? sizesWrapper.male : sizesWrapper.female;            
            let availableSizes = this.sizes.filter(size => this.product.sizes.find(pSize => pSize.value == size.it));            
            availableSizes.forEach(size => size.available = true);
        },
        goBackFunction() {            
            this.$router.go(-1);
            let position = localStorage.getItem('pageYOffset');
            if(position) {
                window.scroll({top: position, behavior:'smooth'})
            }
        },
        checkWindowWidth() {
            return window.innerWidth<1050;
        },
        checkSelectedSize() {
            return typeof this.selectedSize.text=='number';
        },
        updateSelectedQty(value) {
            this.selectedQty = value;
        },
        addToCart() {
            if(!this.checkSelectedSize()) {
                this.showUnselectedSizeError = true;
                return;
            } 
            if(!this.selectedSize.available) {
                return;
            }
            this.cartItem = {
                product: this.product,
                quantity: this.selectedQty
            }
            this.addToCartAction(this.cartItem);
        },
        

    }
}
</script>

<style scoped>

.product-detail {
    display: flex;
    align-items: center;
}

.img-container {
    width: 55%;
    display: flex;
    align-items: stretch;
}

.img-container img {
    width: 100%;
    height: 100%;
}

.images {
    flex-basis: 20%;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
}

.images .img {
    margin-bottom: 5px;
    padding: 2px;
    cursor: pointer;
    height: 120px;
}

.images .img:hover {
    box-shadow: inset 0 0 0 2px var(--black);
}

.selected {
    box-shadow: inset 0 0 0 2px var(--black);
}

.info {
    width: 45%;
    margin-left: 5%;
    text-align: start;        
}

.info > span {
    display: block;
    font-size:25px;       
}

.size-selector {
    margin-top: 40px;
}

.size-selector select, button {
    width: 100%;
    margin: 5px 0px;
    height: 50px;
    cursor:pointer;
    font-size: 18px;    
}

.size-selector > select {
    color: #c5c5c5;
    background: #fff;
    padding: 0 15px;
}

.unavailable {
    float: right;
    font-style: italic;
    color: rgba(76, 0, 255, 0.466);
    font-weight: bold;    
}


.sizes-picker {
    position: relative;
    background: #fff;
    color: gray;
}

#size-toggler {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;    
    border: 1px #000 solid;   
    background: #fff;
    color: gray;
}

#size-toggler:focus {
    background:#f1f1f1;
}

#sizes-panel {
    padding: 10px;
}

#sizes-panel > span {
    border-right: 1px #ccc solid;
    display: inline-block;
    padding: 10px;
    cursor:pointer;   
}

#sizes-panel > span:hover {
    background: #ccc;
}

.sizes-container { 
    text-align: start;   
    margin-bottom: 5px;
    display: none;
    overflow: scroll;
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
    scrollbar-width: thin;
    position: absolute;    
    right: 0;
    left: 0;
    background: white;
    max-height: 260px;
    color: var(--black);
    z-index: 1;
}

.size-container {
    padding: 0 20px;
}

.size {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    border-top: 1px #ccc solid;
}

.size :nth-child(1) {
    width: 100%;
}

.size-container:hover {
    background:#f1f1f1;
    cursor: pointer;
}

.arrow-down {
    fill: gray;
}

.buttons {
    display: flex;
    align-items: center;
    margin-top: 5px;
}

.go-back {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 20px;
    margin-bottom: 30px;
    cursor: pointer;
}

.go-back > span {     
    text-align: start;
    margin-left: 5px;
}

.go-back > span:hover {
    text-decoration: underline;    
}

.gray {
    color: gray;
}

.error {
    color:var(--red);
    margin:15px 0;
}

.qty {    
    margin-top: 10px;
}

.qty > button {
    padding: 20px;
}
</style>