import { data } from './data.js';

const getProducts = async function() {                       
    console.log('Fetching data ...')
    try {
        return await data.getData(); 
    } catch (error) {
        console.log('MockData Loaded');       
        return data.mockData.products;
    }
}

const getProduct = async function(id) {  
    let product = this.products.find(product => product.id == id);   
    return product;
};

const addProduct = async function(product) {
    // void
    return product;
};

const deleteProduct = async function(product) {
    // deve restituire l'id del prodotto eliminato
    return product;
};

const updateProduct = async function(product) {
    // deve restituire il prodotto aggiornato
    return product;
};


export const productDao = {
    getProducts,    
    addProduct,
    deleteProduct,
    updateProduct,
    getProduct
}
