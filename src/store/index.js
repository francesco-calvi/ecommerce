import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import { productDao } from '../shared/productDao';
import { userDao } from '../shared/userDao';
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  ADD_USER,
  UPDATE_SEARCH_VALUE,
  UPDATE_GENDER_VALUE,
  UPDATE_FILTERED_PRODUCTS_INDEX,
  ADD_TO_CART,
  IS_LOGIN_FORM,
  UPDATE_CART_ITEM_QTY,
  REMOVE_FROM_CART
} from './mutationType.js';

Vue.use(Vuex)

const state = () => ({
  products: [],
  loggedUser: undefined,
  searchValue: undefined,
  gender: undefined,
  index: 0,
  cart: [],
  isLoginForm: false
});

// Gli effettivi cambiamenti
const mutations = {
  [ADD_PRODUCT](state, product) {
    state.products.push(product); // mutable addition
  },
  [UPDATE_PRODUCT](state, product) {
    const index = state.products.findIndex(p => p.id === product.id);
    state.products.splice(index, 1, product);
    // Non obbligatorio: ricopio il mio array
    state.products = [...state.products];
  },
  [GET_PRODUCTS](state, products) {
    state.products = products;
  },
  [DELETE_PRODUCT](state, productId) {
    state.products = [...state.products.filter(p => p.id !== productId)];
  },
  [UPDATE_CURRENT_USER] (state, user) {
    state.loggedUser = user;
  },
  [LOGOUT_CURRENT_USER] (state) {
    state.loggedUser = undefined;
  },
  [ADD_USER](){},
  [UPDATE_SEARCH_VALUE](state, value) {
    state.searchValue = value;
  },
  [UPDATE_GENDER_VALUE](state, value) {
    state.gender = value;
  },
  [UPDATE_FILTERED_PRODUCTS_INDEX](state, value) {
    state.index = value;
  },
  [ADD_TO_CART](state, product) {
    state.cart.push(product);
  },
  [IS_LOGIN_FORM](state, value) {
    state.isLoginForm = value;
  },
  [UPDATE_CART_ITEM_QTY](state, cartItem) {
    const index = state.cart.findIndex(item => item.product.id === cartItem.product.id);
    state.cart.splice(index, 1, cartItem);
    state.cart = [...state.cart];
  },
  [REMOVE_FROM_CART](state, cartItem) {
    state.cart = [...state.cart.filter(item => item.product.id !== cartItem.product.id)];
  }
};

// Le azioni che scatenano i cambiamenti
const actions = {
  async addProductAction({ commit }, product) {
    const addProduct = await productDao.addProduct(product);
    commit(ADD_PRODUCT, addProduct);
  },
  async deleteProductAction({ commit }, product) {
    const deletedProductId = await productDao.deleteProduct(product);
    commit(DELETE_PRODUCT, deletedProductId);
  },
  async getProductsAction({ commit }) {
    const products = await productDao.getProducts();
    commit(GET_PRODUCTS, products);
  },
  async updateProductAction({ commit }, product) {
    const updatedProduct = await productDao.updateProduct(product);
    commit(UPDATE_PRODUCT, updatedProduct);
  },
  async updateCurrentUserAction({ commit }, user) {
    const currentUser = await userDao.getUser(user);
    if(!currentUser) return;
    commit(UPDATE_CURRENT_USER, currentUser);
  },
  logoutUserAction({commit}) {
    commit(LOGOUT_CURRENT_USER);
  },
  async addUserAction({ commit }, user) {
    const addUser = await userDao.addUser(user);
    console.log(addUser);
    commit(ADD_USER, addUser);
  },
  updateSearchValue({commit}, value) {
    if(typeof(value)=='string') {
      commit(UPDATE_SEARCH_VALUE, value);
    }
  },
  updateGenderValue({commit}, value) {
    if(value==='uomo' || value === 'donna' || !value) {
      commit(UPDATE_GENDER_VALUE, value);
    }
  },
  updateIndex({commit}, value) {
    if(value>=0) {
      commit(UPDATE_FILTERED_PRODUCTS_INDEX, parseInt(value));
    }
  },
  addToCartAction({commit}, product) {
    commit(ADD_TO_CART, product);
  },
  isLoginForm({commit}, value) {
    commit(IS_LOGIN_FORM, value);
  },
  updateCartItemQty({commit}, cartItem) {
    commit(UPDATE_CART_ITEM_QTY, cartItem);
  },
  removeFromCart({commit}, cartItem) {
    commit(REMOVE_FROM_CART, cartItem);
  }
};

const getters = {
  getProductById: state => id => state.products.find(p => p.id === id),  
  filteredByGender: state => {
    if(!state.gender) {
      return state.products;
    }
    switch(state.gender) {
      case 'uomo': {
        return state.products.filter(p => p.gender === 'M' || p.gender === 'U')
      }
      case 'donna': {
        return state.products.filter(p => p.gender === 'F' || p.gender === 'U')
      }
    }
  },
  getCartItem: state => cartItem => state.cart.find(item => item.product.id == cartItem.product.id)
};

export default new Vuex.Store({  
  state,
  mutations,
  actions,
  getters,
  plugins: [createPersistedState()]
});
