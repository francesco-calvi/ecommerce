<template>
<div class="container products">       
    <div @click="goBackFunction" class="go-back">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/>
        </svg>
        <span>Torna indietro</span>
    </div>
    <div class="product-detail" :product="product">
        <CarouselComponent class="img-container" v-if="checkWindowWidth()" :list="product.images"/>
        <div v-else class="img-container">
            <div class="images">
                <div class="img" :class="{selected: selectedImg==image.url}" 
                     @click="selectedImg=image.url" v-for="image in product.images" :key="image.url">
                    <img :src="image.url" alt="image">
                </div>
            </div>
            <div class="selected-img">
                <img :src="selectedImg" alt="image" />
            </div>
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
                    <button id="size-toggler" class="toggler hover-focus-border" ref="sizeToggler">
                        <span>{{selectedSize.text}}</span>                    
                        <svg class="arrow-down" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></svg>
                    </button>                
                    <div class="sizes-container" style="display:none;" ref="sizesContainer">
                        <div id="sizes-panel">
                            <span @click="setItalianSizes" ref="ItSizes">Taglie Italiane</span>
                            <span @click="setUSSizes" ref="UsSizes">Taglie Americane</span>   
                        </div>                             
                        <div class="size-container" v-for="size in sizes" v-bind:key="size.id">
                            <div class="size">
                                <span :class="{gray: !size.available }"
                                      @click="selectedSize.text=size.value;selectedSize.available=size.available;">
                                    {{size.value}} 
                                </span>                                
                                <span class="unavailable">{{!size.available ? 'Esaurito' : ''}}</span>
                            </div>
                        </div>
                    </div>
                </div>               
                <p v-show='selectedSize.available==false' class="error">La taglia selezionata non è al momento disponibile!</p>
                <p v-show="showUnselectedSizeError" class="error">Nessuna taglia selezionata</p>
            </div>
            <QtyDropdownComponent :text="false" :qty="this.selectedQty" @updateQty="updateSelectedQty" class="qty hover-focus-border"/>
            <div class="buttons">
                <button @click="addToCart" class="btn addToCart-btn">Aggiungi al carrello</button>
                <FavoritesBtnComponent :isProdAttached="false"/>
            </div>
        </div>
    </div>
    <Modal v-show="isModalVisible" @close="closeModal">
        <template v-slot:header>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g><path d="M22.36,46.44c-1.89986,0 -3.44,1.54014 -3.44,3.44c0,1.89986 1.54014,3.44 3.44,3.44c1.89986,0 3.44,-1.54014 3.44,-3.44c0,-1.89986 -1.54014,-3.44 -3.44,-3.44z" fill="#88ae45"></path><path d="M132.44,20.64c-0.94993,0 -1.72,0.77007 -1.72,1.72c0,0.94993 0.77007,1.72 1.72,1.72c0.94993,0 1.72,-0.77007 1.72,-1.72c0,-0.94993 -0.77007,-1.72 -1.72,-1.72z" fill="#f1bc19"></path><path d="M86,22.36c-35.1474,0 -63.64,28.4926 -63.64,63.64c0,35.1474 28.4926,63.64 63.64,63.64c35.1474,0 63.64,-28.4926 63.64,-63.64c0,-35.1474 -28.4926,-63.64 -63.64,-63.64z" fill="#e6edb7"></path><path d="M142.76,18.92c-3.79972,0 -6.88,3.08028 -6.88,6.88c0,3.79972 3.08028,6.88 6.88,6.88c3.79972,0 6.88,-3.08028 6.88,-6.88c0,-3.79972 -3.08028,-6.88 -6.88,-6.88z" fill="#f1bc19"></path><path d="M149.64,37.84c-1.89986,0 -3.44,1.54014 -3.44,3.44c0,1.89986 1.54014,3.44 3.44,3.44c1.89986,0 3.44,-1.54014 3.44,-3.44c0,-1.89986 -1.54014,-3.44 -3.44,-3.44z" fill="#88ae45"></path><path d="M139.32,127.28c-1.89986,0 -3.44,1.54014 -3.44,3.44c0,1.89986 1.54014,3.44 3.44,3.44c1.89986,0 3.44,-1.54014 3.44,-3.44c0,-1.89986 -1.54014,-3.44 -3.44,-3.44zM25.8,101.48c-3.79972,0 -6.88,3.08028 -6.88,6.88c0,3.79972 3.08028,6.88 6.88,6.88c3.79972,0 6.88,-3.08028 6.88,-6.88c0,-3.79972 -3.08028,-6.88 -6.88,-6.88z" fill="#fbcd59"></path><path d="M43,146.2c-1.89986,0 -3.44,1.54014 -3.44,3.44c0,1.89986 1.54014,3.44 3.44,3.44c1.89986,0 3.44,-1.54014 3.44,-3.44c0,-1.89986 -1.54014,-3.44 -3.44,-3.44z" fill="#88ae45"></path><path d="M31.82,87.72c-2.37482,0 -4.3,1.92518 -4.3,4.3c0,2.37482 1.92518,4.3 4.3,4.3c2.37482,0 4.3,-1.92518 4.3,-4.3c0,-2.37482 -1.92518,-4.3 -4.3,-4.3z" fill="#ffffff"></path><path d="M36.12,113.52c-0.94993,0 -1.72,0.77007 -1.72,1.72c0,0.94993 0.77007,1.72 1.72,1.72c0.94993,0 1.72,-0.77007 1.72,-1.72c0,-0.94993 -0.77007,-1.72 -1.72,-1.72z" fill="#f1bc19"></path><path d="M137.6,56.76c-0.94993,0 -1.72,0.77007 -1.72,1.72c0,0.94993 0.77007,1.72 1.72,1.72c0.94993,0 1.72,-0.77007 1.72,-1.72c0,-0.94993 -0.77007,-1.72 -1.72,-1.72z" fill="#ffffff"></path><g><path d="M86,44.79224c-22.75842,0 -41.20776,18.44934 -41.20776,41.20776c0,22.75842 18.44934,41.20776 41.20776,41.20776c22.75842,0 41.20776,-18.44934 41.20776,-41.20776c0,-22.75842 -18.44934,-41.20776 -41.20776,-41.20776z" fill="#fdfcee"></path><path d="M86,45.408c22.38236,0 40.592,18.20964 40.592,40.592c0,22.38236 -18.20964,40.592 -40.592,40.592c-22.38236,0 -40.592,-18.20964 -40.592,-40.592c0,-22.38236 18.20964,-40.592 40.592,-40.592M86,43c-23.74804,0 -43,19.25196 -43,43c0,23.74804 19.25196,43 43,43c23.74804,0 43,-19.25196 43,-43c0,-23.74804 -19.25196,-43 -43,-43z" fill="#472b29"></path><path d="M85.99828,52.245c-18.64332,0 -33.75672,15.1134 -33.75672,33.75672c0,18.64332 15.1134,33.75672 33.75672,33.75672c18.64332,0 33.75672,-15.1134 33.75672,-33.75672c0,-18.64332 -15.1134,-33.75672 -33.75672,-33.75672z" fill="#93bc39"></path><path d="M85.99828,57.405c17.77276,0 32.30332,13.7428 33.626,31.17672c0.06536,-0.85484 0.13072,-1.70968 0.13072,-2.58c0,-18.64308 -15.11364,-33.75672 -33.75672,-33.75672c-18.64308,0 -33.75672,15.11364 -33.75672,33.75672c0,0.87032 0.06536,1.72516 0.13072,2.58c1.32268,-17.43392 15.85496,-31.17672 33.626,-31.17672z" fill="#c0d078"></path><path d="M85.99828,52.89c18.2578,0 33.11172,14.8522 33.11172,33.10828c0,18.2578 -14.85392,33.11172 -33.11172,33.11172c-18.25608,0 -33.10828,-14.85392 -33.10828,-33.11172c0,-18.25608 14.8522,-33.10828 33.10828,-33.10828M85.99828,51.6c-18.96644,0 -34.39828,15.43184 -34.39828,34.39828c0,18.96816 15.43184,34.40172 34.39828,34.40172c18.96816,0 34.40172,-15.43356 34.40172,-34.40172c0,-18.96816 -15.43356,-34.39828 -34.40172,-34.39828z" fill="#472b29"></path></g><g><path d="M70.52,83.42c-0.68972,0 -1.33644,0.26832 -1.8232,0.75508c-0.48848,0.48676 -0.7568,1.1352 -0.7568,1.82492c0,0.68972 0.26832,1.33644 0.75508,1.82492l12.04,12.04c0.48848,0.48676 1.13692,0.75508 1.82492,0.75508c0.75508,-0.01548 1.4276,-0.31992 1.9006,-0.83592l18.92,-20.64c0.46612,-0.5074 0.70692,-1.16788 0.67596,-1.85588c-0.03096,-0.688 -0.32508,-1.3244 -0.8342,-1.7888c-1.01136,-0.9288 -2.72276,-0.8514 -3.64468,0.15824l-17.10024,18.6534l-10.13424,-10.13424c-0.48676,-0.48848 -1.13348,-0.7568 -1.8232,-0.7568z" fill="#fdfcee"></path><path d="M101.48,75.25v0c0.53836,0 1.05436,0.20124 1.4534,0.56588c0.42312,0.38872 0.66908,0.91676 0.69488,1.49124c0.02408,0.57448 -0.17544,1.12316 -0.56244,1.54628l-18.92,20.64c-0.3956,0.43 -0.9546,0.68456 -1.58412,0.6966c-0.57448,0 -1.11456,-0.2236 -1.52048,-0.62952l-12.04,-12.04c-0.40764,-0.40592 -0.63124,-0.946 -0.63124,-1.52048c0,-0.57448 0.2236,-1.11456 0.63124,-1.52048c0.4042,-0.40592 0.94428,-0.62952 1.51876,-0.62952c0.57448,0 1.11456,0.2236 1.52048,0.62952l10.45244,10.45244l17.40296,-18.98536c0.41108,-0.44892 0.97352,-0.6966 1.58412,-0.6966M101.48,73.96c-0.93052,0 -1.8576,0.37496 -2.53528,1.11628l-16.49308,17.9912l-9.49956,-9.49956c-0.6708,-0.67252 -1.55144,-1.00792 -2.43208,-1.00792c-0.88064,0 -1.76128,0.3354 -2.43208,1.00792c-1.34332,1.34332 -1.34332,3.52084 0,4.86416l12.04,12.04c0.645,0.64672 1.52048,1.00792 2.43208,1.00792c0.0258,0 0.04988,0 0.07396,0c0.9374,-0.02064 1.82664,-0.42312 2.46132,-1.11456l18.92,-20.64c1.28484,-1.40008 1.18852,-3.5776 -0.21156,-4.86072c-0.66048,-0.60544 -1.49296,-0.90472 -2.32372,-0.90472z" fill="#472b29"></path></g></g></g></svg>
        </template>
        <template v-slot:body>Il prodotto è stato aggiunto al carrello!</template>
        <template v-slot:footer>
            <button
                type="button"
                class="modal-btn"
                @click="closeModal"
                aria-label="Close modal">
                OK
            </button>
        </template>
   </Modal>
