const shoesSizesIT = [
    {    
        id:1,      
        value:35,        
        available:false
    },
    {
        id:2,
        value:35.5,
        available:false
    },
    {       
        id:3, 
        value:36,
        available:false
    },
    {       
        id:4, 
        value:36.5,
        available:false
    },
    {
        id:5,
        value:37,
        available:false
    },
    {       
        id:6, 
        value:37.5,
        available:false
    },
    {       
        id:7, 
        value:38,
        available:false
    },
    {
        id:8,
        value:38.5,
        available:false
    }
];

const shoesSizesUS = [
    {    
        id:9, 
        value:4,
        available:false
    },
    {
        id:10,
        value:4.5,
        available:false
    },
    {       
        id:11,
        value:5,
        available:false
    },
    {
        id:12,
        value:5.5,
        available:false
    },
    {       
        id:13,
        value:6,
        available:false
    },
    {       
        id:14,
        value:6.5,
        available:false
    },
    {
        id:15,
        value:7,
        available:false
    }
];

const pantsAndTShirtSizesIT = [
    {    
        id:1,      
        value:36,
        available:false
    },
    {        
        id:2,      
        value:38,
        available:false
    },
    {        
        id:3,      
        value:42,
        available:false
    },
    {        
        id:4,      
        value:44,
        available:false
    },
    {        
        id:5,      
        value:46,
        available:false
    },
    {        
        id:6,      
        value:48,
        available:false
    },
    {        
        id:7,      
        value:50,
        available:false
    },
    {        
        id:8,      
        value:52,
        available:false
    },
    {        
        id:9,      
        value:54,
        available:false
    },
    {        
        id:10,      
        value:56,
        available:false
    },
    {        
        id:11,      
        value:58,
        available:false
    },
    {        
        id:12,      
        value:60,
        available:false
    },
];

const pantsAndTShirtSizesUS = [
    {    
        id:16,      
        value:'XS',
        available:false
    },
    {        
        id:17,      
        value:'S',
        available:false
    },
    {        
        id:18,      
        value:'M',
        available:false
    },
    {        
        id:19,      
        value:'L',
        available:false
    },
    {        
        id:20,      
        value:'XL',
        available:false
    }
];

// categories+subcategories
export const categories = ['shoes','pants','T-Shirts', 'shirts', 'jackets', 'hats', 'accessories', 'trekking', 'skateboarding', 'ski'];

// subcategories
export const clothing = ['pants', 'T-Shirts', 'shirts', 'jackets'];
export const sport = ['trekking', 'skateboarding', 'ski'];
export const shoes = ['classic', 'summer', 'heels'];
export const accessories = ['hats', 'accessories'];
export const sizes = {
    categories: [
        {
            name: categories[0],
            it: shoesSizesIT,            
            us:shoesSizesUS
        },
        {
            name: categories[1],
            it: pantsAndTShirtSizesIT,
            us: pantsAndTShirtSizesUS
        },
        {
            name: categories[2],
            it: pantsAndTShirtSizesIT,
            us: pantsAndTShirtSizesUS
        },
        {
            name: categories[3],
            it: pantsAndTShirtSizesIT,
            us: pantsAndTShirtSizesUS
        },
        {
            name: categories[4],
            it: pantsAndTShirtSizesIT,
            us: pantsAndTShirtSizesUS
        },
        {
            name: categories[5],
            it: pantsAndTShirtSizesIT,
            us: pantsAndTShirtSizesUS
        },
        {
            name: categories[6],
            it: pantsAndTShirtSizesIT,
            us: pantsAndTShirtSizesUS
        }
    ]
}

