const mongoose = require ('mongoose')

const cartSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        ref:"user"
    },
    productid:{
        type:String,
        required:true,
        ref:"product"
    },
    product :{
        type : String,
        required : true
    },
    count:{
        type:Number,
        default:1
    },
    price:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    image:{
        type:[String],
    },
    category:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
})

    module.exports = mongoose.model('Cart',cartSchema);