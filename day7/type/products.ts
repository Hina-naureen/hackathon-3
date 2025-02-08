

export interface Product{
    isNew: boolean;
    isSoldOut: any;
    quantity: number;
    colors: any;
    sizes: any;
    reviews: any;
    inventory: number;
    item_id: any;
    stockLevel: number;
    discountPercentage: any;
    category: string;
    _id : string;
    name : string
    _type : "product";
    image? : {
        asset :{
            _ref : string;
            _type : "image"; 
        }
    };

    price : number;
    description?: string;
    slug : {
        _type : "slug"
        current : string;
    };
  
}