</div>
</template>

<script>
import { sizes } from '../shared/sizes.js'
import FavoritesBtnComponent from '../components/favorites-btn-component.vue';
import CarouselComponent from '../components/carousel-component.vue';
import QtyDropdownComponent from '../components/dropdown-qty-component.vue';
import { mapGetters, mapActions } from 'vuex';
import checkDiscountMixin from '../mixins/checkDiscount.js';
import Modal from '../components/modal.vue';

export default {
    name: 'ProductDetailComponent', 
    components: {FavoritesBtnComponent, CarouselComponent, QtyDropdownComponent, Modal},   
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
            selectedQty: 1,
            isModalVisible: false,
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
        this.sizes = this.getSizes();
        this.setItalianSizes();
        this.hideSizeToggler();        
    },
    mounted() {
        
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
            let availableSizes = this.sizes.filter(size => this.product.sizes.find(pSize => pSize.value == size.value));            
            if(this.product.quantity>0) {
                availableSizes.forEach(size => size.available = true);
            }
        },
        getSizes() {  
            let sizesWrapper = [];
            for(let i = 0; i<sizes.categories.length; i++) {                
                if(this.product.category.includes(sizes.categories[i].name)) {
                    sizesWrapper = sizes.categories[i];
                    break;
                }
            }
            if(this.italianSizes) {
                return sizesWrapper.it;
            } else {
                return sizesWrapper.us;
            } 
               
        },
        setItalianSizes() {
            this.italianSizes=true;
            this.USSizes=false;
            this.sizes=this.getSizes();
            this.availableSizes();
        },
        setUSSizes() {
            this.italianSizes=false;
            this.USSizes=true;
            this.sizes=this.getSizes();
            this.availableSizes();
        },
        hideSizeToggler() {
            if(this.product.category.includes('hats') || this.product.category.includes('accessories')) {    
                this.$refs.sizeToggler.style.display = 'none';
            }
        },
        goBackFunction() {            
            this.$router.go(-1);
            let position = localStorage.getItem('pageYOffset');
            if(position) {
                window.scroll({top: position, behavior:'smooth'})
            }
        },
        checkWindowWidth() {
            return window.innerWidth<930;
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
            // TODO controllo disponibilitò
            this.addToCartAction(this.cartItem);
            this.showModal();
        },
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        isDuplicate(size) {   
            let counter;
            for(let i = 0; i < this.sizes.length; i++) {  
                counter = 0;
                if(this.sizes[i].us == size) {
                    for(let j = 0; j < this.sizes.length; j++) {
                        if(this.sizes[i].us==this.sizes[j].us) {
                            counter++;
                        }
                    }                    
                } 
                if(counter>1) {
                        this.sizes.splice(i, 1);
                        console.log(size + ": "+true )
                        return true;
                }        
            }
            return false;
        }

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

.selected-img {    
    flex-basis: 95%;
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

button {
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
    background: #f1f1f1;
}

.sizes-container { 
    text-align: start;   
    margin-bottom: 5px;
    display: none;
    overflow: scroll;
    overflow-x: hidden;
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

@media screen and (max-width:685px) {
    .product-detail {
        flex-direction: column;
    }

    .info {
        width: 100%;
        margin: 30px;
    }

    .img-container {
        width: 70%
    }
}

@media screen and (max-width:500px) {
    
    .img-container {
        width: 90%
    }
}
</style>
<style>
    .modal-btn {
    width: 100%;
    cursor: pointer;
    border: none;
    background: transparent;
    color: var(--primary-color);
    font-weight: 700;
}
</style>