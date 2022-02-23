import { sizes } from './sizes.js';


const sizeMaleOptions = [];
const sizeFemaleOptions = [];
const copyOfSizes = [...sizes.categories];
copyOfSizes.forEach((cat) => {
  cat.male.forEach((size) => {
    let optionIT = {
      value: size.it,
      selected: false,
      type: 'size'
    }
    let optionUS = {
      value: size.us,
      selected: false,
      type: 'size'
    }
    sizeMaleOptions.push(optionIT);
    sizeMaleOptions.push(optionUS);
    copyOfSizes.splice(copyOfSizes.indexOf(size), 1);
  });
  cat.female.forEach((size) => {
    let optionIT = {
      value: size.it,
      selected: false,
      type: 'size'
    }
    let optionUS = {
      value: size.us,
      selected: false,
      type: 'size'
    }
    sizeFemaleOptions.push(optionIT);
    sizeFemaleOptions.push(optionUS);
    copyOfSizes.splice(copyOfSizes.indexOf(size), 1);
  })   
});

export const sizeOptions = {
  sizeMaleOptions,
  sizeFemaleOptions
}

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