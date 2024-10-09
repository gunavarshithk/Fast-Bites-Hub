import mongoose,{Schema,model,models} from"mongoose";

const ExtraPriceSchema=new Schema({
    name:String,
    price:Number
});

const MenuItemsSchema=new Schema({
    image:{type:String},
    name:{type:String},
    description:{type:String},
    category:{type: mongoose.Types.ObjectId},
    price:{type:Number},    
    quantityType:{type:[ExtraPriceSchema]},
    extraIngredientPrices:{type:[ExtraPriceSchema]}

},{timestamps:true});

export const MenuItem=models?.MenuItem || model('MenuItem',MenuItemsSchema);