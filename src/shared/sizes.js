const femaleShoesSizes = [
    {    
        id:1,      
        it:35,
        us:4,
        available:false
    },
    {
        id:2,
        it:35.5,
        us:4.5,
        available:false
    },
    {       
        id:3, 
        it:36,
        us:5,
        available:false
    },
    {       
        id:4, 
        it:36.5,
        us:5.5,
        available:false
    },
    {
        id:5,
        it:37,
        us:5.5,
        available:false
    },
    {       
        id:6, 
        it:37.5,
        us:6,
        available:false
    },
    {       
        id:7, 
        it:38,
        us:6.5,
        available:false
    },
    {
        id:8,
        it:38.5,
        us:7,
        available:false
    }
];

const maleShoesSizes = [
    {
        id:1,
        it:39,
        us:6.5,
        available:false
    },
    {
        id:2,
        it:40,
        us:7,
        available:false
    }
];

// scarpe uomo
// 25	39	5,5	7,5
// 25,4	39,5	6	7,5
// 25,7	40	6,5	8
// 26	40,5	7	8,5
// 26,4	41	7,5	9
// 26,7	41,5	7,5	9,5
// 27	42	8	9,5
// 27,4	42,5	8,5	10
// 27,7	43	9	10,5


const femalePantsAndTShirtSizes = [
    {    
        id:1,      
        it:36,
        us:'XXS',
        available:false
    },
    {        
        id:2,      
        it:38,
        us:'XS',
        available:false
    },
    {        
        id:3,      
        it:42,
        us:'M',
        available:false
    },
    {        
        id:4,      
        it:44,
        us:'L',
        available:false
    },
    {        
        id:5,      
        it:46,
        us:'XL',
        available:false
    },
    {        
        id:6,      
        it:48,
        us:'XXL',
        available:false
    },
];

const malePantsAndTShirtSizes = [
    {    
        id:1,      
        it:44,
        us:'S',
        available:false
    },
    {        
        id:2,      
        it:46,
        us:'S',
        available:false
    },
    {        
        id:3,      
        it:48,
        us:'M',
        available:false
    },
    {        
        id:4,      
        it:50,
        us:'M',
        available:false
    },
    {        
        id:5,      
        it:52,
        us:'L',
        available:false
    },
    {        
        id:6,      
        it:54,
        us:'L',
        available:false
    },
    {        
        id:7,      
        it:56,
        us:'XL',
        available:false
    },
    {        
        id:8,      
        it:58,
        us:'XL',
        available:false
    },
    {        
        id:9,      
        it:60,
        us:'XXL',
        available:false
    },
];

const categories = ['shoes','pants','T-shirts', 'shirts', 'jackets', 'hats', 'accessories'];

// export
export const clothing = ['pants', 'T-Shirts', 'shirts', 'jackets'];
export const sport = ['trekking', 'skateboarding', 'ski'];
export const shoes = ['classic', 'summer', 'heels'];
export const accessories = ['hats', 'accessories'];
export const sizes = {
    categories: [
        {
            name: categories[0],
            male: maleShoesSizes,            
            female: femaleShoesSizes
        },
        {
            name: categories[1],
            male: malePantsAndTShirtSizes,
            female: femalePantsAndTShirtSizes
        },
        {
            name: categories[2],
            male: malePantsAndTShirtSizes,
            female: femalePantsAndTShirtSizes
        },
        {
            name: categories[3],
            male: malePantsAndTShirtSizes,
            female: femalePantsAndTShirtSizes
        },
        {
            name: categories[4],
            male: malePantsAndTShirtSizes,
            female: femalePantsAndTShirtSizes
        },
        {
            name: categories[5],
            male: malePantsAndTShirtSizes,
            female: femalePantsAndTShirtSizes
        },
        {
            name: categories[6],
            male: malePantsAndTShirtSizes,
            female: femalePantsAndTShirtSizes
        }
    ]
}

