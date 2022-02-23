import { sizes } from './sizes.js';


const options = [];
const copyOfSizes = [...sizes.categories];
copyOfSizes.forEach((cat) => {
  cat.it.forEach((size) => {
    let option = {
      value: size.value,
      selected: false,
      type: 'size'
    }    
    options.push(option);
    copyOfSizes.splice(copyOfSizes.indexOf(size), 1);
  });
  cat.us.forEach((size) => {    
    let option = {
      value: size.value,
      selected: false,
      type: 'size'
    }
    options.push(option);
    copyOfSizes.splice(copyOfSizes.indexOf(size), 1);
  })   
});

export const sizeOptions = options;
export const filters = [
  {
    text: 'Ordina',
    options: [
      {value: 'Preferiti', selected: false, type: 'favorites'},
      {value: 'Prezzo crescente', selected: false, type: 'price'},
      {value: 'Prezzo decrescente', selected: false, type: 'price'}
    ]
  }
]